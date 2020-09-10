import { Model } from 'sequelize';


export default class Chatting extends Model {
    public id!: number;
    public room_id!: number;
    public send_user_id!: number;
    public message!: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}