import { Resident } from '@/Model/Resident';
import {Component} from '@angular/core';
import { ChambreService } from '@services/chambre.service';
import { ResidentService } from '@services/resident.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    totalResid:number;
    totalChambre:number;

    dateToday:String;
    today = new Date();

    constructor(private residentService : ResidentService,private chambreService:ChambreService) { 
        setInterval(() =>{
            const currentDate = new Date();
            this.dateToday = currentDate.toLocaleTimeString();
             }, 1000);
    }



      ngOnInit(): void {
        this.residentService.GetResident().subscribe((data:Resident[])=>{
            this.totalResid=data.length;
          })
          this.residentService.GetResident().subscribe((data:Resident[])=>{
            this.totalChambre=data.length;
          })
      }
}