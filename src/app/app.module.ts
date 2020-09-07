import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ReportsComponent } from './reports/reports.component';
import { FeaturesComponent } from './features/features.component';
import {SafePipe} from './pipe/safe.pipe';
import {AppHttpService} from './scanner/app-http.service';

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
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
