import { Utilisateur } from "@/Model/Utilisateur";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AjoutUserComponent } from "@pages/ajout-user/ajout-user.component";
import { UtilisateurService } from "@services/utilisateur.service";

@Component({
    selector: 'app-ytil',
    templateUrl: './ytil.component.html',
    styleUrls: ['./ytil.component.scss']
  })
  export class YtilComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'progress', 'fruit','etat','chef','action'];
    dataSource: MatTableDataSource<any>;
    numFact!:any
    commentaire!:any
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    filterTerm!: string;
    util : Utilisateur[] = [];
    u : Utilisateur = new Utilisateur ();
    constructor(private utilService : UtilisateurService,private dialog : MatDialog) { }
  
    ngOnInit(): void {
      this.getAllUser();
    }
  
  
    openDialog() {
      this.dialog.open(AjoutUserComponent, {
   width : '60%'
      }).afterClosed().subscribe(val=>{
        if(val==='save'){
          this.getAllUser();
        }
      });
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    
     
    }
    getAllUser() {
      
      this.utilService.GetUtilisateur().subscribe((data: Utilisateur[]) => {
        this.dataSource= new MatTableDataSource(data) ; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
        console.log(data);
        
      }, error => {
        console.log(error);
      });
    }
  }
  