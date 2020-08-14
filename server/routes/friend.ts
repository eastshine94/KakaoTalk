import * as express from "express";
import Friend from '../models/Friend';

const router = express.Router();

router.post("/add", (req, res) => {
    const { my_id, friend_id, friend_name } = req.body;
    try {
        Friend.create({my_id, friend_id, friend_name});
        res.send({data: true, msg: "친구 추가 성공"});
    } catch (err) {
        res.status(400).send({data: false, msg: "친구 추가 실패"});
    }
}) 



export default router;