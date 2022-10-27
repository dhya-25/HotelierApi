import { TypeChambre } from '@/Model/TypeChambre';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class TypeChambreService {
  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();
  }

  public AddTypeChambre(typeChambre: TypeChambre){
 
    
    return this.httpClient.post<TypeChambre>(API_URL + '/typeChambre/add',typeChambre)
  }
  GetTypeChambre = (): Observable<TypeChambre[]> =>{
    
    return this.httpClient.get<TypeChambre[]>(API_URL + '/typeChambre/get');
  }
  deleteTypeChambre(id:number){
    return this.httpClient.delete<TypeChambre>(API_URL + '/typeChambre/'+ id)
  }
  putTypeChambre(data:TypeChambre):Observable<any>{
    return this.httpClient.put<TypeChambre>(API_URL +'/typeChambre/update',data);
  }
}
