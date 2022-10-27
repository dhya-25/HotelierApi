import { Consommation } from '@/Model/Consommation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class ConsommationService {
  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }
  GetConsommation = (): Observable<Consommation[]> =>{
    
    return this.httpClient.get<Consommation[]>(API_URL + '/consommation/get');
  }
  public AddConsommation(conso: Consommation){
 
    
    return this.httpClient.post<Consommation>(API_URL + '/consommation/add',conso)
  }

  deleteConsommation(id:number){
    return this.httpClient.delete<Consommation>(API_URL + '/consommation/'+ id)
  }

  putContratAgence(data:Consommation):Observable<any>{
    return this.httpClient.put<Consommation>(API_URL +'/consommation/update',data);
  }
  // createProduit(formData:FormData):Observable<Object>{
  //   return this.httpClient.post('/api/produit/add',formData).pipe(catchError(this.handleError));
  // }
  //    AddConsommation(formatdata: FormData){
 
    
  //   return this.httpClient.post(API_URL + '/consommation/add',formatdata).
  //   subscribe((res: any) => console.log(JSON.stringify(res)));
  // }
  
  // GetChambreByCode = (code:String ): Observable<Chambre[]> =>{
    
  //   return this.httpClient.get<Chambre[]>(API_URL + '/chambre/getbycodagence/' + code);
  // }
 
}
