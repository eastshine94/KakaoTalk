import * as http from 'http';
import * as socketIO from 'socket.io';
import {Op} from 'sequelize';
import Chatting from '../models/Chatting';
import Room from '../models/Room';
import Participant from '../models/Participant';
import logger from '../logger';
import { MessageRequest, MessageResponse, ReadChatRequest, ReadChatResponse } from '../types/chat';


const runSocketIo = (server: http.Server) => {
    const io = socketIO.listen(server);
    io.on('connection', (socket) => {
        disconnect(socket);
        joinRoom(socket);
        message(socket, io);
        readChat(socket, io);
    })
}

const disconnect = (socket: socketIO.Socket) => {
    socket.on('disconnect', () => {
        logger.info("소켓 연결 해제");
    });
}

const joinRoom = (socket: socketIO.Socket) => {
    socket.on('join', (room_id: string) => {
        socket.join(room_id);
        logger.info(`${room_id}에 들어감`);
    })
}

const message = (socket: socketIO.Socket, io: socketIO.Server) => {
    socket.on('message', async(messageObj:MessageRequest) => {
        const {room_id, send_user_id, message, not_read} = messageObj;
        const savedMessage = await Chatting.create({
            room_id,
            send_user_id,
            message,
            not_read
        });
        await Room.update({
            last_chat: message,
        },{
            where: {id: room_id}
        })

        const messageResponse: MessageResponse = {
            id: savedMessage.id,
            room_id,
            send_user_id,
            message,
            not_read,
            createdAt: savedMessage.createdAt,
        }
        if(messageObj.type === "individual"){
            const me = messageObj.send_user_id.toString();
            const target = messageObj.participant[0].id.toString();
            if(me === target){
                io.to(me).emit('message', messageResponse);  
            }
            else{
                io.to(target).emit('message', messageResponse);
                io.to(me).emit('message', messageResponse);
                await Participant.increment(["not_read_chat"], {
                    where: {
                        user_id: messageObj.participant[0].id,
                        room_id
                    }
                });
            }
            await Participant.update({
                not_read_chat: 0,
                last_read_chat_id: savedMessage.id
            },{
                where:{
                    user_id: messageObj.send_user_id,
                    room_id
                }
            })   
        }
        else {
            const roomId = messageObj.room_id.toString();
            io.to(roomId).emit('message',messageResponse);
        }
        
    })
}



const readChat = (socket: socketIO.Socket, io: socketIO.Server) => {
    socket.on('readChat', async(req: ReadChatRequest) => {
        const {user_id, room_id, participant, last_read_chat_id_range} = req;
   
        await Chatting.increment(['not_read'],{
            by: -1,
            where: {
                room_id,
                id: {[Op.gt]: last_read_chat_id_range[0], [Op.lte]: last_read_chat_id_range[1]},
                not_read: { [Op.gt]: 0 }
            }
        })
 
        await Participant.update({
            not_read_chat: 0,
            last_read_chat_id: last_read_chat_id_range[1]
        },{
            where: {
                user_id,
                room_id
            }
        })

        const readChatResponse: ReadChatResponse = {
            room_id,
            last_read_chat_id_range
        }
        if(req.type === "individual"){
            const me = user_id.toString();
            const target = participant[0].id.toString();
            if(me !== target){
                io.to(target).emit('readChat', readChatResponse); 
            }
        }
        else {
            const roomId = req.room_id.toString();
            io.to(roomId).emit('readChat',readChatResponse);
        }
    })
}


export default runSocketIo;