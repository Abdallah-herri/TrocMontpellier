import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  isEmpty = false;
  wronginfos = false;
  constructor(private Auth: AuthService,
              private router: Router) {
  }


  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const email = target.querySelector('#email').value
    const password = target.querySelector('#password').value

    if(email == "" || password == "")
    {
        this.isEmpty = true;
        this.router.navigate(['/member']);
    }
    else
    {
        this.isEmpty = false;
    }

    this.Auth.Login(email, password).subscribe(data => {
      console.log(data[0])
	      if(data[0].success)
        {
          sessionStorage.setItem('idmembre', data[0].documents.idmembre);
          sessionStorage.setItem('fname', data[0].documents.prenom);
          sessionStorage.setItem('lname', data[0].documents.nom);
          sessionStorage.setItem('adresse', data[0].documents.adresse);
          sessionStorage.setItem('email', data[0].documents.email);
          sessionStorage.setItem('password', data[0].documents.password);
          sessionStorage.setItem('tel', data[0].documents.tel);
          this.Auth.setIsConnected(true);
          this.router.navigate([''])
        }
        else
        {
          this.wronginfos = true
          this.router.navigate(['/member'])
        }
    })

  }

  ngOnInit() {
  }

}
