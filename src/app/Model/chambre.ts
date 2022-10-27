import { Reservation } from "./Reservation";

export class Chambre{
    idChambre!:number;
    codeResaChambre!:number;
    codReas!:number;
    nbrAdulte!:number;
    nomResa!:string;
    nbrbebe!:number;
    arrangBebe!:string;
    dateArr!:Date;
    dateDep!:Date;
    codeVip!:string;
    etatRes!:string;
    commentaire!:string;
    num_chambre!:string;
    nbrAdult_a!:number;
    nbrEnfant_a!:number;
    nbrBebe_a!:number;
    heureArr!:string;
    heureDep!:string;
    remise!:boolean;
    motif!:string;
    prixUnitaire!:number;
    numFacture!:number;
    dateFacture!:Date;
    offre!:boolean;
    mntRemise!:number;
    typeRemise!:string;
    libRemise!:string;
    dateRemise!:Date;
    userRemise!:number;
    typePrix!:string;
    tot_adult!:number;

    tot_enfant!:number;

    codAgence!:String;

}