import { Resident } from '@/Model/Resident';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }

  public AddRes(resident: any){
 
    
    return this.httpClient.post<any>(API_URL + '/resident/add',resident)
  }
  GetResident = (): Observable<Resident[]> =>{
    
    return this.httpClient.get<Resident[]>(API_URL + '/resident/get');
  }
  GetResidentByNat = (): Observable<Resident[]> =>{
    
    return this.httpClient.get<Resident[]>(API_URL + '/resident/getbynat');
  }
  getReportES(ReportName : any ) {
    const httpOptions = {
        //'responseType'  : 'arraybuffer' as 'json'
         'responseType'  : 'blob' as 'json'  
      };
    return this.httpClient.get<any>(API_URL +'/resident/report/'+ ReportName , httpOptions );
} 
}
