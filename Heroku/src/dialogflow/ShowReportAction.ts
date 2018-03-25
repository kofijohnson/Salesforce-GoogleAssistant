import { DialogflowApp } from 'actions-on-google';
import { Report } from './../models/Report.interface';
import { SalesforceProxy } from './../salesforce/SalesforceProxy';

export const name = 'show.report';

export async function handler(dialogflowApp: DialogflowApp) {
  let salesforceProxy = new SalesforceProxy();

  // Get the Report name and the Filter.
  let reportName = dialogflowApp.getArgument('reportName') + '';
  let filter = {
    column: dialogflowApp.getArgument('filterField') + '', 
    operator: dialogflowApp.getArgument('filterOperator') + '', 
    value: dialogflowApp.getArgument('filterValue') + ''
  };
  let report :Report  = <Report> {name: reportName, filter: filter};

  console.log(report);

  // Call Salesforce.
  let response = await salesforceProxy.showReport(report);

  dialogflowApp.ask(response.data as string);
}