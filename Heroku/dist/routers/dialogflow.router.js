"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actions_on_google_1 = require("actions-on-google");
const ShowReportAction = require("./../dialogflow/ShowReportAction");
exports.dialogflowRouter = express_1.Router();
exports.dialogflowRouter.post('/', (request, response) => {
    // Define all the Actions.
    const actions = [
        ShowReportAction
    ];
    // Register the Actions in the DiaglogFlow App.
    const actionMap = new Map();
    actions.forEach(action => actionMap.set(action.name, action.handler));
    const dialogflowApp = new actions_on_google_1.DialogflowApp({ request, response });
    dialogflowApp.handleRequest(actionMap);
});
