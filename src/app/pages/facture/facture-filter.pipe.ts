import { Facture } from "@/Model/Facture";
import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'factureFilter' 
})
export class FactureFilterPipe implements PipeTransform{
    transform(facture:Facture[],searchTerm:any): Facture[] {
      if(!facture || !searchTerm){
          return facture;
      }
      return facture.filter(fact =>
         fact.numFactInd !== -1);
    }
}