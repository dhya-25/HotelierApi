import { Agence } from '@/Model/Agence';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgenceService } from '@services/agence.service';
import { ToastrService } from 'ngx-toastr';

import { AjoutAgenceComponent } from '../ajout-agence/ajout-agence.component';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss']
})
export class AgenceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','chef','action'];

agence : Agence[]= [];
  constructor(private agenceService : AgenceService,private dialog : MatDialog,  private toastr: ToastrService) { }
  dataSource: MatTableDataSource<any>;
  numFact!:any
  commentaire!:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterTerm!: string;
  ngOnInit(): void {

this.getAllHotels();


  }
  getAllHotels() {
    
    this.agenceService.GetAgence().subscribe((data: Agence[]) => {
      
      this.dataSource= new MatTableDataSource(data) ; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
      
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
   
  }
  openAjoutAgence() {
    this.dialog.open(AjoutAgenceComponent, {
 width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllHotels();
      }
    });
  }

  editAgence(row:any){
    this.dialog.open(AjoutAgenceComponent,{
      width: '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllHotels();
      }
    });
  }


  deleteAgence(id:any){
    debugger
    this.agenceService.deleteAgence(id)
    .subscribe(res=>{
      debugger
      if (res) {
        this.toastr.success('Agence supprimé!', 'Suppression effectuée avec succés.');
        this.getAllHotels();
      } else {
        this.toastr.error('Echec de suppression!', 'Problème de suppression.');
      }   
      },
   
      
    )
  }


}
