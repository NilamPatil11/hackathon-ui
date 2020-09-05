import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ReportsComponent } from './reports/reports.component';
import { FeaturesComponent } from './features/features.component';
import {SafePipe} from './pipe/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    ReportsComponent,
    FeaturesComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
