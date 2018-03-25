import * as express from 'express';
import * as bodyParser from 'body-parser';
import { dialogflowRouter } from './routers/dialogflow.router';

const app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', dialogflowRouter);
app.listen(port, () => {
    console.log('App is listening on port ' + port);
});