import * as express from 'express';
import User from '../models/User';
import config from '../config';
import * as jwt from 'jwt-simple';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { user_id, password } = req.body;
  try {
    const user = await User.findOne({
      where: { user_id }
    });

    if (user) {
      const isValidPassword = await user.validPassword(password);
      if (isValidPassword) {
        const token = jwt.encode(
          { id: user.id, user_id: user.user_id },
          config.auth.key
        );
        return res.json({ data: { token }, msg: '로그인 성공!' });
      }
    }
    return res
      .status(404)
      .json({ msg: '계정 또는 비밀번호를 다시 확인해주세요.' });
  } catch (err) {
    return res.status(500).json({ msg: '로그인 실패' });
  }
});

router.post('/signup', async (req, res) => {
  const { user_id, password, name } = req.body;

  try {
    const user = await User.findOne({
      where: { user_id }
    });
    if (user) {
      return res
        .status(400)
        .json({ msg: '이미 사용중이거나 탈퇴한 아이디입니다.' });
    }
    await User.create({ user_id, password, name });
    return res.json({
      msg: '회원가입 되었습니다.'
    });
  } catch (err) {
    return res.status(500).json({
      msg: '회원가입 실패'
    });
  }
});

export default router;
