import * as express from 'express';
import * as Sequelize from 'sequelize';
import Friend from '../models/Friend';
import User from '../models/User';

interface FriendResponseDto {
  id: number;
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  background_img_url: string;
}

const router = express.Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // user와 friend를 join한 결과값을 얻어냅니다.
    const friends = await Friend.findAll({
      attributes: ['friend_id', 'friend_name'],
      include: [
        {
          model: User,
          attributes: [
            'user_id',
            'status_msg',
            'profile_img_url',
            'background_img_url'
          ],
          required: true,
          on: Sequelize.where(
            Sequelize.col('Friend.friend_id'),
            '=',
            Sequelize.col('User.id')
          )
        }
      ],
      where: { my_id: id }
    });

    const response = friends.reduce((acc, curr) => {
      const user = curr.User as User;
      const friend: FriendResponseDto = {
        id: curr.friend_id,
        user_id: user.user_id,
        name: curr.friend_name,
        status_msg: user.status_msg,
        profile_img_url: user.profile_img_url,
        background_img_url: user.background_img_url
      };
      acc.push(friend);
      return acc;
    }, [] as Array<FriendResponseDto>);

    return res.json({
      data: response,
      msg: '친구 목록 불러옴'
    });
  } catch (err) {
    return res.status(400).json({
      data: false,
      msg: '친구 목록을 불러오지 못했습니다.'
    });
  }
});

router.post('/add', async (req, res) => {
  const { my_id, friend_id, friend_name } = req.body;
  try {
    await Friend.create({ my_id, friend_id, friend_name });
    return res.json({ data: true, msg: '친구 추가 성공' });
  } catch (err) {
    return res.status(400).json({ data: false, msg: '친구 추가 실패' });
  }
});

router.post('/profile/change', async (req, res) => {
  const { my_id, friend_id, friend_name } = req.body;
  try {
    await Friend.update(
      { friend_name },
      {
        where: { my_id, friend_id }
      }
    );
    return res.json({ data: true, msg: '친구 이름 변경 성공' });
  } catch (err) {
    return res.status(400).json({ data: false, msg: '친구 이름 변경 실패' });
  }
});

export default router;
