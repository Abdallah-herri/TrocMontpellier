import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isConnected = false;

  constructor (private Auth: AuthService) {}
  // getIsConnected()
  // {
  //   console.log(this.Auth.getIsConnected())
  //   return this.Auth.getIsConnected()
  // }

  getIsConnected():boolean
  {
    return (sessionStorage.getItem('idmembre') != null);
  }
  logout() {
    sessionStorage.clear();
    this.isConnected = false;
  }

  ngOnInit() {
    // console.log(getIfConnected())
  }
}
