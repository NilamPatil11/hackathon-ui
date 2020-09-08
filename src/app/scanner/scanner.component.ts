import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {WindowRefService} from '../window-ref.service';
// declare var $: any;
import { Observable , of, VirtualTimeScheduler} from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { JsonPipe } from '@angular/common';
import {AppHttpService} from './app-http.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
	url: string = window.location.protocol+"//"+window.location.hostname+"/features/dashboard";
	//  "http://localhost:4402/features/dashboard&output=embed";
	//urlSafe: SafeResourceUrl;
	api_url: string = window.location.protocol+"//"+window.location.hostname+":3009/xpathReq";
	//target_origin: string = "http://localhost:4402";
	xname:any;
	idx:any;
	iframeObj:any;
	xPath:any=[];
	totalInprogress = 0;
	totalscanned = 0;
	appDetails : any;
	iframeId:any;
	allXpaths :  any;
	oldXapth : any;
	currentUrl: string;
	URLList = [
		{
			"id":1,
			"PageName" : "DQM Application Dashboard",
		"ApplicationName" : "Data Quality Monitoring",
		"applicationURL": `${location.origin}/features/dashboard`,
		"isScanned": false,
		"isScanningProgress":false,
		"baseURL":"http://localhost:4200"
		},
		{
			"id":2,
			"PageName" : "DQM Application internal-losses",
			"ApplicationName" : "Data Quality Monitoring",
			"applicationURL": `${location.origin}/features/internal-losses`,  //"http://localhost:4200/features/internal-losses",
			"isScanned": false,
			"isScanningProgress":false,
			"baseURL":"http://localhost:4200"
		},
		{
			"id":3,
			"PageName" : "DQM Application external-events",
			"ApplicationName" : "Data Quality Monitoring",
			"applicationURL": `${location.origin}/features/external-events`, // "http://localhost:4200/features/external-events",
			"isScanned": false,
			"isScanningProgress":false,
			"baseURL":"http://localhost:4200"
		}
	]

  constructor(public sanitizer: DomSanitizer, private winRef: WindowRefService, private appSerice: AppHttpService) {
  		
   }

  ngOnInit(): void {
	  localStorage.setItem("urlList", JSON.stringify(this.URLList));
	  
	  localStorage.removeItem("CurrentXpath");
		localStorage.removeItem("oldXpath");
	  //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
	  var flags = {};
	  this.appDetails =  this.URLList.map(x =>  { return { appName : x.ApplicationName, baseURL : x.baseURL } } )
	  .filter( function(item){
		if (flags[item.appName]) {
			return false;
		}
		flags[item.appName] = true;
		return true;
	  });
  }

  ngAfterViewInit() {
  	this.iframeId = document.getElementById("framePanel");
  }

  getInProgressApplicationUrls(appName){
	return this.URLList.filter(x => x.ApplicationName === appName && x.isScanningProgress  );;
  }
  getCompletedApplicationUrls(appName){
	return this.URLList.filter(x => x.ApplicationName === appName && x.isScanned );
  }

  async generateXPath(index){
	
	  if(!index){
		this.URLList.forEach(x => {
			x.isScanned = false,
			x.isScanningProgress = false
		})
		  if(localStorage.getItem("CurrentXpath")){
			  this.oldXapth = JSON.parse(localStorage.getItem("CurrentXpath"));
		  }
		this.allXpaths = [];
	  }
	  
	if(this.URLList.length > index)
	{
		var data =   Object.assign([], this.URLList);
		this.updateStatus(data[index], false, true );
		this.url  = data[index].applicationURL;
		setTimeout(()=>{
		 this.scanURL(data[index], index)
		},5000);
	}else{
		localStorage.setItem("CurrentXpath",  JSON.stringify(this.allXpaths));
		localStorage.setItem("oldXpath", JSON.stringify(this.oldXapth));
		this.appSerice.saveXPath(this.api_url+"/saveXPath", {"XPATH":this.allXpaths,"URL":this.currentUrl,"APPNAME":"DQM Apllication","APPID":1,"PAGENAME":window.location.pathname}).subscribe((res) => {
			console.log("Response==>", res);
		})
	}
}


updateStatus(item, isScanned, isScanningProgress){
	
	var flags = {};
	this.URLList.forEach(x =>{
		x.isScanned = x.id === item.id ? isScanned : x.isScanned;
		x.isScanningProgress = x.id === item.id ? isScanningProgress : x.isScanningProgress;
	});

	this.appDetails =  this.URLList.map(x =>  { return { appName : x.ApplicationName, baseURL : x.baseURL } } )
	.filter( function(item){
	  if (flags[item.appName]) {
		  return false;
	  }
	  flags[item.appName] = true;
	  return true;
	});
  }

    scanURL(item, index){
	// return new Promise<void>(resolve => {
	
  	this.xPath = [];
  	this.currentUrl = this.iframeId.contentWindow.location.href;
  	var all = this.iframeId.contentWindow.document.getElementsByTagName("*");
	// var all = this.iframeObj;
		for (var i=0, max=all.length; i < max; i++) {
		     // Do something with the element here
		    var ele = all[i];
		    var path = this.getElementXPath(ele);
		    console.log("path:: "+path);
			this.xPath.push(path);
		}
		this.allXpaths.push( {id: item.id, scanUrl:this.currentUrl, path: this.xPath})
		this.updateStatus(item, true, false );
		this.generateXPath(index+1);
		//resolve()
	
	//});
  }

  

getElementXPath(elt)
{
     var path = "";
     for (; elt && elt.nodeType == 1; elt = elt.parentNode)
     {
       this.idx = this.getElementIdx(elt);
    this.xname = elt.tagName;
    if (this.idx > 1) this.xname += "[" + this.idx + "]";
    path = "/" + this.xname + path;
     }
 
     return path;    
}
getElementIdx(elt)
{
    var count = 1;
    for (var sib = elt.previousSibling; sib ; sib = sib.previousSibling)
    {
        if(sib.nodeType == 1 && sib.tagName == elt.tagName)    count++
    }
    
    return count;
}


}
