import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {WindowRefService} from '../window-ref.service';
// declare var $: any;
import { Observable , of} from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
	url: string = "http://localhost:4200/features/dashboard";
	//  "http://localhost:4402/features/dashboard&output=embed";
	//urlSafe: SafeResourceUrl;
	
	target_origin: string = "http://localhost:4402";
	xname:any;
	idx:any;
	iframeObj:any;
	xPath:any=[];
	totalInprogress = 0;
	totalscanned = 0;
	appDetails : any;
	iframeId:any;
	URLList = [
		{
			"id":1,
		"ApplicationName" : "DQM",
		"applicationURL": "http://localhost:4200/features/dashboard",
		"isScanned": false,
		"isScanningProgress":false,
		"baseURL":"http://localhost:4200"
		},
		{
			"id":2,
			"ApplicationName" : "DQM",
			"applicationURL": "http://localhost:4200/features/internal-losses",
			"isScanned": false,
			"isScanningProgress":false,
			"baseURL":"http://localhost:4200"
		},
		{
			"id":3,
			"ApplicationName" : "DQM",
			"applicationURL": "http://localhost:4200/features/external-events",
			"isScanned": false,
			"isScanningProgress":false,
			"baseURL":"http://localhost:4200"
		}
	]

  constructor(public sanitizer: DomSanitizer, private winRef: WindowRefService) {
  		
   }

  ngOnInit(): void {
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

  async generateXPath(){
	var data =   Object.assign([], this.URLList);
	var i = 0;
	//data.forEach((element, index) => {
		for(var element of data){
			this.updateStatus(element, false, true );
		
			await this.scanURL(element, 0)
		}
		
	//})
	// while(i < data.length )
	// {
		
		 
		
		

	// }
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
		
	this.url  = item.applicationURL;
  	this.xPath = [];
  	
  	var all = this.iframeId.contentWindow.document.getElementsByTagName("*");
	// var all = this.iframeObj;
		for (var i=0, max=all.length; i < max; i++) {
		     // Do something with the element here
		    var ele = all[i];
		    var path = this.getElementXPath(ele);
		    console.log("path:: "+path);
		    this.xPath.push(path);
		 
		}
		this.updateStatus(item, true, false );
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
