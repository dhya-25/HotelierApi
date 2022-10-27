import { ContratAgence } from '@/Model/ContratAgence';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AjoutContratAgenceComponent } from '@pages/ajout-contrat-agence/ajout-contrat-agence.component';
import { ContartAgenceService } from '@services/contart-agence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contrat-agence',
  templateUrl: './contrat-agence.component.html',
  styleUrls: ['./contrat-agence.component.scss']
})
export class ContratAgenceComponent implements OnInit {
contratAgence : ContratAgence[]=[];
displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','action'];
    dataSource: MatTableDataSource<any>;
    numFact!:any
    commentaire!:any
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filterTerm!: string;
  constructor(private ContratAgenceService : ContartAgenceService,private dialog : MatDialog
    ,private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllContratAgence()
  }
  openDialog() {
    this.dialog.open(AjoutContratAgenceComponent, {
 width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllContratAgence();
      }
    });
  }
  editHotel(row:any){
    this.dialog.open(AjoutContratAgenceComponent,{
      width: '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllContratAgence();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
   
  }
  getAllContratAgence() {
    
    this.ContratAgenceService.GetContratAgence().subscribe((data: ContratAgence[]) => {
      this.dataSource= new MatTableDataSource(data) ; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
        console.log(data);
      
     /*  console.log(this.produit); */
      
    }, error => {
      console.log(error);
    });
  }
  deleteHotel(id:number){
    debugger
    this.ContratAgenceService.deleteContratAgence(id)
    .subscribe(res=>{
      if (res) {
        this.toastr.success('Etat supprimé!', 'Suppression effectuée avec succés.');
        this.getAllContratAgence();
      } else {
        this.toastr.error('Echec de suppression!', 'Problème de suppression.');
      }   
      },
   
      
    )
  }

}
