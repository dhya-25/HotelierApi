import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { HotelComponent } from '@pages/hotel/hotel.component';
import { AgenceComponent } from '@pages/agence/agence.component';
import { ReservationComponent } from '@pages/reservation/reservation.component';
import { TypeChambreComponent } from '@pages/type-chambre/type-chambre.component';
import { AffectationComponent } from '@pages/affectation/affectation.component';
import { ContratAgenceComponent } from '@pages/contrat-agence/contrat-agence.component';
import { EtatChambreComponent } from '@pages/etat-chambre/etat-chambre.component';
import { FactureComponent } from '@pages/facture/facture.component';
import { ConsommationComponent } from '@pages/consommation/consommation.component';
import { YtilComponent } from '@pages/ytil/ytil.component';
import { EntreSortieComponent } from '@pages/entre-sortie/entre-sortie.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
       
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'EntreSortie',
                component: EntreSortieComponent
            },
            {
                path: 'Facture',
                component: FactureComponent
            },
            {
                path: 'Consommation',
                component: ConsommationComponent
            },
            {
                path: 'Utilisateur',
                component: YtilComponent
            },
            {
                path: 'EtatChambre',
                component: EtatChambreComponent
            },
            {
                path: 'Affectation',
                component: AffectationComponent
            },
            {
                path: 'Reservation',
                component: ReservationComponent
            },
            {
                path: 'ContratAgence',
                component: ContratAgenceComponent
            },
            {
                path: 'hotel',
                component: HotelComponent
            },
            {
                path: 'agence',
                component: AgenceComponent
            },
            {
                path: 'typeChambre',
                component: TypeChambreComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },

    {path: '**', redirectTo: ''}
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
