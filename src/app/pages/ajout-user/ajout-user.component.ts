import { Role } from '@/Model/Role';
import { Utilisateur } from '@/Model/Utilisateur';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '@services/role.service';
import { UtilisateurService } from '@services/utilisateur.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.scss']
})
export class AjoutUserComponent implements OnInit {
  actionBtn : string = "Save";
  nomDial : string = "Ajout Contart Agence";
facture :Utilisateur[]=[]
utilForm!: FormGroup;
role : Role[]=[];
ng= new FormControl('');
  constructor(private formBuilder : FormBuilder,
    private roleService:RoleService,private utilService : UtilisateurService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.utilForm = this.formBuilder.group({

  username : ['',Validators.required],
  password: ['',Validators.required],
  matPers : ['',Validators.required],
  dureeAcc : ['',Validators.required],
  adresse : ['',Validators.required],

  tel : ['',Validators.required],

  cin: ['',Validators.required],
  dateDeb : ['',Validators.required],
  ref : ['',Validators.required],
  role : this.formBuilder.array([
  this.ng


  ])
    })
    this.getAllRole()
  }

  getAllRole() {
    
    this.roleService.GetRole().subscribe((data: Role[]) => {
      this.role = data;
      
     /*  console.log(this.produit); */
      
    }, error => {
      console.log(error);
    });
  }

  addRole(): FormGroup{
    return this.formBuilder.group({
      id : ['',Validators.required]
    })
  }

  addUtilisateur(){

    if(this.utilForm.valid){
    
      this.utilService.AddTypeChambre(this.utilForm.value)
       .subscribe({
         next:(res)=>{
          if (res) {
            this.toastr.success('User added!', 'Ajout effectuée avec succés.');
            this.getAllRole();
          } else {
            this.toastr.error('Echec ajout', 'Problème de suppression.');
          }   
   

         },
 
       })
    }

   console.log(this.utilForm.value)
}

}
// this.utilForm = this.formBuilder.group({

//   id : ['',Validators.required],

//   username : ['',Validators.required],
//   password: ['',Validators.required],
//   matPers : ['',Validators.required],
//   dureeAcc : ['',Validators.required],
//   adresse : ['',Validators.required],

//   tel : ['',Validators.required],

//   cin: ['',Validators.required],
//   dateDeb : ['',Validators.required],
//   ref : ['',Validators.required],
//   role : this.formBuilder.array([
//   id:  ['',Validators.required],

//   ])
