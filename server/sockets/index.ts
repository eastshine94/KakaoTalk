import * as http from 'http';
import * as socketIO from 'socket.io';
import Chatting from '../models/Chatting';
import Room from '../models/Room';
import logger from '../logger';
import { MessageRequest, MessageResponse } from '../types/chat';

const runSocketIo = (server: http.Server) => {
    const io = socketIO.listen(server);
    io.on('connection', (socket) => {
        disconnect(socket);
        joinRoom(socket);
        message(socket, io);
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
        const {room_id, send_user_id, message} = messageObj;
        const savedMessage = await Chatting.create({
            room_id,
            send_user_id,
            message
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

export default runSocketIo;