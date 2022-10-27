import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { TypeChambreService } from '@services/type-chambre.service';
import { TypeChambre } from '@/Model/TypeChambre';
import { ChambreService } from '@services/chambre.service';
import { Chambre } from '@/Model/chambre';
import { ToastrService } from 'ngx-toastr';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ajout-type-chambre',
  templateUrl: './ajout-type-chambre.component.html',
  styleUrls: ['./ajout-type-chambre.component.scss']
})
export class AjoutTypeChambreComponent implements OnInit {

  actionBtn : string = "Save";
  nomDial : string = "Ajout Type Chambre";

  agence : TypeChambre = new TypeChambre();
  chambre:Chambre[]=[]
    typeChForm!: FormGroup;
  selectedValue: string;
  constructor(private formBuilder : FormBuilder,private typeChambre : TypeChambreService,
    private chambreService:ChambreService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.typeChForm = this.formBuilder.group({
      idType : [''],

      code_categ : ['',Validators.required],
      commentaire: ['',Validators.required],
      distance: ['',Validators.required],
      television : ['',Validators.required],
      telephone : ['',Validators.required],
      climant: ['',Validators.required],
      miniBar: ['',Validators.required],
      coffren: ['',Validators.required],
      douchBain: ['',Validators.required],
      grandLit: ['',Validators.required],
      communic: ['',Validators.required],
      balcon: ['',Validators.required],
      vue: ['',Validators.required],
      salon: ['',Validators.required],
      soleil: ['',Validators.required],
      nbLits: ['',Validators.required],
      codClasse1: ['',Validators.required],
      codClasse2: ['',Validators.required],
      communiquante: ['',Validators.required],
      ordre :['',Validators.required],
      tel: ['',Validators.required],
      codType: ['',Validators.required],
      codAlie: ['',Validators.required],
      cod_hotel: ['',Validators.required],
      chambre: this.formBuilder.group ({
        idChambre : ['',Validators.required],
  
       }),


      
    });

    if (this.editData){
      this.actionBtn = "Update";
      this.nomDial = "Update Contart Agence";

       this.typeChForm.controls['idType'].setValue(this.editData.idType);

      this.typeChForm.controls['commentaire'].setValue(this.editData.commentaire);
    
      this.typeChForm.controls['television'].setValue(this.editData.television);
      this.typeChForm.controls['telephone'].setValue(this.editData.telephone);
      this.typeChForm.controls['climant'].setValue(this.editData.climant);
      this.typeChForm.controls['miniBar'].setValue(this.editData.miniBar);
      this.typeChForm.controls['coffren'].setValue(this.editData.coffren);
      this.typeChForm.controls['douchBain'].setValue(this.editData.douchBain);
      this.typeChForm.controls['grandLit'].setValue(this.editData.grandLit);
      
      this.typeChForm.controls['communic'].setValue(this.editData.communic);
      this.typeChForm.controls['distance'].setValue(this.editData.distance);
      this.typeChForm.controls['balcon'].setValue(this.editData.balcon);
      this.typeChForm.controls['vue'].setValue(this.editData.vue);
      this.typeChForm.controls['salon'].setValue(this.editData.salon);
      this.typeChForm.controls['soleil'].setValue(this.editData.soleil);
      this.typeChForm.controls['nbLits'].setValue(this.editData.nbLits);

      this.typeChForm.controls['codClasse1'].setValue(this.editData.codClasse1);
      this.typeChForm.controls['codClasse2'].setValue(this.editData.codClasse2);
      this.typeChForm.controls['communiquante'].setValue(this.editData.communiquante);
      this.typeChForm.controls['tel'].setValue(this.editData.tel);
      this.typeChForm.controls['codType'].setValue(this.editData.codType);
      this.typeChForm.controls['codAlie'].setValue(this.editData.codAlie);
      this.typeChForm.controls['ordre'].setValue(this.editData.ordre);
      this.typeChForm.controls['cod_hotel'].setValue(this.editData.cod_hotel);

     
    }
    this.getAllChambre()

  }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  getAllChambre() {
    
    this.chambreService.GetChambre().subscribe((data: Chambre[]) => {
      this.chambre = data;
     
     /*  console.log(this.produit); */
      
    }, error => {
      console.log(error);
    });
  
  }

  addTypeChambre(){
    if (!this.editData){


      if(this.typeChForm.valid){
        
        this.typeChambre.AddTypeChambre(this.typeChForm.value)
         .subscribe({
           next:(res)=>{
            if (res) {
              this.toastr.success('Type Chambre added!', 'Ajout effectuée avec succés.');
              this.typeChForm.reset();
              this.dialogRef.close('save');
            } else {
              this.toastr.error('Echec ajout', 'Problème de suppression.');
            }                this.typeChForm.reset();
             this.dialogRef.close();
           },
       
         })
      }
    }
    else{
      this.updateTypechambre();
    }
    
     console.log(this.typeChForm.value)
 }
 updateTypechambre(){
   
  this.typeChambre.putTypeChambre(this.typeChForm.value)

   .subscribe({
     next:(res)=>{
       
      if (res) {
        this.toastr.success('Type updated!', 'update effectuée avec succés.');
        this.typeChForm.reset();
        this.dialogRef.close('update');
      } else {
        this.toastr.error('Echec update', 'Problème de suppression.');
      } 

     },
 
    

   })

}

}
