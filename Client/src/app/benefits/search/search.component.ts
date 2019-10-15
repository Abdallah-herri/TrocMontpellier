import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { BenefitsService } from '../../services/benefits/benefits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  isEmpty = false;
  noResults = false;
  private liste: Array<any>;
  constructor(private Auth: AuthService,
              private b_service: BenefitsService,
              private router: Router) { }

  ngOnInit() {
  }

  searchBenefit(event) {
    this.liste = [];
    const target = event.target
    const type = target.querySelector('#type').value
    const date_emprunt = target.querySelector('#date_emprunt').value
    const mot_clef = target.querySelector('#mot_clef').value
    const idmembre = sessionStorage.getItem('idmembre')

    if(date_emprunt == "" || mot_clef == "")
    {
        this.isEmpty = true;
        this.router.navigate(['']);
        return;
    }

    mot_clef = mot_clef.split(" ")
    for (let i = 0; i < mot_clef.length; i++)
    {
      if(mot_clef[i] == "")
      {
        mots_clefs.splice(i, 1)
        i--;
      }
    }

    this.isEmpty = false;
    this.b_service.Search(type, date_emprunt, mot_clef).subscribe(data => {
      if (data.length == 0)
      {
        this.noResults = true;
        return;
      }
      else
      {
        this.noResults = false;
        this.b_service.getDetails(data, type).subscribe(result => {
          this.liste = result;
        });
      }

    })
  }

  reserver(event)
  {
    event.preventDefault()
    const target = event.target
    const id = target.querySelector('#id').value
    const type = target.querySelector('#type').value
    const id_dispo = target.querySelector('#id_dispo').value
    this.b_service.Reserver(id, type, id_dispo).subscribe( data => {
      location.reload('');
    });
  }

  getIsConnected():boolean
  {
    return (sessionStorage.getItem('idmembre') != null);
  }
}
