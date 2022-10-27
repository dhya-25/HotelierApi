import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';
import {ButtonComponent} from './components/button/button.component';
import {TableModule} from 'primeng/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { DialogComponent } from '@pages/dialog/dialog.component';
import { HotelComponent } from '@pages/hotel/hotel.component';
import {MatSelectModule} from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';

import {InputTextModule} from 'primeng/inputtext';
import { ReservationComponent } from '@pages/reservation/reservation.component';
import { AjoutAgenceComponent } from '@pages/ajout-agence/ajout-agence.component';
import { AgenceComponent } from '@pages/agence/agence.component';
import { TypeChambreComponent } from '@pages/type-chambre/type-chambre.component';
import { AjoutTypeChambreComponent } from './pages/ajout-type-chambre/ajout-type-chambre.component';
import {MatRadioModule} from '@angular/material/radio';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AffectationComponent } from './pages/affectation/affectation.component';
import { ContratAgenceComponent } from './pages/contrat-agence/contrat-agence.component';
import { AjoutContratAgenceComponent } from './pages/ajout-contrat-agence/ajout-contrat-agence.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EtatChambreComponent } from './pages/etat-chambre/etat-chambre.component';
import { AjoutEtatChambreComponent } from './pages/ajout-etat-chambre/ajout-etat-chambre.component';
import { FactureComponent } from './pages/facture/facture.component';
import { ConsommationComponent } from './pages/consommation/consommation.component';
import { AjoutConsommationComponent } from './pages/ajout-consommation/ajout-consommation.component';
import { FactureFilterPipe } from '@pages/facture/facture-filter.pipe';
import { AjoutFactureComponent } from './pages/ajout-facture/ajout-facture.component';
import { AjoutUserComponent } from './pages/ajout-user/ajout-user.component';
import { YtilComponent } from '@pages/ytil/ytil.component';
import { LoginnComponent } from './modules/loginn/loginn.component';
import { ChartOverviewComponent } from '@pages/dashboard/chart-overview/chart-overview.component';
import { OccupationParCategComponent } from './pages/dashboard/occupation-par-categ/occupation-par-categ.component';
import { GenereFactureComponent } from './pages/genere-facture/genere-facture.component';
import { EntreSortieComponent } from './pages/entre-sortie/entre-sortie.component';


registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        ButtonComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        PrivacyPolicyComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
        ControlSidebarComponent,
        SelectComponent,
        CheckboxComponent,
        DialogComponent,
        HotelComponent,
        AgenceComponent,
        AjoutAgenceComponent,
        ReservationComponent,
       TypeChambreComponent,
       AjoutTypeChambreComponent,
       AffectationComponent,
       ContratAgenceComponent,
       AjoutContratAgenceComponent,
       EtatChambreComponent,
       AjoutEtatChambreComponent,
       FactureComponent,
       ConsommationComponent,
       AjoutConsommationComponent ,
       FactureFilterPipe,
       AjoutFactureComponent,
       AjoutUserComponent,
       YtilComponent,
       LoginnComponent,
       ChartOverviewComponent,
       OccupationParCategComponent,
       GenereFactureComponent,
       EntreSortieComponent,
       
       
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatProgressBarModule,
        Ng2SearchPipeModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatSelectModule,
        MatIconModule,
        MatRadioModule,
        FormsModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatNativeDateModule,
        TableModule,
    ChartsModule,
    InputTextModule,

        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgbModule
        

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
