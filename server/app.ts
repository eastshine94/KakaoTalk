import * as express from 'express';
import * as cors from 'cors';


const runServer = () => {
    const app = express();
    app.set('port', process.env.PORT || 3001);
    app.use(express.json());
    app.use(cors());
    const server = app.listen(app.get('port'), () => {
        console.log(`listening on port ${app.get('port')}...`);
    });

};

runServer();



