import { EtatChambre } from '@/Model/EtatChambre';
import { TypeChambre } from '@/Model/TypeChambre';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '@pages/dialog/dialog.component';
import { EtatChambreService } from '@services/etat-chambre.service';
import { TypeChambreService } from '@services/type-chambre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-etat-chambre',
  templateUrl: './ajout-etat-chambre.component.html',
  styleUrls: ['./ajout-etat-chambre.component.scss']
})
export class AjoutEtatChambreComponent implements OnInit {
  actionBtn : string = "Save";
  type : TypeChambre[]=[]
  nomDial : string = "Ajout Etat Chambre";
  contratAgence : EtatChambre = new EtatChambre();
  etatChambreForm!: FormGroup;
  constructor(private formBuilder : FormBuilder,private etatChambreService : EtatChambreService,
    @Inject(MAT_DIALOG_DATA) public editData : any,private dialogRef : MatDialogRef<DialogComponent>
    ,private typeService :TypeChambreService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.etatChambreForm = this.formBuilder.group({
      idEtatChambre : [''],

      etatChambre : ['',Validators.required],
      codCateg: ['',Validators.required],
      numChambre : ['',Validators.required],
      codHotel : ['',Validators.required],
      TypeChambre: this.formBuilder.group ({
        idType : ['',Validators.required],
  
       }),
      
    });

    if (this.editData){
      this.actionBtn = "Update";
      this.nomDial = "Update Etat chambre";

       this.etatChambreForm.controls['idEtatChambre'].setValue(this.editData.idEtatChambre);

      this.etatChambreForm.controls['etatChambre'].setValue(this.editData.etatChambre);
    
      this.etatChambreForm.controls['codCateg'].setValue(this.editData.codCateg);
      this.etatChambreForm.controls['numChambre'].setValue(this.editData.numChambre);
      this.etatChambreForm.controls['codHotel'].setValue(this.editData.codHotel);
      
 
     
    }
    this.getAllTypeChambre()
  }

  addEtat(){

    if (!this.editData){
      if(this.etatChambreForm.valid){
      
        this.etatChambreService.AddEtatChambre(this.etatChambreForm.value)
         .subscribe({
           next:(res)=>{
            if (res) {
              this.toastr.success('Etat added!', 'Ajout effectuée avec succés.');
              this.etatChambreForm.reset();
              this.dialogRef.close('save');
              this.getAllTypeChambre();

             
            } else {
              this.toastr.error('Echec ajout', 'Problème de suppression.');
            }               

     

           },
           error:()=>{
             alert("Error while adding Etat")
           }
         })
      }
    }

else{
 this.updateContratAgence();
}
     console.log(this.etatChambreForm.value)
 }

 updateContratAgence(){
   
   this.etatChambreService.putEtatChambre(this.etatChambreForm.value)

    .subscribe({
      next:(res)=>{
        if (res) {
          this.toastr.success('Etat updated!', 'update effectuée avec succés.');
          this.etatChambreForm.reset();
          this.dialogRef.close('update');
        } else {
          this.toastr.error('Echec update', 'Problème de suppression.');
        }  
      
      },

     

    })

}
getAllTypeChambre() {
    
  this.typeService.GetTypeChambre().subscribe((data: TypeChambre[]) => {
    this.type = data;
   
   /*  console.log(this.produit); */
    
  }, error => {
    console.log(error);
  });

}
}
