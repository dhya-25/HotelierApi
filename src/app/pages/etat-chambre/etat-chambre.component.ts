import { EtatChambre } from '@/Model/EtatChambre';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AjoutEtatChambreComponent } from '@pages/ajout-etat-chambre/ajout-etat-chambre.component';
import { EtatChambreService } from '@services/etat-chambre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-etat-chambre',
  templateUrl: './etat-chambre.component.html',
  styleUrls: ['./etat-chambre.component.scss']
})
export class EtatChambreComponent implements OnInit {
etatChambre : EtatChambre[]=[];
displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','action'];
    dataSource: MatTableDataSource<any>;
    numFact!:any
    commentaire!:any
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filterTerm!: string;
  constructor(private etaChambreService : EtatChambreService,private dialog : MatDialog,   
     private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllEtat();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
   
  }
  getAllEtat() {
    
    this.etaChambreService.GetEtatChambre().subscribe((data: EtatChambre[]) => {
      
      this.dataSource= new MatTableDataSource(data) ; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
      console.log(data);
      
    }, error => {
      console.log(error);
    });
  }

  openAjoutEtat() {
    this.dialog.open(AjoutEtatChambreComponent, {
 width : '50%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllEtat();
      }
    });
  }

  editEtat(row:any){
    this.dialog.open(AjoutEtatChambreComponent,{
      width: '50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllEtat();
      }
    });
  }


  deleteAgence(id:any){
    
    this.etaChambreService.deleteEtatChambre(id)
    .subscribe(res=>{
      if (res) {
        this.toastr.success('Etat supprimé!', 'Suppression effectuée avec succés.');
        this.getAllEtat();
      } else {
        this.toastr.error('Echec de suppression!', 'Problème de suppression.');
      }   
      },
   
      
    )
  }

}
