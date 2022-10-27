
import { Arrangement } from '@/Model/Arrangement';
import { Chambre } from '@/Model/chambre';
import { Facture } from '@/Model/Facture';
import { Resident } from '@/Model/Resident';
import { TypeChambre } from '@/Model/TypeChambre';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArrangementService } from '@services/arrangement.service';
import { ChambreService } from '@services/chambre.service';
import { FactureService } from '@services/facture.service';
import { ReservationService } from '@services/reservation.service';
import { ResidentService } from '@services/resident.service';
import { TypeChambreService } from '@services/type-chambre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.scss']
})
export class AffectationComponent implements OnInit {
step : any = 1;
filterTerm!: string;
arrangementForm !: FormGroup;
ChambreForm !: FormGroup;
ResidentForm !: FormGroup;
ReservationForm !: FormGroup;



TCH : TypeChambre[]=[];
arrang : Arrangement[]=[];
chambre : Chambre[]=[];

typeChambre : TypeChambre = new TypeChambre();
ch : Chambre = new Chambre();

selectedValue: string;
selectedValuee: string;
selectedValueee: string;
factures : Facture[]=[];
resident : Resident[]=[];
  constructor(private formBuilder : FormBuilder,private arrangementService : ArrangementService
    ,private typeChService : TypeChambreService ,private chambreService : ChambreService    ,private toastr: ToastrService

    ,private residentService : ResidentService,private reservationService : ReservationService,private factureService :FactureService) { }

  ngOnInit(): void {
    this.arrangementForm = this.formBuilder.group({
      codArrangement : ['',Validators.required],
      rangArrangement: [''],
      libArrangement : ['',Validators.required],
      premierService : [''],
      dernierService: [''],
      pdej: ['',Validators.required],
      dej: ['',Validators.required],
      din: ['',Validators.required],
      allInclusif: [''],
      resident: this.formBuilder.group ({
        id_Resident : ['',Validators.required],
  
       }),
      
    });
    this.ChambreForm = this.formBuilder.group({
     
      codeResaChambre : ['',Validators.required],
      codReas: [''],
      nbrAdulte : ['',Validators.required],
      nomResa : [''],
      arrangAdult: [''],
      arrangBebe: [''],
      nbrbebe: [''],
      dateArr: ['',Validators.required],
      dateDep: ['',Validators.required],
      num_chambre : ['',Validators.required],
      etatRes: ['',Validators.required],
      nbrAdult_a : [''],
      nbrEnfant_a : [''],
      nbrBebe_a: [''],
      commentaire: [''],
      heureArr: [''],
      heureDep: [''],
      remise: [''],
      motif : [''],
      prixUnitaire: ['',Validators.required],
      numFacture : ['',Validators.required],
      dateFacture : [''],
      offre: [''],
      mntRemise: [''],
      typeRemise: [''],
      libRemise: [''],
      dateRemise: [''],
      userRemise: [''],
      cod_categ: [''],
      cod_hotel: ['',Validators.required],
      codeVip: [''],
      facture: new FormGroup ({
        idFacture : new FormControl(''),
    
       }),
       resident: this.formBuilder.group ({
        id_Resident : ['',Validators.required],
  
       }),


    

    });
    this.ResidentForm = this.formBuilder.group({
     
      cod_nat : ['',Validators.required],
      nom_resid: ['',Validators.required],
      adr_res : ['',Validators.required],
      dat_naissance : ['',Validators.required],
      num_pass: ['',Validators.required],
      num_voucher: [''],
      profession: [''],
      sexe: ['',Validators.required],
      num_cin: ['',Validators.required],
      date_livr : [''],
      dern_serv: [''],
      date_arr : ['',Validators.required],
      date_dep : ['',Validators.required],
      plafond_cred: [''],
      adr2_res: [''],
      num_chambre: ['',Validators.required],
      nature: [''],
      nb_bebe: ['',Validators.required],
      cod_resid_p : [''],
      h_depart: [''],
      code_postal : [''],
      ville : ['',Validators.required],
      offre: [''],
      pays: [''],
      age: ['',Validators.required],
      mint_remise: [''],
      type_remise: [''],
      lib_remise: [''],
      type_client: [''],
      code_resident: ['',Validators.required],
      date_remise: [''],
     
    });

    this.ReservationForm = this.formBuilder.group({
     
      date_res : ['',Validators.required],
      commentairee: [''],
      date_arr : ['',Validators.required],
      date_dep : ['',Validators.required],
      heure_dep: [''],
      heure_arr: [''],
      aero_arr: [''],
      aero_dep: [''],
      vol_arr: [''],
      vol_dep : [''],
      etat_resa: [''],
      remise_resa : [''],
      type_resa : [''],
      chef_groupe: [''],
      cod_user_creation: [''],
      cod_user_modification: [''],
      date_crreation: [''],
      date_modification: [''],
      date_resa_agence : [''],
      groupe: [''],
     
    });
    this.getAllTypeChambre();
this.getAllArrangement();
this.getAllChambre();
this.getAllFacture();
this.getAllResident();
  }
  submit(){
    
  this.step = this.step+1;
}
previous(){
  this.step = this.step-1;
}

getAllFacture() {
    
  this.factureService.GetFacture().subscribe((data: Facture[]) => {
    this.factures = data;
   
   /*  console.log(this.produit); */
    
  }, error => {
    console.log(error);
  });

}

getAllResident() {
    
  this.residentService.GetResident().subscribe((data: Resident[]) => {
    this.resident = data;
   
   /*  console.log(this.produit); */
    
  }, error => {
    console.log(error);
  });

}

addArrangement(){


  if(this.arrangementForm.valid){
  
    this.arrangementService.AddArrangement(this.arrangementForm.value)
     .subscribe({
       next:(res)=>{
        if (res) {
          this.toastr.success('Arrangement Ajouté!', 'ajout effectuée avec succés.');
        } else {
          this.toastr.error('Echec de suppression!', 'Problème de suppression.');
        }           this. submit()

       },
       
     })
  }


console.log(this.arrangementForm.value)
}

addResident(){


  if(this.ResidentForm.valid){
  
    this.residentService.AddRes(this.ResidentForm.value)
     .subscribe({
       next:(res)=>{
        if (res) {
          this.toastr.success('Resident Ajouté!', 'ajout effectuée avec succés.');
        } else {
          this.toastr.error('Echec de suppression!', 'Problème de suppression.');
        }           this.submit();
       
       },
      
     })
  }


console.log(this.ResidentForm.value)
}
addChambre(){


  if(this.ChambreForm.valid){
  
    this.chambreService.AddChambre(this.ChambreForm.value)
     .subscribe({
       next:(res)=>{
        if (res) {
          this.toastr.success('Chambre Ajouté!', 'ajout effectuée avec succés.');
        } else {
          this.toastr.error('Echec de suppression!', 'Problème de suppression.');
        }  
        this. submit()
       
       },

     })
  }


console.log(this.ChambreForm.value)
}

addReservation(){

debugger
  if(this.ReservationForm.valid){
  
    this.reservationService.AddReservation(this.ReservationForm.value)
     .subscribe({
       next:(res)=>{
        if (res) {
          this.toastr.success('Reservation Ajouté!', 'ajout effectuée avec succés.');
        } else {
          this.toastr.error('Echec de suppression!', 'Problème de suppression.');
        }   
       
       },

     })
     console.log(this.ReservationForm.value)

  }


console.log(this.ReservationForm.value)
}
getAllTypeChambre() {
    
  this.typeChService.GetTypeChambre().subscribe((data: TypeChambre[]) => {
    
    this.TCH = data;
    console.log(data);
    
  }, error => {
    console.log(error);
  });
}



getAllArrangement() {
    
  this.arrangementService.GetArrangements().subscribe((data: Arrangement[]) => {
    
    this.arrang = data;
    console.log(data);
    
  }, error => {
    console.log(error);
  });
}

getAllChambre() {
    
  this.chambreService.GetChambre().subscribe((data: Chambre[]) => {
    
    this.chambre = data;
    console.log(data);
    
  }, error => {
    console.log(error);
  });
}

// getChambreByCode() {
    
//   this.chambreService.GetChambreByCode(this.ch.codAgence).subscribe((data: Chambre[]) => {
    
//     this.chambre = data;
//     console.log(data);
    
//   }, error => {
//     console.log(error);
//   });
// }

}
