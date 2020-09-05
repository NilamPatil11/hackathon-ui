import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scanner-tools';
  routePath:any;
  constructor(private activatedRoute: ActivatedRoute) {
  	console.log(activatedRoute.snapshot['_routerState'].url);
  	console.log("window.location.pathname;=====>", window.location.pathname);
  	this.routePath = window.location.pathname == '/scanner' || window.location.pathname == '/reports' ? true : false;
  }
}
