import * as express from 'express';
import * as Sequelize from 'sequelize';
import Room from '../models/Room';
import Chatting from '../models/Chatting';
import Participant from '../models/Participant';
import {
  CreateRoomRequest,
  RoomListResponse,
  CreateRoomResponse
} from '../types/chat';

const router = express.Router();

router.post('/room/create', async (req, res) => {
  const { my_id, type, room_name, identifier, participant } =
    req.body as CreateRoomRequest;
  try {
    const findRoom = await Room.findOne({
      where: { identifier }
    });
    if (findRoom) {
      const findRoomInfo = await Participant.findOne({
        where: { user_id: my_id, room_id: findRoom.id }
      });
      const data: CreateRoomResponse = {
        room_id: findRoom.id,
        identifier: findRoom.identifier,
        type: findRoom.type,
        room_name: findRoomInfo!.room_name,
        not_read_chat: findRoomInfo!.not_read_chat,
        last_read_chat_id: findRoomInfo!.last_read_chat_id,
        last_chat: findRoom.last_chat,
        updatedAt: findRoom.updatedAt
      };
      return res.json({
        data,
        msg: '방이 이미 존재합니다.'
      });
    } else {
      const room = await Room.create({
        type,
        identifier,
        last_chat: ''
      });
      await Participant.create({
        user_id: my_id,
        room_id: room.id,
        room_name,
        not_read_chat: 0,
        last_read_chat_id: 0
      });
      await participant.forEach(person => {
        if (person.id !== my_id) {
          Participant.create({
            user_id: person.id,
            room_id: room.id,
            room_name,
            not_read_chat: 0,
            last_read_chat_id: 0
          });
        }
      });
      const data: CreateRoomResponse = {
        room_id: room.id,
        identifier: room.identifier,
        type: room.type,
        room_name,
        last_chat: room.last_chat,
        not_read_chat: 0,
        last_read_chat_id: 0,
        updatedAt: room.updatedAt
      };
      return res.json({
        data,
        msg: '채팅방이 만들어졌습니다.'
      });
    }
  } catch (err) {
    return res.status(400).json({
      data: false,
      msg: '채팅방을 추가하지 못했습니다.'
    });
  }
});

// 채팅 내용을 보낼 때 사용
router.get('/room', async (req, res) => {
  const room_id: number = Number(req.query.room_id);
  if (!room_id) {
    throw new Error();
  }
  const cursor: number = Number(req.query.cursor) || 9999999999;

  try {
    const chatting = await Chatting.findAll({
      attributes: [
        'id',
        'room_id',
        'send_user_id',
        'message',
        'not_read',
        'createdAt'
      ],
      where: {
        id: { [Sequelize.Op.lt]: cursor },
        room_id
      },
      order: [['id', 'DESC']],
      limit: 50
    });

    return res.json({
      data: chatting.reverse(),
      msg: '채팅 목록을 불러왔습니다.'
    });
  } catch (err) {
    return res.status(400).json({
      data: false,
      msg: '채팅 목록을 불러오지 못했습니다.'
    });
  }
});

router.get('/roomList/:user_id', async (req, res) => {
  const user_id = Number(req.params.user_id);
  try {
    // participant 테이블과 room 테이블을 join한 결과 값을 얻어옵니다.
    const roomData = await Participant.findAll({
      attributes: [
        'room_id',
        'room_name',
        'not_read_chat',
        'last_read_chat_id'
      ],
      include: [
        {
          model: Room,
          attributes: ['identifier', 'type', 'last_chat', 'updatedAt'],
          required: true,
          on: Sequelize.where(
            Sequelize.col('Participant.room_id'),
            '=',
            Sequelize.col('Room.id')
          ),
          where: {
            last_chat: {
              [Sequelize.Op.ne]: ''
            }
          }
        }
      ],
      where: {
        user_id
      }
    });

    const response: Array<RoomListResponse> = await Promise.all(
      roomData.map(async val => {
        const participant = await Participant.findAll({
          attributes: ['user_id'],
          where: {
            room_id: val.room_id,
            user_id: {
              [Sequelize.Op.ne]: user_id
            }
          }
        }).reduce((acc, curr) => {
          acc.push(curr.user_id);
          return acc;
        }, [] as Array<number>);

        const roomRow = val.Room?.toJSON() as Room;
        return {
          room_id: val.room_id,
          room_name: val.room_name,
          type: roomRow.type,
          identifier: roomRow.identifier,
          participant: participant.length === 0 ? [user_id] : participant,
          last_chat: roomRow.last_chat,
          not_read_chat: val.not_read_chat,
          last_read_chat_id: val.last_read_chat_id,
          updatedAt: roomRow.updatedAt
        };
      })
    );
    return res.json({
      data: response,
      msg: '채팅방 리스트 불러옴'
    });
  } catch (err) {
    return res.status(400).json({
      data: false,
      msg: '채팅방 리스트를 불러오지 못했습니다.'
    });
  }
});
export default router;
