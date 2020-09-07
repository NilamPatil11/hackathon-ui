import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

	constructor(private httpClient: HttpClient){}

  saveXPath(url, params): Observable<any>{
  	console.log(JSON.stringify(params));
  	return this.httpClient.post(url, params);
  }

  getXPath(url): Observable<any>{
  	//this.constants+"/xpathReq/getXPath"
  	return this.httpClient.get(url);
  }
}
