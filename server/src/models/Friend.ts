import { Model } from 'sequelize';
import User from './User';

export default class Friend extends Model {
  public id!: number;
  public my_id!: number;
  public friend_id!: number;
  public friend_name!: string;

  public readonly User?: User;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
