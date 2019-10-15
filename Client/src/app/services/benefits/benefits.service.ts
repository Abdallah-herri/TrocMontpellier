import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {


    isConnected = false;

    headers: any = {
      "accept" :"application/json",
      "content-type" : "application/json"
    }

    request: HttpHeaders = new HttpHeaders(this.headers);

    http_post: Observable<any>;

    constructor(private http: HttpClient) { }

    getBenefits(idmembre, type) {

      let url = "http://localhost:8888/getbenefit";

      let data = {
        "idmembre" : idmembre,
        "type" : type
      };

      this.http_post = this.http.post(url, data, {headers : this.request});

      return this.http_post;
    }

    creationBenefit(idmembre, type, name, description, price, mots_clefs, disponibilites) {
      let url;

      url = (type == "bien") ? "http://localhost:8888/creationBien" : "http://localhost:8888/creationService"

      let data = {
        "idmembre" : idmembre,
        "nom" : name,
        "descriptif" : description,
        "PrixNeuf" : price,
        "tags" : mots_clefs,
        "disponibilites" : disponibilites
      };

      this.http_post = this.http.post(url, data, {headers : this.request});

      return this.http_post;
    }

    deleteBenefit(id, type) {
      let url = "http://localhost:8888/removeBenefit";

      let data = {
        "id" : id,
        "type" : type
      };

      this.http_post = this.http.post(url, data, {headers : this.request});

      return this.http_post;
    }

    Search(type, date_emprunt, mot_clef)
    {
      let url = "http://localhost:8888/Search";

      let data = {
        "type" : type,
        "date_emprunt" : date_emprunt,
        "mot_clef" : mot_clef
      };

      this.http_post = this.http.post(url, data, {headers : this.request});

      return this.http_post;
    }

    getDetails(liste_id, type)
    {
      let url = "http://localhost:8888/getDetails";

      let data = {
        "type" : type,
        "data" : liste_id
      }
      this.http_post = this.http.post(url, data, {headers : this.request});
      return this.http_post;
    }

    Reserver(id, type, id_dispo)
    {
      {
        let url = "http://localhost:8888/reserverBenefit";

        let data = {
          "id" : id,
          "type" : type,
          "id_dispo" : id_dispo
        }
        this.http_post = this.http.post(url, data, {headers : this.request});
        return this.http_post;
      }
    }
}
