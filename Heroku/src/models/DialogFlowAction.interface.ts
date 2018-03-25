import { DialogflowApp } from 'actions-on-google'; 

export interface DialogFlowAction {
  name: string,
  handler: (app: DialogflowApp) => void
}