import { Sequelize, DataTypes } from 'sequelize';
import config from '../config';
import User from './User';
import * as bcrypt from 'bcrypt-nodejs';
export function init(): Sequelize {
    const sequelize = new Sequelize(config.db.url);
    //User
    User.init({
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        USER_ID: {
            type: new DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        PASSWORD: {
            type: new DataTypes.STRING(150),
            allowNull: false,
        },
        NAME: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        STATUS_MSG: {
            type: new DataTypes.STRING(60),
            allowNull: true,
        },
        PROFILE_IMG_URL: {
            type: new DataTypes.STRING(150),
            allowNull: true,
        },
        BACKGROUND_IMG_URL: {
            type: new DataTypes.STRING(150),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'CREATED_AT',
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'UPDATED_AT',
            allowNull: false,
        },
    }, {
    sequelize,
    tableName: 'user',
    engine: 'InnoDB',
    charset: 'utf8',
    freezeTableName: true,
    indexes: [
        {
            fields: ["user_id"]
        }
    ],
    hooks: {
        beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        }
    }
    });

    return sequelize;
}


