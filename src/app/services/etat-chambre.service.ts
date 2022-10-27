import { EtatChambre } from '@/Model/EtatChambre';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class EtatChambreService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }

  GetEtatChambre = (): Observable<EtatChambre[]> =>{
    
    return this.httpClient.get<EtatChambre[]>(API_URL + '/etatChambre/get');
  }
  GetOccupParCateg = (): Observable<EtatChambre[]> =>{
    
    return this.httpClient.get<EtatChambre[]>(API_URL + '/etatChambre/getOccup');
  }

  // GetHotelById = (idH : number): Observable<ContratAgence[]> =>{
    
  //   return this.httpClient.get<ContratAgence[]>(API_URL + '/contratAgence/getbyid' + idH);
  // }

  public AddEtatChambre(hotel: any){
 
    
    return this.httpClient.post<any>(API_URL + '/etatChambre/add',hotel)
  }

deleteEtatChambre(id:number){
  return this.httpClient.delete<EtatChambre>(API_URL + '/etatChambre/'+ id)
}

putEtatChambre(data:EtatChambre):Observable<any>{
  return this.httpClient.put<EtatChambre>(API_URL +'/etatChambre/update',data);
}
}
