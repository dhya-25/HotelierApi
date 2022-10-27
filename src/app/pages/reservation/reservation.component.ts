import { Arrangement } from '@/Model/Arrangement';
import { Chambre } from '@/Model/chambre';
import { TypeChambre } from '@/Model/TypeChambre';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ArrangementService } from '@services/arrangement.service';
import { ChambreService } from '@services/chambre.service';
import { ResidentService } from '@services/resident.service';
import { TypeChambreService } from '@services/type-chambre.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ReservationService } from '@services/reservation.service';
import { Reservation } from '@/Model/Reservation';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','chef','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
filterTerm!: string;




chambre : Chambre[]=[];




  constructor(private chambreService : ChambreService,private resService : ReservationService
    ,private toastr: ToastrService) { }

  ngOnInit(): void {
    

this.getAllChambre();
  }






getAllChambre() {
    
  this.resService.GetRes().subscribe((data: Reservation[]) => {
    
this.dataSource= new MatTableDataSource(data) ; 
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;  
console.log(data);
    
  }, error => {
    console.log(error);
  });
}

deleteTypeCh(id:number){
    
  this.resService.deleteRes(id)
  .subscribe(res=>{
    if (res) {
      this.toastr.success('Type supprimé!', 'Suppression effectuée avec succés.');
      this.getAllChambre();
    } else {
      this.toastr.error('Echec de suppression!', 'Problème de suppression.');
    }   
    },
 
    
  )
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}




// getChambreByCode() {
    
//   this.chambreService.GetChambreByCode(this.ch.codAgence).subscribe((data: Chambre[]) => {
    
//     this.chambre = data;
//     console.log(data);
    
//   }, error => {
//     console.log(error);
//   });
// }

}
