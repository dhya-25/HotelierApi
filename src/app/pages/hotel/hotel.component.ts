import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { Hotel } from '@/Model/Hotel';
import { HotelService } from '@services/hotel.service';
import { DialogComponent } from '@pages/dialog/dialog.component';
import { UtilisateurService } from '@services/utilisateur.service';
import { Utilisateur } from '@/Model/Utilisateur';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','a','chef'];

  // dataSource: MatTableDataSource<any>;
  numFact!:any
  commentaire!:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterTerm!: string;
u:Utilisateur[]=[]
  hotel : Hotel[] = [];
  H : Hotel = new Hotel ();
  dataSource = new MatTableDataSource(this.hotel);
  constructor(public hotelService : HotelService,private util:UtilisateurService,
    private toastr: ToastrService,private dialog : MatDialog) { }
  ngOnInit(): void {
    this.getAllHotels();
    this.getAllUser()
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
 width : '60%'
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllHotels();
      }
    });
  }





  getAllHotels() {
    
    this.hotelService.GetHotels().subscribe((data: Hotel[]) => {
      this.dataSource= new MatTableDataSource(data) ; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
      console.log(data);
          
        }, error => {
          console.log(error);
        });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllUser() {
    
    this.util.GetUtilisateur().subscribe((data: Utilisateur[]) => {
      this.u = data;
      
     console.log(this.util); 
      
    }, error => {
      console.log(error);
    });
  }

  editHotel(row:any){
    this.dialog.open(DialogComponent,{
      width: '60%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllHotels();
      }
    });
  }

 /* applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/


  deleteHotel(id:any){
    
    this.hotelService.deleteHotel(id)
    .subscribe({next : (res)=>{
      if (res) {
        this.toastr.success('Hotel supprimé!', 'Suppression effectuée avec succés.');
        this.getAllHotels();
      } else {
        this.toastr.error('Echec de suppression!', 'Problème de suppression.');
      }   
      },
   
      
  })
  }
  /* this.administrateurservice.delteteadminByid(administrateur.id).subscribe(result => {
    if (result == null) {
      this.toastr.success('Administrateur supprimé!', 'Suppression effectuée avec succés.');
      this.getAdminByAll();
    } else {
      this.toastr.error('Echec de suppression!', 'Problème de suppression.');
    }
  }); */

  
}
