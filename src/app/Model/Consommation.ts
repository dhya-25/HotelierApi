import { Facture } from "./Facture";
import { Prestation } from "./Prestation";

export class Consommation{
    idConsommation!:number;
    mntConso!:number;
    codCons!:number;
    codResid!:number;
    codPrestation!:string;
    codUser!:number;
    codHotel!:string;
    codAgence!:string;
    dateConso!:Date;
    heureConso!:string;
    numBon!:string;
    typeConso!:string;
    dateSys!:Date;
    offre!:string;
    typeClient!:string;
    numFactInd!:number;
    numFactDeb!:number;
    forfait!:string;
    codeDev!:string;
    tauxDev!:number;
    unite!:string;
    pres!:Prestation;
    facture!: Facture;


}