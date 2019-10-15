import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor(private Auth: AuthService) { }

  getIsConnected():boolean {
    return (sessionStorage.getItem('email') != null)
  }
  ngOnInit() {
  }


}
