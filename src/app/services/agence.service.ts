import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Agence } from '../Model/Agence';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }

  GetAgence = (): Observable<Agence[]> =>{
    
    return this.httpClient.get<Agence[]>(API_URL + '/agence/get');
  }

  public AddAgence(agence: any){
 
    
    return this.httpClient.post<any>(API_URL + '/agence/add',agence)
  }
  deleteAgence(id:number){
    return this.httpClient.delete<any>(API_URL + '/agence/'+ id)
  }

  putAgence(data:Agence):Observable<any>{
    return this.httpClient.put<Agence>(API_URL +'/agence/update',data);
  }

}
