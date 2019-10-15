import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: './benefits/benefits.module#BenefitsModule'
	},
	{
		path: 'member',
		loadChildren: './member/member.module#MemberModule'
	},
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports : [RouterModule.forRoot(routes)],
	exports : [RouterModule]
})

export class AppRoutingModule { }
