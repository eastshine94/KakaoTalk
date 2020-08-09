import * as express from 'express';
import * as cors from 'cors';
import logger from './logger';


const runServer = () => {
    const app = express();
    app.set('port', process.env.PORT || 3001);
    app.use(express.json());
    app.use(cors());
    const server = app.listen(app.get('port'), () => {
        logger.info(`listening on port ${app.get('port')}...`);
    });

};

runServer();



