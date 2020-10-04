import { Model } from 'sequelize';


export default class Room extends Model {
    public id!: number;
    public identifier!: string;
    public type!: "individual" | "group";
    public last_chat!: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}