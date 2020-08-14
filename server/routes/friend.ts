import * as express from "express";
import Friend from '../models/Friend';

const router = express.Router();

router.post("/add", async(req, res) => {
    const { my_id, friend_id, friend_name } = req.body;
    try {
        await Friend.create({my_id, friend_id, friend_name});
        return res.json({data: true, msg: "친구 추가 성공"});
    } catch (err) {
        return res.status(400).json({data: false, msg: "친구 추가 실패"});
    }
}) 



export default router;