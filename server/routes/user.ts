import * as express from "express";
import User from "../models/User";
import * as multer from 'multer';

const upload = multer({dest:"uploads/"})
const router = express.Router();

router.get("/:user_id", async(req, res) => {
  const user_id = req.params.user_id;
  try {
    const user = await User.findOne({
      attributes: ["id", "user_id", "name", "status_msg", "profile_img_url", "background_img_url"],
      where: { user_id },
    });
    if (user) {
      return res.json({ 
        data: user,
        msg: "이미 사용중이거나 탈퇴한 아이디입니다." 
      });
    }
    return res.json({
      data: null,
      msg: "사용 가능한 ID 입니다.",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "서버 문제로 인해 찾을 수 없습니다."
    })
  }
});

router.get("/find/:id", async(req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      attributes: ["id", "user_id", "name", "status_msg", "profile_img_url", "background_img_url"],
      where: { id },
    });
    return res.json({
      data: user,
      msg: "사용자를 찾았습니다.",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "서버 문제로 인해 찾을 수 없습니다."
    })
  }
});

router.post("/profile/change", async(req, res) => {
  const body = req.body;
  try{
    await User.update({...body},
    {
        where: {id: body.id}
    })
    return res.json({data: true, msg: "프로필 변경 완료."})
  }catch(err){
    return res.status(400).json({data: false, msg: err.message});
  }
})

router.post("/upload", upload.single("image"), (req, res) => {
    try {
      const image = req.file;
      return res.json({ data: `${image.path}` });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
})

export default router;