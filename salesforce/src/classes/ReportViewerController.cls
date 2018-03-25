/*******************************************************************************************************
* @Description: Report Viewer Page Controller.
* @Author: Kofi Johnson - https://github.com/kofijohnson
********************************************************************************************************/

public with sharing class ReportViewerController {
    public String reportDeveloperName {get; set;}
    public String reportFilter {get; set;}
    public transient Component.Analytics.ReportChart reportChart {get; set;}

    /*******************************************************************************************************
    * @description Constructor.
    ********************************************************************************************************/
    public ReportViewerController() {
        reportDeveloperName = '';
        reportFilter = '';
        reportChart = new Component.Analytics.ReportChart(
            DeveloperName = reportDeveloperName,
            Filter = reportFilter,
            Rendered = String.isNotBlank(reportDeveloperName),
            HideOnError = true,
            CacheResults = false,
            ShowRefreshButton = true,
            Size = 'huge'
        );
    }

    /*******************************************************************************************************
    * @description Displays the report on the Visualforce Page.
    ********************************************************************************************************/
    public void display() {
        reportChart = new Component.Analytics.ReportChart(
            DeveloperName = reportDeveloperName,
            Filter = reportFilter,
            Rendered = String.isNotBlank(reportDeveloperName),
            HideOnError = true,
            CacheResults = false,
            ShowRefreshButton = true,
            Size = 'huge'
        );
    }
}