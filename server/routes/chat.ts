import * as express from 'express';
import Room from '../models/Room';
import Participant from '../models/Participant';
import { CreateRoomRequest } from '../types/chat';

const router = express.Router();

router.post("/room/create", async(req, res) => {
    const { type, room_name, identifier, participant } = req.body as CreateRoomRequest;
    try {
        const findRoom = await Room.findOne({
            where: { identifier },
        });
        if(findRoom) {
            const data = {
                room_id: findRoom.id,
                identifier: findRoom.identifier,
                type: findRoom.type,
                room_name,
                last_chat: findRoom.last_chat,
                updated_at: findRoom.updated_at,
            };
            return res.json({
                data,
                msg: "방이 이미 존재합니다."
            })
        }
        else{
            const room = await Room.create({
                type,
                identifier,
                last_chat: ""
            });
            await participant.forEach(person => {
                Participant.create({
                    user_id: person.id,
                    room_id: room.id,
                    room_name
                })
            })
            const data = {
                room_id: room.id,
                identifier: room.identifier,
                type: room.type,
                room_name,
                last_chat: room.last_chat,
                updated_at: room.updated_at,
            };
            return res.json({
                data,
                msg: "채팅방이 만들어졌습니다."
            })
        }
    } catch (err) {
        return res.status(400).json({
            data: false,
            msg: "채팅방을 추가하지 못했습니다."
        })
    }
})


export default router;