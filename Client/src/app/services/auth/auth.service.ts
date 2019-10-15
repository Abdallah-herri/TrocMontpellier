import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isConnected = false;

  headers: any = {
    "accept" :"application/json",
    "content-type" : "application/json"
  }

  request: HttpHeaders = new HttpHeaders(this.headers);

  http_post: Observable<any>;

  constructor(private http: HttpClient) { }

  Login(email, password) {
    let url = "http://localhost:8888/login";

    let data = {
      "email" : email,
      "password" : password
    };

    this.http_post = this.http.post(url, data, {headers : this.request});

    return this.http_post;
  }

  Register(fname, lname, adresse, email, tel, password) {
    let url = "http://localhost:8888/Register";

    let data = {
      "nom" : fname,
      "prenom" : lname,
      "adresse" : adresse,
      "email" : email,
      "tel" : tel,
      "password" : password
    };

    let headers: any = {
      "accept" :"application/json",
      "content-type" : "application/json"
    }



    this.http_post = this.http.post(url, data, {headers : this.request});

    return this.http_post;
  }

  setIsConnected(temp: boolean){
    this.isConnected = temp;
  }

  getIsConnected():boolean {
    return this.isConnected;
  }
}
