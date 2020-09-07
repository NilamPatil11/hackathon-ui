import { Component, OnInit } from '@angular/core';
import {AppHttpService} from '../scanner/app-http.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  isShowacordianForReportDetails:boolean = false;
  rowData:any;
  oldPath : any;
  newPath  :any;
  urlList : any;
  api_url: string = window.location.protocol+"//"+window.location.hostname+":3009/xpathReq";
  reportData: any=[];
  constructor(private appService: AppHttpService){

  }
  gridData = [];
//   gridData =   [
//     {
//     "PageName" : "DQM Application Dashboard",
//     "PageURL" : "http://localhost/#/DQM1",
//     "CurrentxPath": "/HTML/BODY/APP-ROOT/APP-FEATURES/NAV/DIV/UL/LI[2]/A",
//     "PreviousxPath" : "/HTML/BODY/APP-ROOT/APP-FEATURES/NAV/DIV/UL/LI[2]/A",
//     "Result" : "Matching",
//     "isOverAll" : false,
//     "text" :'',
//     "detailsData":[
//       {
//         PageName : "",
//         PageURL : "",
//         CurrentxPath: "/HTML/BODY/APP-ROOT/APP-FEATURES/NAV/DIV/UL/LI[2]/A",
//         PreviousxPath : "",
//         Result : "New Element",
//         isOverAll : false,
//         text :''
//       },{
//         PageName : "",
//         PageURL : "",
//         CurrentxPath: "",
//         PreviousxPath : "/HTML/BODY/APP-ROOT/APP-FEATURES/NAV/DIV/UL[2]/LI[2]/A",
//         Result : "Removed Element",
//         isOverAll : false,
//         text :''
//       },
//       {
//         PageName : "Page Overall Statistics",
//         PageURL : "",
//         CurrentxPath: "",
//         PreviousxPath : "",
//         Result : "",
//         isOverAll : true,
//         text : "20% Matching, 10% new Elements, 20% Removed in current version"
//       }
//     ]
//     }, 
//   {
//     "PageName" : "DQM Application Dashboard2",
//     "PageURL" : "http://localhost/#/DQM2",
//     "CurrentxPath": "/HTML/BODY/APP-ROOT/APP-FEATURES/APP-INTERNAL-LOSSESS/DIV/DIV/TABLE/THEAD/TR/TH",
//     "PreviousxPath" : "/HTML/BODY/APP-ROOT/APP-FEATURES/APP-INTERNAL-LOSSESS/DIV/DIV/TABLE/THEAD/TR/TH",
//     "Result" : "Matching",
//     "isOverAll" : false,
//     "text" :'',
//     "detailsData":[
//       {
//         PageName : "",
//         PageURL : "",
//         CurrentxPath: "/HTML/BODY/APP-ROOT/APP-FEATURES/APP-INTERNAL-LOSSESS/DIV/DIV/TABLE/THEAD/TR/TH",
//         PreviousxPath : "",
//         Result : "New Element",
//         isOverAll : false,
//         text :''
//       },
//       {
//         PageName : "",
//         PageURL : "",
//         CurrentxPath: "",
//         PreviousxPath : "/HTML/BODY/APP-ROOT/APP-FEATURES/APP-INTERNAL-LOSSESS/DIV/DIV/TABLE/THEAD/TR[3]/TH",
//         Result : "Removed Element",
//         isOverAll : false,
//         text :''
//       }, {
//         PageName : "Page Overall Statistics",
//         PageURL : "",
//         CurrentxPath: "",
//         PreviousxPath : "",
//         Result : "",
//         isOverAll : true,
//         text : '40% Matching, 10% new Elements, 20% Removed in current version'
//       }
//     ]
//   } ,
// ]
expandedIndex = -1;

  

  ngOnInit(): void {
    // this.getReportDetails();
    this.appService.getXPath(this.api_url+"/getXPath").subscribe((res) => {
      // console.log("Response==>", res);
      this.reportData = res.responseData;
    })
  }

  getReportDetails(){
  this.urlList = JSON.parse(localStorage.getItem("urlList"))

    if(localStorage.getItem("oldXpath")){
      this.oldPath = JSON.parse(localStorage.getItem("oldXpath")); 
    }
    if(localStorage.getItem("CurrentXpath")){
      this.newPath = JSON.parse(localStorage.getItem("CurrentXpath")); 
    }

    this.urlList.forEach(element => {
      let olddata = this.oldPath ? this.oldPath.filter(x => x.id === element.id) : [];
      let newData = this.newPath ? this.oldPath.filter(x => x.id === element.id) : [];

      var onlyOld = olddata.filter(this.comparer(newData));
      var onlyNew = newData.filter(this.comparer(olddata));
      let  result = onlyNew.concat(onlyOld);

      this.gridData.push( {
        "PageName" : element.PageName,
        "PageURL" : element.applicationURL,
        "CurrentxPath": newData,
        "PreviousxPath" : olddata,
        "Result" : result.length ? "Not Matching" :  "Matching",
        "isOverAll" : false,
        "text" :'',
        "detailsData":[
          {
            PageName : "",
            PageURL : "",
            CurrentxPath: onlyNew,
            PreviousxPath : "",
            Result : "New Element",
            isOverAll : false,
            text :''
          },{
            PageName : "",
            PageURL : "",
            CurrentxPath: "",
            PreviousxPath : onlyOld,
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
        })


    });
    
  }

   comparer(otherArray){
    return (current)=> {
      return otherArray.filter(function(other){
        return other.value == current.value && other.display == current.display
      }).length == 0;
    }
  }

  showDetails(item:any,index){
    this.expandedIndex = index === this.expandedIndex ? -1 : index; 
  }

}
