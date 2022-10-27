import { Facture } from '@/Model/Facture';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AjoutFactureComponent } from '@pages/ajout-facture/ajout-facture.component';
import { GenereFactureComponent } from '@pages/genere-facture/genere-facture.component';
import { FactureService } from '@services/facture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','chef'];

facture : Facture[]= [];
fact : Facture= new Facture();
dataSource: MatTableDataSource<any>;
numFact!:any
commentaire!:any
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
filterTerm!: string;
factureForm !:FormGroup
searchTerm:any;
selectedObject:Facture;

  constructor(private factureService : FactureService,
    private formBuilder : FormBuilder,private dialog : MatDialog,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.factureForm = this.formBuilder.group({
    //  idFacture : ['',Validators.required],

      numFactInd : ['',Validators.required],
      promotion: ['',Validators.required],
      typeFacture : ['',Validators.required],
      commentaire : ['',Validators.required],
      
      
    });
    this.getAllFacture()
    this.getFacture()

  //  this.getChambreByCode()
  }
  printerReportt(){

    try {
      if(this.selectedObject===null){
        this.toastr.warning("Selectionner un client svp!","alert")
      }else{
        this.factureService.getReportFacture('facture',this.fact.numFactInd)
        .subscribe(data=>{
          let file = new Blob([data], { type: 'application/pdf' });            
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        });
      }

    } catch (error) {
      console.log(error)
    }
  }
  openAjoutEtat() {
    this.dialog.open(AjoutFactureComponent, {
 width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllFacture();
      }
    });
  }
  openImprimer() {
    this.dialog.open(GenereFactureComponent, {
 width : '40%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllFacture();
      }
    });
  }
  getAllFacture() {
    
    this.factureService.GetFacture().subscribe((data: Facture[]) => {
      
  this.dataSource= new MatTableDataSource(data) ; 
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;  
  this.facture = data;
  console.log(data);
      
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
   
  }
  // printerReport(){
   
  //   try {
  //       debugger
  //       this.factureService.getReportFacture('facture2',this.fact.numFactInd)
  //       .subscribe((data)=>{
  //         console.log(data)
  //         let file = new Blob([data], { type: 'application/pdf' });            
  //         var fileURL = URL.createObjectURL(file);
  //         window.open(fileURL);
  //       });
      

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  getFacture() {
    
    this.factureService.GetFacture().subscribe((data: Facture[]) => {
      this.facture=data

  console.log(data);
      
    }, error => {
      console.log(error);
    });
  }
  deleteFacture(id:any){
    
    this.factureService.deleteEtatChambre(id)
    .subscribe(res=>{
      if (res) {
        this.toastr.success('Facture supprimé!', 'Suppression effectuée avec succés.');
        this.getAllFacture();
      } else {
        this.toastr.error('Echec de suppression!', 'Problème de suppression.');
      }   
      },
   
      
    )
  }

//   getChambreByCode() {
    
//   this.factureService.GetFactureById(1).subscribe((data: Facture[]) => {
    
//     this.facture = data;
//     console.log(data);
    
//   }, error => {
//     console.log(error);
//   });
// }


}
