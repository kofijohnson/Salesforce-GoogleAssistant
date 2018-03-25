"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
let proxyURL = 'https://sfbottest-developer-edition.na78.force.com/services/apexrest';
class SalesforceProxy {
    showReport(report) {
        return axios_1.default.post(proxyURL + '/showreport', report, { headers: { 'Content-Type': 'application/json' } });
    }
}
exports.SalesforceProxy = SalesforceProxy;
;
