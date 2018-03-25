/*******************************************************************************************************
* @Description: Webservice that receives the name and the filter of the Report to display.
* @Author: Kofi Johnson - https://github.com/kofijohnson
********************************************************************************************************/

@RestResource(urlMapping='/showreport/*')
global with sharing class ReportViewerRestResource {
    
    /*******************************************************************************************************
    * @description Method that runs when the /showreport/ is called
    * @return String. The response to send back.
    ********************************************************************************************************/
    @HttpPost
    global static String showReport() {
        // Deserialize the Request.
        String request = RestContext.request.requestBody.toString();
        ReportRequest reportRequest = (ReportRequest) JSON.deserialize(request, ReportViewerRestResource.ReportRequest.class);

        //Get the Report from Salesforce.
        List<Report> reports = [
            SELECT Name, DeveloperName
            FROM Report
            WHERE Name = :reportRequest.Name
        ];

        if (reports.isEmpty()) {
            return 'The Report ' + reportRequest.Name + ' does not exist';
        }
        
        // Publish a Platform Event.
        GoogleAssistantRequest__e googleAssistantRequest = new GoogleAssistantRequest__e(
            DeveloperName__c = reports[0].DeveloperName,
            Filter__c = reportRequest.getFilterValue()
        );
        Database.SaveResult result = EventBus.publish(googleAssistantRequest);
        return 'Displaying the report ' + reports[0].Name;
        
    }

    /*******************************************************************************************************
    * @description Wrapper of the Webservice Request.
    ********************************************************************************************************/
    global class ReportRequest {
        public String Name;
        public FilterRequest Filter;

        /*******************************************************************************************************
        * @description Converts the Request Filter to Component.Analytics.ReportChart filter format.
        * @return String. Component.Analytics.ReportChart filter format.
        ********************************************************************************************************/
        public String getFilterValue() {
            if (Filter.isNotNull()) {
                Filter.column = Filter.column.toUpperCase();
                Filter.value = Filter.value.remove(',');
                Filter.value = Filter.value.remove('$');
                return JSON.serialize(new List<FilterRequest>{Filter});
            }
            return '';
        }
    }

    /*******************************************************************************************************
    * @description Filter Wrapper. 
    ********************************************************************************************************/
    global class FilterRequest {
        public String column;
        public String operator;
        public String value;

        /*******************************************************************************************************
        * @description Validates if the filter is not null
        * @return Boolean.
        ********************************************************************************************************/
        public Boolean isNotNull() {
            return (
                String.isNotBlank(column) && String.isNotBlank(operator) && String.isNotBlank(value) &&
                column != 'null' && operator != 'null' && value != 'null'
            );
        }
    }
}