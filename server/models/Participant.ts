import { Model } from 'sequelize';


export default class Participant extends Model {
    public id!: number;
    public user_id!: number;
    public room_id!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}