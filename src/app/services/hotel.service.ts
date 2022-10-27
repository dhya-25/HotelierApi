import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Hotel } from '../Model/Hotel';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { FormGroup } from '@angular/forms';
const API_URL =environment.urlServer;



@Injectable({
  providedIn: 'root'
})
export class HotelService {
  host =API_URL;
  public dataForm:  FormGroup; 
  public dataaForm:  FormGroup; 
  hostt :string = "http://127.0.0.1:8053";

  private header : HttpHeaders ;
  constructor(private httpClient :HttpClient) { 
    this.header = new HttpHeaders();

  }

  GetHotels = (): Observable<Hotel[]> =>{
    
    return this.httpClient.get<Hotel[]>(API_URL + '/hotel/get');
  }

  GetHotelById = (idH : number): Observable<Hotel[]> =>{
    
    return this.httpClient.get<Hotel[]>(API_URL + '/hotel/getbyid' + idH);
  }

  public AddHotel(hotel: Hotel){
 
    
    return this.httpClient.post<any>(API_URL + '/hotel/editproduit',hotel)
  }

createData(formData: FormData): Observable<any> {
  return this.httpClient.post(API_URL + '/hotel/articles', formData);
}
deleteHotel(id:number){
  return this.httpClient.delete<any>(API_URL + '/hotel/'+ id)
}

putHotel(data:Hotel):Observable<any>{
  return this.httpClient.put<Hotel>(API_URL +'/hotel/update',data);
}
uploadFile(file: File): Observable<HttpEvent<{}>> {
  const formdata: FormData = new FormData();
  formdata.append('file', file);
  const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
  });

  return this.httpClient.request(req);
 }

}
