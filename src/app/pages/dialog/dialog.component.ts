import { Hotel } from '@/Model/Hotel';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { HotelService } from '@services/hotel.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
hotelForm !: FormGroup;
actionBtn : string = "Save"
nomDial : string = "Ajout Hotel";
userFile ;
hotel : Hotel[] = [];

public imagePath;
imgURL: any;
public message: string;

  constructor(public hotelService : HotelService,private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.hotelService.dataForm = this.formBuilder.group({
      idHotel : [''],
      

      nomHotel : ['',Validators.required],
      adr1Hotel: ['',Validators.required],
      adr2Hotel : [''],
      adr3Hotel : [''],
      telHotel: ['',Validators.required],
      faxHotel: ['',Validators.required],
      matFiscale: ['',Validators.required],
      chambreHotel: ['',Validators.required],
      litHotel: ['',Validators.required],
      debSaisonHotel: ['',Validators.required],
      finSaisonHotel: ['',Validators.required],
      statusHotel: [''],
      ccb1Hotel: [''],
      ccb2Hotel: [''],
      cptClientHotel: [''],
      cptAvanceHotel: [''],
      jorVenteHotel: [''],
      jorOdHotel: [''],
      jorCaisseHotel: [''],
      jorBanqueHotel: [''],
      laisStandHotel: [''],
      laisCaisseHotel: [''],
      sigleHotel: [''],
      refHotel: [''],

      inputHotel: [''],
      cptTransHotel: [''],
      email: ['',Validators.required],
    });
    // this.hotelService.dataForm = this.formBuilder.group({
    //   idHotel : [''],
      

    //   nomHotel : ['',Validators.required],

    //   email: ['',Validators.required],
    // });

if (this.editData){
  this.actionBtn = "update";
  this.nomDial = "update Hotel";

  this.hotelService.dataForm.controls['idHotel'].setValue(this.editData.idHotel);

  this.hotelService.dataForm.controls['nomHotel'].setValue(this.editData.nomHotel);
  this.hotelService.dataForm.controls['adr1Hotel'].setValue(this.editData.adr1Hotel);
  this.hotelService.dataForm.controls['adr2Hotel'].setValue(this.editData.adr2Hotel);
  this.hotelService.dataForm.controls['adr3Hotel'].setValue(this.editData.adr3Hotel);
  this.hotelService.dataForm.controls['telHotel'].setValue(this.editData.telHotel);
  this.hotelService.dataForm.controls['faxHotel'].setValue(this.editData.faxHotel);
  this.hotelService.dataForm.controls['matFiscale'].setValue(this.editData.matFiscale);
  this.hotelService.dataForm.controls['chambreHotel'].setValue(this.editData.chambreHotel);
  this.hotelService.dataForm.controls['litHotel'].setValue(this.editData.litHotel);
  this.hotelService.dataForm.controls['debSaisonHotel'].setValue(this.editData.debSaisonHotel);
  this.hotelService.dataForm.controls['finSaisonHotel'].setValue(this.editData.finSaisonHotel);
  this.hotelService.dataForm.controls['statusHotel'].setValue(this.editData.statusHotel);
  this.hotelService.dataForm.controls['ccb1Hotel'].setValue(this.editData.ccb1Hotel);
  this.hotelService.dataForm.controls['ccb2Hotel'].setValue(this.editData.ccb2Hotel);
  this.hotelService.dataForm.controls['cptClientHotel'].setValue(this.editData.cptClientHotel);
  this.hotelService.dataForm.controls['cptAvanceHotel'].setValue(this.editData.cptAvanceHotel);
  this.hotelService.dataForm.controls['jorVenteHotel'].setValue(this.editData.jorVenteHotel);
  this.hotelService.dataForm.controls['jorOdHotel'].setValue(this.editData.jorOdHotel);
  this.hotelService.dataForm.controls['jorCaisseHotel'].setValue(this.editData.jorCaisseHotel);
  this.hotelService.dataForm.controls['jorBanqueHotel'].setValue(this.editData.jorBanqueHotel);
  this.hotelService.dataForm.controls['laisStandHotel'].setValue(this.editData.laisStandHotel);
  this.hotelService.dataForm.controls['laisCaisseHotel'].setValue(this.editData.laisCaisseHotel);
  this.hotelService.dataForm.controls['sigleHotel'].setValue(this.editData.sigleHotel);
  this.hotelService.dataForm.controls['refHotel'].setValue(this.editData.refHotel);
  this.hotelService.dataForm.controls['inputHotel'].setValue(this.editData.inputHotel);
  this.hotelService.dataForm.controls['cptTransHotel'].setValue(this.editData.cptTransHotel);
  this.hotelService.dataForm.controls['email'].setValue(this.editData.email);
 
}
  }

  getAllHotels() {
    
    this.hotelService.GetHotels().subscribe((data: Hotel[]) => {
this.hotel=data;
      console.log(data);
          
        }, error => {
          console.log(error);
        });
  }  
  addData() {
    const formData = new  FormData();
    const article = this.hotelService.dataForm.value;
    formData.append('hotel',JSON.stringify(article));
    formData.append('file',this.userFile);
    this.hotelService.createData(formData).subscribe( data => {
      if (data) {
        this.toastr.success('Hotel added!', 'Ajout effectuée avec succés.');
      } else {
        this.toastr.error('Echec ajout', 'Problème de suppression.');
      }            
        this.hotelService.dataForm.reset();
      this.dialogRef.close();
     
    });
  }

  addHotel(){
    if (!this.editData){

     if(this.hotelForm.valid){
       
        this.hotelService.AddHotel(this.hotelForm.value)
         .subscribe({
           next:(res)=>{
             alert("Hotel added successfully")
             this.hotelForm.reset();
             this.dialogRef.close('save');
            // this.getAllHotels();
             
           },
           error:()=>{
             alert("Error while adding Hotel")
           }
         })
      }
    }
else{
  this.updateHotel();
}
      console.log(this.hotelForm.value)
  }
  updateHotel(){
    this.hotelService.putHotel(this.hotelService.dataForm.value)

    .subscribe({
      next:(res)=>{
        
        if (res) {
          this.toastr.success('Contrat updated!', 'update effectuée avec succés.');
          this.hotelForm.reset();
        this.dialogRef.close('update');
        } else {
          this.toastr.error('Echec update', 'Problème de suppression.');
        }                 
      },
      error:()=>{
        alert("Error");
      }
     

    })

  }

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
     // this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
     
      
    }
    
}
