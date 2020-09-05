import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScannerComponent} from './scanner/scanner.component';
import {ReportsComponent} from './reports/reports.component';
import {FeaturesComponent} from './features/features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExternalEventsComponent } from './external-events/external-events.component';
import { InternalLossessComponent } from './internal-lossess/internal-lossess.component';

const routes: Routes = [
	{
		path:'',
		redirectTo:'scanner',
		pathMatch:'full'		
	},
	{
	path: "scanner", component:ScannerComponent
}, {
	path: "reports", component: ReportsComponent
},{
	path: "features", component: FeaturesComponent, children:[
		{ path: 'dashboard', component: DashboardComponent },
		{ path: 'internal-losses', component: InternalLossessComponent },
		{ path: 'external-events', component: ExternalEventsComponent }
	]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
