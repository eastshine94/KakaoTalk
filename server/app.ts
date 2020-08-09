import * as express from 'express';
import * as DB from './models';
import * as cors from 'cors';
import * as http from 'http';
import { Sequelize } from 'sequelize/types';
import logger from './logger';

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
    const server = app.listen(app.get('port'), () => {
        logger.info(`listening on port ${app.get('port')}...`);
    });
    await sequelize.authenticate()
    .then(() => { logger.info("Connected to DB successfully."); })
    .catch(e => {
        stopServer(server, sequelize);
        throw e;
    });
    await sequelize.sync();
};

runServer();



