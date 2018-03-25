"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SalesforceProxy_1 = require("./../salesforce/SalesforceProxy");
exports.name = 'show.report';
async function handler(dialogflowApp) {
    let salesforceProxy = new SalesforceProxy_1.SalesforceProxy();
    // Get the Report name and the Filter.
    let reportName = dialogflowApp.getArgument('reportName') + '';
    let filter = {
        column: dialogflowApp.getArgument('filterField') + '',
        operator: dialogflowApp.getArgument('filterOperator') + '',
        value: dialogflowApp.getArgument('filterValue') + ''
    };
    let report = { name: reportName, filter: filter };
    console.log(report);
    // Call Salesforce.
    let response = await salesforceProxy.showReport(report);
    dialogflowApp.ask(response.data);
}
exports.handler = handler;
