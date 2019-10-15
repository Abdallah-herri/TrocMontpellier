import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InfoComponent } from './info/info.component';
import { MyBenefitsComponent } from './my-benefits/my-benefits.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { AddBenefitComponent } from './add-benefit/add-benefit.component';

import { AuthGuard } from '../services/auth/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: InfoComponent
	},
	{
		path: 'my-loans',
		component: MyLoansComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'my-benefits',
		component: MyBenefitsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'add-benefit',
		component: AddBenefitComponent,
		canActivate: [AuthGuard]
	},
];

@NgModule({
	imports : [RouterModule.forChild(routes)],
	exports : [RouterModule]
})

export class MemberRoutingModule { }
