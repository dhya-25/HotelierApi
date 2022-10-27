import { ContratAgence } from '@/Model/ContratAgence';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '@pages/dialog/dialog.component';
import { ContartAgenceService } from '@services/contart-agence.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-contrat-agence',
  templateUrl: './ajout-contrat-agence.component.html',
  styleUrls: ['./ajout-contrat-agence.component.scss']
})
export class AjoutContratAgenceComponent implements OnInit {
  actionBtn : string = "Save";
  nomDial : string = "Ajout Contart Agence";
  conList : ContratAgence[]=[];

contratAgence : ContratAgence = new ContratAgence();
  contartAgenceForm!: FormGroup;

  constructor(private formBuilder : FormBuilder,private contratAgenceService : ContartAgenceService,
    @Inject(MAT_DIALOG_DATA) public editData : any,private dialogRef : MatDialogRef<DialogComponent>
    ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contartAgenceForm = this.formBuilder.group({
      idContartAgence : new FormControl({value: '', disabled: true},Validators.required),

      dateContrat : ['',Validators.required],
      cpdePeriode: ['',Validators.required],
      codeTarif : ['',Validators.required],
      codeReduction : ['',Validators.required],
      codeSupplement: ['',Validators.required],
      prixReduction: ['',Validators.required],
      prixArragement: ['',Validators.required],
      valeurSupp: ['',Validators.required],
     
      
    });

    if (this.editData){
      this.actionBtn = "Update";
      this.nomDial = "Update Contart Agence";

       this.contartAgenceForm.controls['idContartAgence'].setValue(this.editData.idContartAgence);

      this.contartAgenceForm.controls['dateContrat'].setValue(this.editData.dateContrat);
    
      this.contartAgenceForm.controls['cpdePeriode'].setValue(this.editData.cpdePeriode);
      this.contartAgenceForm.controls['codeTarif'].setValue(this.editData.codeTarif);
      this.contartAgenceForm.controls['codeReduction'].setValue(this.editData.codeReduction);
      this.contartAgenceForm.controls['codeSupplement'].setValue(this.editData.codeSupplement);
      this.contartAgenceForm.controls['prixReduction'].setValue(this.editData.prixReduction);
      this.contartAgenceForm.controls['prixArragement'].setValue(this.editData.prixArragement);
      this.contartAgenceForm.controls['valeurSupp'].setValue(this.editData.valeurSupp);

      
     
    }
    this.getAllContract()
  }
  getAllContract() {
    
    this.contratAgenceService.GetContratAgence().subscribe((data: ContratAgence[]) => {
      this.conList = data;
     
     console.log(this.conList); 
      
    }, error => {
      console.log(error);
    });
  
  }
  addContratAgence(){

    if (!this.editData){
      if(this.contartAgenceForm.valid){
      
        this.contratAgenceService.AddContratAgence(this.contartAgenceForm.value)
         .subscribe({
           next:(res)=>{
            if (res) {
              this.toastr.success('Contrat agence added!', 'Ajout effectuée avec succés.');
              this.contartAgenceForm.reset();
              this.dialogRef.close('save');
             // this.getAllContract()
            } else {
              this.toastr.error('Echec ajout', 'Problème de suppression.');
            }            
            
     

           },
           error:()=>{
             alert("Error while adding Hotel")
           }
         })
      }
    }

else{
 this.updateContratAgence();
}
     console.log(this.contartAgenceForm.value)
 }

 updateContratAgence(){
   
   this.contratAgenceService.putContratAgence(this.contartAgenceForm.value)

    .subscribe({
      next:(res)=>{
        
        if (res) {
          this.toastr.success('Contrat updated!', 'update effectuée avec succés.');
          this.contartAgenceForm.reset();
          this.dialogRef.close('update');
        } else {
          this.toastr.error('Echec update', 'Problème de suppression.');
        }         
      },

     

    })

}
}
