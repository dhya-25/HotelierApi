import { Prestation } from '@/Model/Prestation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }

  GetPrestation = (): Observable<Prestation[]> =>{
    
    return this.httpClient.get<Prestation[]>(API_URL + '/prestation/get');
  }
}
