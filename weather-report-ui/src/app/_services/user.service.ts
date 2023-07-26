import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const API_URL = 'http://localhost:8001/';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getToken():any{
    this.tokenStorage.getToken()
  }
  getWatherforMajorCity(city:string): Observable<any> {


    return this.http.get(API_URL + 'api/weather?city='+city, { 
      responseType: 'text',
      headers: new HttpHeaders({ 'Authorization': "Bearer "+this.tokenStorage.getToken() ?? ''})
      
    });
  }
}
