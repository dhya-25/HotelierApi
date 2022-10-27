import { Consommation } from '@/Model/Consommation';
import { Prestation } from '@/Model/Prestation';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AjoutConsommationComponent } from '@pages/ajout-consommation/ajout-consommation.component';
import { DialogComponent } from '@pages/dialog/dialog.component';
import { ConsommationService } from '@services/consommation.service';
import { PrestationService } from '@services/prestation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consommation',
  templateUrl: './consommation.component.html',
  styleUrls: ['./consommation.component.scss']
})
export class ConsommationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','action'];

  actionBtn : string = "Save";
  nomDial : string = "Ajout Contart Agence";
  etatChambreForm!: FormGroup;
  prestation : Prestation[]=[];
  consommation : Consommation[]=[];
  dataSource: MatTableDataSource<any>;
  numFact!:any
  commentaire!:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterTerm!: string;
  constructor(private consommationService : ConsommationService,private dialog : MatDialog,private toastr: ToastrService) { }

  ngOnInit(): void {
   this.getAllConsommation()
  }

  
openDialog() {
  this.dialog.open(AjoutConsommationComponent, {
width : '60%'
  }).afterClosed().subscribe(val=>{
    if(val==='save'){
      this.getAllConsommation();
    }
  });
}

editConso(row:any){
  this.dialog.open(AjoutConsommationComponent,{
    width: '60%',
    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllConsommation();
    }
  });
}
getAllConsommation() {
    
  this.consommationService.GetConsommation().subscribe((data: Consommation[]) => {
    this.dataSource= new MatTableDataSource(data) ; 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
    console.log(data);
  //  /*  console.log(this.produit); */
    
  }, error => {
    console.log(error);
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

 
}

deleteHotel(id:number){
  debugger
  this.consommationService.deleteConsommation(id)
  .subscribe(res=>{
    if (res) {
      this.toastr.success('Etat supprimé!', 'Suppression effectuée avec succés.');
      this.getAllConsommation();
    } else {
      this.toastr.error('Echec de suppression!', 'Problème de suppression.');
    }   
    },
 
    
  )
}
}
