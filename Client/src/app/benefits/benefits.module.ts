import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BenefitsRoutingModule } from './benefits-routing.module';

import { SearchComponent } from './search/search.component';




@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule, BenefitsRoutingModule, FormsModule
  ]
})
export class BenefitsModule { }
