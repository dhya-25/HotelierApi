import { Utilisateur } from '@/Model/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjoutUserComponent } from '@pages/ajout-user/ajout-user.component';
import { UtilisateurService } from '@services/utilisateur.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  util : Utilisateur[] = [];
  u : Utilisateur = new Utilisateur ();
  constructor(private utilService : UtilisateurService,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.getAllUser();
  }


  openDialog() {
    this.dialog.open(AjoutUserComponent, {
 width : '80%'
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllUser();
      }
    });
  }

  getAllUser() {
    
    this.utilService.GetUtilisateur().subscribe((data: Utilisateur[]) => {
      this.util = data;
      
     console.log(this.util); 
      
    }, error => {
      console.log(error);
    });
  }
}
