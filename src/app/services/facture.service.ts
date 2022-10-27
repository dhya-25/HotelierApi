import { Facture } from '@/Model/Facture';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }
  GetFacture = (): Observable<Facture[]> =>{
    
    return this.httpClient.get<Facture[]>(API_URL + '/facture/get');
  }
  
  GetFactureById = (idH : number): Observable<Facture[]> =>{
    
    return this.httpClient.get<Facture[]>(API_URL + '/facture/getbyid/' + idH);
  }
  getReportFacture(ReportName : any, numFactInd : any ) {
    const httpOptions = {
        //'responseType'  : 'arraybuffer' as 'json'
         'responseType'  : 'blob' as 'json'  
      };
    return this.httpClient.get<any>(API_URL +'/facture/report/'+ ReportName +'/'+numFactInd, httpOptions );
} 
public AddFacture(facture: any){
 
    
  return this.httpClient.post<any>(API_URL + '/facture/add',facture)
}

deleteEtatChambre(id:number){
  return this.httpClient.delete<Facture>(API_URL + '/facture/'+ id)
}
}
