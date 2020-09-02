import { Sequelize, DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt-nodejs';
import config from '../config';
import User from './User';
import Friend from './Friend';
import Room from './Room';
import Participant from './Participant';
import Chatting from './Chatting';


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
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['my_id', 'friend_id']
            }
        ]
    });

    // Room
    Room.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        identifier: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        type: {
            type: new DataTypes.STRING(15),
            allowNull: false,
        },
        last_chat: {
            type: DataTypes.TEXT,
            allowNull: true,
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
        tableName: 'room',
        engine: 'InnoDB',
        charset: 'utf8',
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ["identifier"]
            }
        ]
    });

    //Participant
    Participant.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        room_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        room_name: {
            type: new DataTypes.STRING(20),
            allowNull: true,
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
        tableName: 'participant',
        engine: 'InnoDB',
        charset: 'utf8',
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'room_id']
            }
        ]
    });

    // chatting
    Chatting.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        room_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        send_user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
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
        tableName: 'chatting',
        engine: 'InnoDB',
        charset: 'utf8',
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ["id"]
            }
        ]
    });
    User.hasMany(Friend, {
        foreignKey: 'my_id',
        as: "friends"
      });
    
    User.hasMany(Friend, {
        foreignKey: 'friend_id',
    });

    User.hasMany(Participant, {
        foreignKey: 'user_id'
    });

    User.hasMany(Chatting, {
        foreignKey: 'send_user_id'
    });

    Room.hasMany(Participant, {
        foreignKey: 'room_id'
    })

    Room.hasMany(Chatting, {
        foreignKey: 'room_id'
    })

    Friend.belongsTo(User, {foreignKey: 'my_id'});
    Participant.belongsTo(User, {foreignKey: 'user_id'});
    Participant.belongsTo(Room, {foreignKey: 'room_id'});
    Chatting.belongsTo(User, {foreignKey: 'send_user_id'});
    Chatting.belongsTo(Room, {foreignKey: 'room_id'});

    return sequelize;
}


