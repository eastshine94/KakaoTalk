import { Model } from 'sequelize';


export default class Room extends Model {
    public id!: number;
    public identifier!: string;
    
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}