import { Component, OnInit } from '@angular/core';
import { BenefitsService } from '../../services/benefits/benefits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-benefits',
  templateUrl: './my-benefits.component.html',
  styleUrls: ['./my-benefits.component.css']
})
export class MyBenefitsComponent implements OnInit {

  delete = false;
  private mes_biens: Array<any> = [];
  private mes_services: Array<any> = [];

  constructor(private b_service: BenefitsService, private router: Router) { }


  ngOnInit() {
    this.b_service.getBenefits(sessionStorage.getItem("idmembre"), "bien").subscribe(data => {
      this.mes_biens = data[0].documents;

      this.b_service.getBenefits(sessionStorage.getItem("idmembre"), "service").subscribe(data => {
        this.mes_services = data[0].documents;
      });
    });




  }

  deleteBenefit(id, type) {
      this.b_service.deleteBenefit(id, type).subscribe(data => {
        if(data[0].success)
        {
          location.reload();
        }
      })
  }

}
