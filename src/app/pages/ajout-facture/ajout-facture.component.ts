import { Facture } from '@/Model/Facture';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '@pages/dialog/dialog.component';
import { FactureService } from '@services/facture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-facture',
  templateUrl: './ajout-facture.component.html',
  styleUrls: ['./ajout-facture.component.scss']
})
export class AjoutFactureComponent implements OnInit {
  actionBtn : string = "Save";
  nomDial : string = "Ajout Contart Agence";
facture :Facture[]=[]

factForm = new FormGroup({
  numFactInd : new FormControl(),
  dateArr : new FormControl(),
  dateDep : new FormControl(),
  commentaire : new FormControl(),
  mntHtax : new FormControl(),
  mntHtva : new FormControl(),
  mnttva : new FormControl(),
  
  mntFdcst : new FormControl(),
  promotion:new FormControl(),
  tbreFiscal : new FormControl(),
  mntTtc : new FormControl(),
  mntTtlettre : new FormControl(),
  nbrGratuit : new FormControl(),
  typePaiment : new FormControl(),
  dateFacture : new FormControl(),
  nomClient : new FormControl(),
  typeFacture : new FormControl(),
  codAgence : new FormControl(),
  codHotel :new FormControl(),
  codResid : new FormControl(),
  

  
});

  constructor(private formBuilder : FormBuilder,private favtureService : FactureService
    ,private factureService :FactureService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent> ,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.factForm = this.formBuilder.group({

      numFactInd : ['',Validators.required],
      dateArr : ['',Validators.required],
      dateDep : ['',Validators.required],
      commentaire : [''],
      mntHtax : [''],
      promotion:[''],
      mntHtva : ['',Validators.required],
      mnttva : ['',Validators.required],
      mntFdcst : ['',Validators.required],
      tbreFiscal : ['',Validators.required],
      mntTtc : ['',Validators.required],
      mntTtlettre :['',Validators.required],
      nbrGratuit : [''],
      typePaiment : ['',Validators.required],
      dateFacture : ['',Validators.required],
      nomClient :['',Validators.required],
      typeFacture : [''],
      codAgence : [''],
      codResid : [''],
      codHotel:['',Validators.required],
     })
  }

  addFacture(){

    if(this.factForm.valid){
    
      this.factureService.AddFacture(this.factForm.value)
       .subscribe({
         next:(res)=>{
          if (res) {
            this.toastr.success('Type Chambre added!', 'Ajout effectuée avec succés.');
          } else {
            this.toastr.error('Echec ajout', 'Problème de suppression.');
          }                     this.factForm.reset();
           this.dialogRef.close();
   

         },
         error:()=>{
           alert("Error while adding Facture")
         }
       })
    }

   console.log(this.factForm.value)
}

}
