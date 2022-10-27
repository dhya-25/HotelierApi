import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Arrangement } from '../Model/Arrangement';
const API_URL =environment.urlServer;
@Injectable({
  providedIn: 'root'
})
export class ArrangementService {
  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }


  public AddArrangement(arrangement: Arrangement){
 
    
    return this.httpClient.post<any>(API_URL + '/arrangement/add',arrangement)
  }
 
  GetArrangements = (): Observable<Arrangement[]> =>{
    
    return this.httpClient.get<Arrangement[]>(API_URL + '/arrangement/get');
  }
}
