import { ContratAgence } from '@/Model/ContratAgence';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class ContartAgenceService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }

  
  GetContratAgence = (): Observable<ContratAgence[]> =>{
    
    return this.httpClient.get<ContratAgence[]>(API_URL + '/contratAgence/get');
  }

  // GetHotelById = (idH : number): Observable<ContratAgence[]> =>{
    
  //   return this.httpClient.get<ContratAgence[]>(API_URL + '/contratAgence/getbyid' + idH);
  // }

  public AddContratAgence(hotel: any){
 
    
    return this.httpClient.post<any>(API_URL + '/contratAgence/add',hotel)
  }

deleteContratAgence(id:number){
  return this.httpClient.delete<ContratAgence>(API_URL + '/contratAgence/'+ id)
}

putContratAgence(data:ContratAgence):Observable<any>{
  return this.httpClient.put<ContratAgence>(API_URL +'/contratAgence/update',data);
}
}
