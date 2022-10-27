import { Role } from "./Role";

export class Utilisateur{
    id!:String;
    username!:string;
    password!:string;
    matPers!:string;
    dureeAcc!:number;
    adresse!:string;
    tel!:string;
    cin!:string;
    dateDeb!:string;
    ref!:string;
    roles!:Role;
    


}