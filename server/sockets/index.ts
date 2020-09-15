import * as http from 'http';
import * as socketIO from 'socket.io';
import {Op} from 'sequelize';
import Chatting from '../models/Chatting';
import Room from '../models/Room';
import Participant from '../models/Participant';
import logger from '../logger';
import { MessageRequest, MessageResponse, ReadChatRequest } from '../types/chat';


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
            if(me !== target){
                io.to(me).emit('message', messageResponse);    
            }
            io.to(target).emit('message', messageResponse);
        }
        else {
            const roomId = messageObj.room_id.toString();
            io.to(roomId).emit('message',messageResponse);
        }
        
    })
}



const readChat = (socket: socketIO.Socket, io: socketIO.Server) => {
    socket.on('readChat', async(req: ReadChatRequest) => {
        const {user_id, room_id, last_read_chat_id} = req;
   
        const readChatting = await Chatting.findAll({
            where: {
                id: {[Op.gt]: last_read_chat_id},
                room_id
            }
        }).then(people => {
            people.forEach(person => {
                person.decrement(['not_read'],{
                    by: 1,
                })
            })
            return people[people.length-1];
        });
 
        await Participant.update({
            not_read_chat: 0,
            last_read_chat_id: readChatting.id
        },{
            where: {
                user_id,
                room_id
            }
        })
        if(req.type === "individual"){
            const me = req.user_id.toString();
            const target = req.participant[0].id.toString();
            if(me !== target){
                io.to(me).emit('readChat', last_read_chat_id);    
            }
            io.to(target).emit('readChat', last_read_chat_id);
        }
        else {
            const roomId = req.room_id.toString();
            io.to(roomId).emit('readChat',last_read_chat_id);
        }
    })
}


export default runSocketIo;