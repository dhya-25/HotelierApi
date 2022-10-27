import { TypeChambre } from '@/Model/TypeChambre';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AjoutTypeChambreComponent } from '@pages/ajout-type-chambre/ajout-type-chambre.component';
import { TypeChambreService } from '@services/type-chambre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-chambre',
  templateUrl: './type-chambre.component.html',
  styleUrls: ['./type-chambre.component.scss']
})
export class TypeChambreComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','chef'];
  dataSource: MatTableDataSource<any>;
  numFact!:any
  commentaire!:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterTerm!: string;
typeChambre : TypeChambre = new TypeChambre();
TCH :TypeChambre[] = [];
  constructor(private typeChService : TypeChambreService,private dialog : MatDialog,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllType();
  }
  getAllType() {
    
    this.typeChService.GetTypeChambre().subscribe((data: TypeChambre[]) => {
      
  this.dataSource= new MatTableDataSource(data) ; 
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;  
  console.log(data);
      
    }, error => {
      console.log(error);
    });
  }

  openAjoutAgence() {
    this.dialog.open(AjoutTypeChambreComponent, {
 width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllType();
      }
    });
  }

  editAgence(row:any){
    this.dialog.open(AjoutTypeChambreComponent,{
      width: '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllType();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
   
  }

  deleteTypeCh(id:number){
    
    this.typeChService.deleteTypeChambre(id)
    .subscribe(res=>{
      if (res) {
        this.toastr.success('Type supprimé!', 'Suppression effectuée avec succés.');
        this.getAllType();
      } else {
        this.toastr.error('Echec de suppression!', 'Problème de suppression.');
      }   
      },
   
      
    )
  }

}
