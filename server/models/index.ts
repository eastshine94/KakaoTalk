import { Sequelize, DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt-nodejs';
import config from '../config';
import User from './User';
import Friend from './Friend';

export function init(): Sequelize {
    const sequelize = new Sequelize(config.db.url,{
        dialect: 'mysql',
        timezone: '+09:00',
    });
    //User
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: new DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(150),
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        status_msg: {
            type: new DataTypes.STRING(60),
            allowNull: true,
            defaultValue: "",
        },
        profile_img_url: {
            type: new DataTypes.STRING(150),
            allowNull: true,
            defaultValue: "",
        },
        background_img_url: {
            type: new DataTypes.STRING(150),
            allowNull: true,
            defaultValue: "",
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
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

    //friend
    Friend.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        my_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        friend_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        friend_name: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'friend',
        engine: 'InnoDB',
        charset: 'utf8',
        freezeTableName: true
    })
    User.hasMany(Friend, {
        foreignKey: 'my_id',
        as: "friends"
      })
    User.hasMany(Friend, {
        foreignKey: 'friend_id',
    })
    return sequelize;
}


