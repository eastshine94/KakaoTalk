import {Model} from 'sequelize';


export default class Friend extends Model {
    id!: number;
    my_id!: number;
    friend_id!: number;
    friend_name!: string;
    created_at!: Date;
    updated_at!: Date;
}