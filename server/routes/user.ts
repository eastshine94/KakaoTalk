import * as express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/find", async(req, res) => {
  const { user_id } = req.body;
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
});

router.post("/profile/change", async(req, res) => {
  const body = req.body;

  try{
    await User.update({...body},
    {
        where: {
            id: body.id
    }})
    return res.json({data: true, msg: "프로필 변경 완료."})
  }catch(err){
    return res.status(400).json({data: false, msg: err.message});
  }

})


export default router;