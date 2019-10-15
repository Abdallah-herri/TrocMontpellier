import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberRoutingModule } from './member-routing.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { InfoComponent } from './info/info.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { MyBenefitsComponent } from './my-benefits/my-benefits.component';
import { AddBenefitComponent } from './add-benefit/add-benefit.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfilComponent, InfoComponent, MyLoansComponent, MyBenefitsComponent, AddBenefitComponent],
  imports: [
    CommonModule, MemberRoutingModule, FormsModule
  ]
})
export class MemberModule { }
