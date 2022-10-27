import { Reservation } from '@/Model/Reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL =environment.urlServer;

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  host =API_URL;

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();
  }
  public AddReservation(reservation: Reservation){
 
    
    return this.httpClient.post<Reservation>(API_URL + '/reservation/add',reservation)
  }
  GetRes = (): Observable<Reservation[]> =>{
    
    return this.httpClient.get<Reservation[]>(API_URL + '/reservation/get');
  }

  deleteRes(id:number){
    return this.httpClient.delete<any>(API_URL + '/reservation/'+ id)
  }
}
