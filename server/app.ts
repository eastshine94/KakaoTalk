import * as express from 'express';
import * as DB from './models';
import * as cors from 'cors';
import * as http from 'http';
import * as path from 'path';
import * as socketIO from 'socket.io';
import { Sequelize } from 'sequelize/types';
import logger from './logger';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import friendRouter from './routes/friend';

const stopServer = async (server: http.Server, sequelize: Sequelize, signal?: string) => {
    logger.info(`Stopping server with signal: ${signal}`);
    await server.close();
    await sequelize.close();
    process.exit();
};

const runServer = async() => {
    const app = express();
    const sequelize = DB.init();
    app.set('port', process.env.PORT || 3001);
    app.use(express.json());
    app.use(cors());
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/friend', friendRouter);
    app.get('/uploads/:fileName', (req, res) => {
        const fileName = req.params.fileName
        res.sendFile(path.join(__dirname, `../uploads/${fileName}`));
    });
    const server = http.createServer(app).listen(app.get('port'), () => {
        logger.info(`listening on port ${app.get('port')}...`);
    });
    await sequelize.authenticate()
    .then(() => { logger.info("Connected to DB successfully."); })
    .catch(e => {
        stopServer(server, sequelize);
        throw e;
    });
    await sequelize.sync();
    runSocketIo(server);
};

const runSocketIo = (server: http.Server) => {
    const io = socketIO.listen(server);
    io.on('connection', (socket) => {
        
        socket.on('disconnect', () => {
            logger.info("소켓 연결 해제");
        });
        socket.on('join', (room_id: string) => {
            socket.join(room_id);
            logger.info(`${room_id}에 들어감`);
        })
        socket.on('message', (room_id: number, msg: string) => {
            io.to(room_id.toString()).emit('message', msg);
        })
    })
}

runServer();



