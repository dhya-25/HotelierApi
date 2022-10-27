import { Role } from '@/Model/Role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();
  }

  GetRole = (): Observable<Role[]> =>{
    
    return this.httpClient.get<Role[]>(API_URL + '/role/get');
  }
}
