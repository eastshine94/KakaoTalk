import * as express from 'express';
import * as DB from './models';
import * as cors from 'cors';
import * as http from 'http';
import * as path from 'path';
import { Sequelize } from 'sequelize/types';
import logger from './logger';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import friendRouter from './routes/friend';
import chatRouter from './routes/chat';
import runSocketIo from './sockets';

const stopServer = async (
  server: http.Server,
  sequelize: Sequelize,
  signal?: string
) => {
  logger.info(`Stopping server with signal: ${signal}`);
  await server.close();
  await sequelize.close();
  process.exit();
};

const runServer = async () => {
  const app = express();
  const sequelize = DB.init();
  app.set('port', process.env.PORT || 8001);
  app.use(express.json());
  app.use(cors());
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/friend', friendRouter);
  app.use('/api/chat', chatRouter);
  app.use('/', express.static(path.join(__dirname, '/build')));
  app.get('/uploads/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    res.sendFile(path.join(__dirname, `./uploads/${fileName}`));
  });

  // app.get('*',(req, res)=> {
  //     res.sendFile('index.html', {root: path.join(__dirname, '/build')});
  // });

  const server = http.createServer(app).listen(app.get('port'), () => {
    logger.info(`listening on port ${app.get('port')}...`);
  });
  await sequelize
    .authenticate()
    .then(() => {
      logger.info('Connected to DB successfully.');
    })
    .catch(e => {
      stopServer(server, sequelize);
      throw e;
    });
  await sequelize.sync();
  runSocketIo(server);
};

runServer();
