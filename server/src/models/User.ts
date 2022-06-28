import { Model } from 'sequelize';
import * as bcrypt from 'bcrypt-nodejs';

export default class User extends Model {
  public id!: number;
  public user_id!: string;
  public password!: string;

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
  public name!: string;
  public status_msg!: string;
  public profile_img_url!: string;
  public background_img_url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
