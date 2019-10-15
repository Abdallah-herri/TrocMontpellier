import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor() { }
  nom = sessionStorage.getItem('lname');
  prenom = sessionStorage.getItem('fname');
  adresse = sessionStorage.getItem('adresse');
  email = sessionStorage.getItem('email');
  tel = sessionStorage.getItem('tel');
  ngOnInit() {
  }

}
