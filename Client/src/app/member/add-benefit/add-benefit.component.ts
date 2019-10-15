import { Component, OnInit } from '@angular/core';
import { BenefitsService } from '../../services/benefits/benefits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.css']
})

export class AddBenefitComponent implements OnInit {

  private disponibilites: Array<any> = [];
  private mots_clefs: Array<any>;
  isEmpty = false;
  isDispo = false;
  success;

  constructor(private Benefitservice: BenefitsService, private router: Router) { }

  adddisponibility()
  {
    this.disponibilites.push({
      "idDisponibilite" : "",
			"date": "",
			"heure": "",
      "isReserved" : "0"
		});
  }

  removedisponibility()
  {
    this.disponibilites.pop();
  }

  addBenefit(event)
  {
    event.preventDefault();
    const target = event.target;
    const type = target.querySelector('#type').value
    const name =  target.querySelector('#name').value
    const description =  target.querySelector('#decription').value
    const price =  target.querySelector('#price').value
    const mots_clefs = target.querySelector('#mots_clefs').value.split(" ")
    const idmembre = sessionStorage.getItem('idmembre')

    for (let i = 0; i < mots_clefs.length; i++)
    {
      if(mots_clefs[i] == "")
      {
        mots_clefs.splice(i, 1)
        i--;
      }
    }

    this.isEmpty =  (name == "" || description == "" || price == "" || mots_clefs.length == 0) ? true : false;
    this.isDispo = (this.disponibilites.length == 0) ? true : false;

    if(this.isEmpty == true || this.isDispo == true)
    {
      return;
    }
    else
    {
      this.Benefitservice.creationBenefit(idmembre, type, name, description, price, mots_clefs, this.disponibilites).subscribe(data => {
          if(data[0].success)
          {
            this.router.navigate(['member/my-benefits'])
          }
          else
          {
            this.success = false;
          }

      })
    }
  }

  ngOnInit() {
  }

}
