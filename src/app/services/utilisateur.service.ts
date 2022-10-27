import { Utilisateur } from '@/Model/Utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();
  }
  GetUtilisateur = (): Observable<any[]> =>{
    
    return this.httpClient.get<any[]>('http://127.0.0.1:8053/api/auth/get');
  }

  public AddTypeChambre(util: Utilisateur){
 
    
    return this.httpClient.post<Utilisateur>(API_URL + '/api/auth/signup',util)
  }
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(API_URL + '/api/auth/signin', {
      username,
      password
    }, httpOptions);
  }

}
