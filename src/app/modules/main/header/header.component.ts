import {AppState} from '@/store/state';
import {ToggleControlSidebar, ToggleSidebarMenu} from '@/store/ui/actions';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import { TokenStorageService } from '@services/token-storage.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-header navbar navbar-expand';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public searchForm: FormGroup;

    constructor(
        private appService: AppService,
        private store: Store<AppState>,    private router: Router, private tokenStorage: TokenStorageService

    ) {}

    ngOnInit() {
      
    }

    logout(): void {
        this.tokenStorage.signOut();
        this.router.navigate(['/login']);
    }
}
