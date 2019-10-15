import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isEmpty = false;
  wronginfos = false;

  constructor(private Auth: AuthService, private router: Router) { }

  registerUser(event) {
    event.preventDefault()
    const target = event.target
    const fname = target.querySelector('#fname').value
    const lname = target.querySelector('#lname').value
    const adresse = target.querySelector('#adresse').value
    const email = target.querySelector('#email_m').value
    const tel = target.querySelector('#tel').value
    const password = target.querySelector('#password_m').value


    if(fname == "" || lname == "" || adresse == "" || email == "" || tel == "" || password == "")
    {
        this.isEmpty = true;
        this.router.navigate(['/member']);
    }
    else
    {
        this.isEmpty = false;
        this.Auth.Register(fname, lname, adresse, email, tel, password).subscribe(data => {
    	      if(data[0].success)
            {
              sessionStorage.setItem('idmembre', data[0].idmembre);
              sessionStorage.setItem('fname', fname);
              sessionStorage.setItem('lname', lname);
              sessionStorage.setItem('adresse', adresse);
              sessionStorage.setItem('email', email);
              sessionStorage.setItem('password', password);
              sessionStorage.setItem('tel', tel);
              this.Auth.setIsConnected(true);
              this.router.navigate(['']);
              console.log(sessionStorage.getItem('idmembre'))
            }
            else
            {
              this.wronginfos = true;
              this.router.navigate(['/member']);
            }
        })
     }
  }

  ngOnInit() {
  }

}
