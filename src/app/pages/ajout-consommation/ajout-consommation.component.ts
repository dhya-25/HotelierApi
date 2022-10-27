import { Consommation } from '@/Model/Consommation';
import { Facture } from '@/Model/Facture';
import { Prestation } from '@/Model/Prestation';
import { Resident } from '@/Model/Resident';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '@pages/dialog/dialog.component';
import { ConsommationService } from '@services/consommation.service';
import { FactureService } from '@services/facture.service';
import { PrestationService } from '@services/prestation.service';
import { ResidentService } from '@services/resident.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajout-consommation',
  templateUrl: './ajout-consommation.component.html',
  styleUrls: ['./ajout-consommation.component.scss']
})
export class AjoutConsommationComponent implements OnInit {

  actionBtn : string = "Save";
  nomDial : string = "Ajout Contart Agence";
resident :Resident[]=[]
ConsommationForm!: FormGroup;

consoForm = new FormGroup({
  mntConso : new FormControl(),
  codCons : new FormControl(),
  codResid : new FormControl(),
  codPrestation : new FormControl(),
  codUser : new FormControl(),
  codHotel : new FormControl(),
  codAgence : new FormControl(),
  dateConso : new FormControl(),
  heureConso : new FormControl(),
  numBon : new FormControl(),
  typeConso : new FormControl(),
  dateSys : new FormControl(),
  offre : new FormControl(),
  typeClient : new FormControl(),
  numFactInd : new FormControl(),
  numFactDeb : new FormControl(),
  forfait : new FormControl(),
  codeDev : new FormControl(),
  tauxDev : new FormControl(),
  unite : new FormControl(),
  prestation: new FormGroup ({
    idPrestation : new FormControl(''),

   }),
   facture: new FormGroup ({
    idFacture : new FormControl(''),

   })

  
});

  prestations : Prestation[]=[];
  factures : Facture[]=[];

  conso : Consommation=new Consommation();
  constructor(private formBuilder : FormBuilder,private consommationService : ConsommationService,
    private prestationService : PrestationService,private factureService :FactureService,private residentService:ResidentService,
    @Inject(MAT_DIALOG_DATA) public editData : any, private toastr: ToastrService,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.ConsommationForm = this.formBuilder.group({

      mntConso : [''],

      codCons : [''],
      codResid: [''],
      codPrestation : [''],
      codUser : [''],
      codHotel : ['',Validators.required],

      codAgence : [''],
      dateConso: [''],
      heureConso : [''],
      numBon : [''],
      typeConso : [''],

      dateSys : [''],
      offre: [''],
      typeClient : [''],
      numFactInd : ['',Validators.required],
      numFactDeb : [''],

      forfait : [''],
      codeDev: [''],
      tauxDev : [''],
      unite : [''],
      prestation: this.formBuilder.group ({
      idPrestation : ['',Validators.required],

     }),
     facture: this.formBuilder.group ({
      idFacture : ['',Validators.required],

     }),
     resident: this.formBuilder.group ({
      id_Resident : ['',Validators.required],

     }),
      
    });

    if (this.editData){
      this.actionBtn = "Update";
      this.nomDial = "Update Consommation";

       this.ConsommationForm.controls['idConsommation'].setValue(this.editData.idConsommation);

      this.ConsommationForm.controls['mntConso'].setValue(this.editData.mntConso);
    
      this.ConsommationForm.controls['codCons'].setValue(this.editData.codCons);
      this.ConsommationForm.controls['codResid'].setValue(this.editData.codResid);
      this.ConsommationForm.controls['codPrestation'].setValue(this.editData.codPrestation);
      this.ConsommationForm.controls['codUser'].setValue(this.editData.codUser);
      this.ConsommationForm.controls['codHotel'].setValue(this.editData.codHotel);
      this.ConsommationForm.controls['codAgence'].setValue(this.editData.codAgence);
      this.ConsommationForm.controls['dateConso'].setValue(this.editData.dateConso);
      this.ConsommationForm.controls['heureConso'].setValue(this.editData.heureConso);
      this.ConsommationForm.controls['numBon'].setValue(this.editData.numBon);
      this.ConsommationForm.controls['typeConso'].setValue(this.editData.typeConso);
      this.ConsommationForm.controls['dateSys'].setValue(this.editData.dateSys);
      this.ConsommationForm.controls['offre'].setValue(this.editData.offre);
      this.ConsommationForm.controls['typeClient'].setValue(this.editData.typeClient);
      this.ConsommationForm.controls['numFactInd'].setValue(this.editData.numFactInd);
      this.ConsommationForm.controls['numFactDeb'].setValue(this.editData.numFactDeb);
      this.ConsommationForm.controls['forfait'].setValue(this.editData.forfait);
      this.ConsommationForm.controls['codeDev'].setValue(this.editData.codeDev);
      this.ConsommationForm.controls['tauxDev'].setValue(this.editData.tauxDev);
      this.ConsommationForm.controls['unite'].setValue(this.editData.unite);
      
     
    }
    this.getAllPrestation()
    this.getAllFacture() 
    this.getAllResident()
  }

  addConsommation(){

      if(this.consoForm.valid){
      
        this.consommationService.AddConsommation(this.consoForm.value)
         .subscribe({
           next:(res)=>{
            if (res) {
              this.toastr.success('Consommation added!', 'Ajout effectuée avec succés.');
              this.consoForm.reset();
              this.dialogRef.close('save');
              
            } else {
              this.toastr.error('Echec ajout', 'Problème de suppression.');
            }               
             this.dialogRef.close();
     

           },
           error:()=>{
             alert("Error while adding Etat")
           }
         })
      }
      else{
        this.updateContratAgence();
       }

     console.log(this.consoForm.value)
 }

 updateContratAgence(){
   
  this.consommationService.putContratAgence(this.ConsommationForm.value)

   .subscribe({
     next:(res)=>{
       
       if (res) {
         this.toastr.success('Contrat updated!', 'update effectuée avec succés.');
         this.ConsommationForm.reset();
         this.dialogRef.close('update');
       } else {
         this.toastr.error('Echec update', 'Problème de suppression.');
       }         
     },

    

   })

}
 getAllResident() {
    
  this.residentService.GetResident().subscribe((data: Resident[]) => {
    this.resident = data;
   
   /*  console.log(this.produit); */
    
  }, error => {
    console.log(error);
  });

}

 getAllPrestation() {
    
  this.prestationService.GetPrestation().subscribe((data: Prestation[]) => {
    this.prestations = data;
   
   /*  console.log(this.produit); */
    
  }, error => {
    console.log(error);
  });
  
}

getAllFacture() {
    
  this.factureService.GetFacture().subscribe((data: Facture[]) => {
    this.factures = data;
   
   /*  console.log(this.produit); */
    
  }, error => {
    console.log(error);
  });

}
}

