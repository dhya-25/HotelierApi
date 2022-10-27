import { Utilisateur } from '@/Model/Utilisateur';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import { TokenStorageService } from '@services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
   // public menu = MENU;
util : Utilisateur
isAdmin : boolean
    constructor(
        public appService: AppService,
        private tokenStorageService : TokenStorageService,
        private router: Router,private toastr: ToastrService
    ) {}

    ngOnInit() {

        this.isAdmin = (this.util.roles.name === 'ROLE_ADMIN');
        if (!this.isAdmin && this.router.url.indexOf('/Utilisateur') > -1) 
        this.router.navigate(['/dashboard']);
        console.log(this.isAdmin)
    
      }
    logout(): void {
        debugger

        window.sessionStorage.clear();
      
    this.router.navigate(['/login']);
}
}

// export const MENU = [
//     {
//         name: 'Dashboard',
//         path: ['/']
//     },
//     {
//         name: 'Utilisateur',
//         path: ['/Utilisateur']
//     },
//     {
//         name: 'Affectation',
//         path: ['/Affectation']
//     },
//     {
//         name: 'Reservation',
//         path: ['/Reservation']
//     },

//     {
//         name: 'Facture',
//         children: [
//             {
//                 name: 'Facture',
//                 path: ['/Facture']
//             },

//             {
//                 name: 'Consommation',
//                 path: ['/Consommation']
//             },
           

//         ]
//     },

//     {
//         name: 'Parametrages',
//         children: [
//             {
//                 name: 'Agence',
//                 path: ['/agence']
//             },

//             {
//                 name: 'Hotel',
//                 path: ['/hotel']
//             },
//             {
//                 name: 'Type Chambre',
//                 path: ['/typeChambre']
//             },
//             {
//                 name: 'ContratAgence',
//                 path: ['/ContratAgence']
//             },
//             {
//                 name: 'Etat Chambre',
//                 path: ['/EtatChambre']
//             },

//         ]
//     },

    
// ];
