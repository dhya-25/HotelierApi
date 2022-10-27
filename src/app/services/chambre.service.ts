import { Chambre } from '@/Model/chambre';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;
@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }

  GetChambre = (): Observable<Chambre[]> =>{
    
    return this.httpClient.get<Chambre[]>(API_URL + '/chambre/get');
  }
  public AddChambre(chambre: Chambre){
 
    
    return this.httpClient.post<any>(API_URL + '/chambre/add',chambre)
  }
  GetChambreByCode = (code:String ): Observable<Chambre[]> =>{
    
    return this.httpClient.get<Chambre[]>(API_URL + '/chambre/getbycodagence/' + code);
  }
}
