import { Facture } from '@/Model/Facture';
import { Component, OnInit } from '@angular/core';
import { FactureService } from '@services/facture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-genere-facture',
  templateUrl: './genere-facture.component.html',
  styleUrls: ['./genere-facture.component.scss']
})
export class GenereFactureComponent implements OnInit {
facture:Facture[]=[]
fact : Facture= new Facture();
selectedObject:Facture;

  constructor(private factureService : FactureService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getFacture()
  }
  getFacture() {
    
    this.factureService.GetFacture().subscribe((data: Facture[]) => {
      this.facture=data
      console.log(this.fact.numFactInd);

  console.log(data);
      
    }, error => {
      console.log(error);
    });
  }
  printerReport(){
   
    try {
        
        this.factureService.getReportFacture('facture2',this.fact.numFactInd)
        .subscribe((data)=>{
          
          let file = new Blob([data], { type: 'application/pdf' });            
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        });
      

    } catch (error) {
      console.log(error)
    }
  }
  printerReportt(){
    try {
        debugger
        this.factureService.getReportFacture('facture2',4)
        .subscribe((data)=>{
          console.log(data)
          let file = new Blob([data], { type: 'application/pdf' });            
          var fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        });
      

    } catch (error) {
      console.log(error)
    }
  }

}
