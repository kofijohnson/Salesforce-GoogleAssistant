import { Router, Request, Response } from 'express'
import { DialogflowApp } from 'actions-on-google'

import { DialogFlowAction } from './../models/DialogFlowAction.interface';
import * as ShowReportAction from './../dialogflow/ShowReportAction';

export const dialogflowRouter = Router();

dialogflowRouter.post('/', (request: Request, response: Response) => {
  // Define all the Actions.
  const actions: DialogFlowAction[] = [
    ShowReportAction
  ];

  // Register the Actions in the DiaglogFlow App.
  const actionMap = new Map();
  actions.forEach(action => actionMap.set(action.name, action.handler));

  const dialogflowApp = new DialogflowApp({request, response});
  dialogflowApp.handleRequest(actionMap);
});
