import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Agence } from '@/Model/Agence';
import { AgenceService } from '@services/agence.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ajout-agence',
  templateUrl: './ajout-agence.component.html',
  styleUrls: ['./ajout-agence.component.scss']
})
export class AjoutAgenceComponent implements OnInit {
  actionBtn : string = "Save";
  nomDial : string = "Add Agence";

agence : Agence = new Agence();
  agenceForm!: FormGroup;
  
  constructor(private formBuilder : FormBuilder,private agenceService : AgenceService,
    @Inject(MAT_DIALOG_DATA) public editData : any,private dialogRef : MatDialogRef<DialogComponent>,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.agenceForm = this.formBuilder.group({
      idAgence : ['',Validators.required],

      nomAgence : ['',Validators.required],
      adrOne_Agence: ['',Validators.required],
      adrTwo_Agence : [''],
      adrTree_Agence : [''],
      faxAgence: [''],
      telAgence: ['',Validators.required],
      etatAgence: [''],
      representant: ['',Validators.required],
      domiAgence: [''],
      typeAgence: ['',Validators.required],
      siteWeb: ['',Validators.required],
      nomComercial: [''],
      paysAgence: ['',Validators.required],
      provinceAgence: ['',Validators.required],
      email: ['',Validators.required],
      codAgence: ['',Validators.required],

      
    });


    
if (this.editData){
  this.actionBtn = "Update";
  this.nomDial = "Update Agence";

  this.agenceForm.controls['idAgence'].setValue(this.editData.idAgence);

  this.agenceForm.controls['nomAgence'].setValue(this.editData.nomAgence);
  this.agenceForm.controls['adrOne_Agence'].setValue(this.editData.adrOne_Agence);
  this.agenceForm.controls['adrTwo_Agence'].setValue(this.editData.adrTwo_Agence);
  this.agenceForm.controls['adrTree_Agence'].setValue(this.editData.adrTree_Agence);
  this.agenceForm.controls['faxAgence'].setValue(this.editData.faxAgence);
  this.agenceForm.controls['telAgence'].setValue(this.editData.telAgence);
  this.agenceForm.controls['etatAgence'].setValue(this.editData.etatAgence);
  this.agenceForm.controls['representant'].setValue(this.editData.representant);
  this.agenceForm.controls['domiAgence'].setValue(this.editData.domiAgence);
  this.agenceForm.controls['typeAgence'].setValue(this.editData.typeAgence);
  this.agenceForm.controls['siteWeb'].setValue(this.editData.siteWeb);
  this.agenceForm.controls['nomComercial'].setValue(this.editData.nomComercial);
  this.agenceForm.controls['paysAgence'].setValue(this.editData.paysAgence);
  this.agenceForm.controls['provinceAgence'].setValue(this.editData.provinceAgence);
  this.agenceForm.controls['email'].setValue(this.editData.email);
  this.agenceForm.controls['codAgence'].setValue(this.editData.codAgence);
 
}

  }

  addAgence(){

    if (!this.editData){
      if(this.agenceForm.valid){
      
        this.agenceService.AddAgence(this.agenceForm.value)
         .subscribe({
           next:(res)=>{
            if (res) {
              this.toastr.success('Contrat added!', 'ajout effectuée avec succés.');
              this.agenceForm.reset();
              this.dialogRef.close('save');
            } else {
              this.toastr.error('Echec add', 'Problème de suppression.');
            }         

     

           },

         })
      }
    }

else{
 this.updateHotel();
}
     console.log(this.agenceForm.value)
 }

 updateHotel(){
   
   this.agenceService.putAgence(this.agenceForm.value)

    .subscribe({
      next:(res)=>{
        if (res) {
          if (res) {
            this.toastr.success(' agence updated!', 'update effectuée avec succés.');
            this.agenceForm.reset();
            this.dialogRef.close('update');
          } else {
            this.toastr.error('Echec update', 'Problème de suppression.');
          }      

                } 

      },

     

    })

}

}
