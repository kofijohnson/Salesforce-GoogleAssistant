"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const dialogflow_router_1 = require("./routers/dialogflow.router");
const app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use('/', dialogflow_router_1.dialogflowRouter);
app.listen(port, () => {
    console.log('App is listening on port ' + port);
});
