import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isShowacordianForReportDetails:boolean = false;
  rowData:any;

  constructor(){

  }

  gridData =   [
    {
    "PageName" : "DQM Application Dashboard",
    "PageURL" : "localhost/#/DQM1",
    "CurrentxPath": ".body/xpath1",
    "PreviousxPath" : ".body/xpath1",
    "Result" : "Matching",
    "isOverAll" : false,
    "text" :'',
    "detailsData":[
      {
        PageName : "",
        PageURL : "",
        CurrentxPath: ".body/xpath2",
        PreviousxPath : "",
        Result : "New Element",
        isOverAll : false,
        text :''
      },{
        PageName : "",
        PageURL : "",
        CurrentxPath: "",
        PreviousxPath : ".body/xpath3",
        Result : "Removed Element",
        isOverAll : false,
        text :''
      },
      {
        PageName : "Page Overall Statistics",
        PageURL : "",
        CurrentxPath: "",
        PreviousxPath : "",
        Result : "",
        isOverAll : true,
        text : "20% Matching, 10% new Elements, 20% Removed in current version"
      }
    ]
    }, 
  {
    "PageName" : "DQM Application Dashboard2",
    "PageURL" : "localhost/#/DQM2",
    "CurrentxPath": ".body/xpath1",
    "PreviousxPath" : ".body/xpath1",
    "Result" : "Matching",
    "isOverAll" : false,
    "text" :'',
    "detailsData":[
      {
        PageName : "",
        PageURL : "",
        CurrentxPath: ".body/xpath2",
        PreviousxPath : "",
        Result : "New Element",
        isOverAll : false,
        text :''
      },
      {
        PageName : "",
        PageURL : "",
        CurrentxPath: "",
        PreviousxPath : ".body/xpath3",
        Result : "Removed Element",
        isOverAll : false,
        text :''
      }, {
        PageName : "Page Overall Statistics",
        PageURL : "",
        CurrentxPath: "",
        PreviousxPath : "",
        Result : "",
        isOverAll : true,
        text : '40% Matching, 10% new Elements, 20% Removed in current version'
      }
    ]
  } ,
]
expandedIndex = -1;

  

  ngOnInit(): void {
  }
  showDetails(item:any,index){
    this.expandedIndex = index === this.expandedIndex ? -1 : index; 
  }

}
