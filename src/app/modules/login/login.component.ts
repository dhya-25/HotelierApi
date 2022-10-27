import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding,
    Input
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { UtilisateurService } from '@services/utilisateur.service';
import { TokenStorageService } from '@services/token-storage.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    form: any = {
        username: null,
        password: null
      };
      isLoggedIn = false;
      isLoginFailed = false;
      errorMessage = '';
      urlToImage = 'E:/Nouveau dossier (3)/adminlte-3-angular-main/src/ssets/img/hero-legacy-2000x700.jpg'
      roles: string[] = [];
    @HostBinding('class') class = 'login-box';
    public loginForm: FormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    @Input() background = 'hero-legacy-2000x700';  
    bkUrl = {};   
    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private authService: UtilisateurService,private tokenStorageService : TokenStorageService,
    private router: Router, private tokenStorage: TokenStorageService,private sanitizer:DomSanitizer
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
      
          } 
          this.bkUrl = this.getBkUrl();

      
    }



    getBkUrl() {
        const styles = {
          'background-image': 'url(E:/Nouveau dossier (3)/adminlte-3-angular-main/src/assets/img' + this.background + '.jpg)'
        };
        console.log(styles);
        return styles;
      }



    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
    logout(): void {
        this.tokenStorageService.signOut();
        this.router.navigate(['/login']);
    }

      onSubmit(): void {
        const { username, password } = this.form;
    
        this.authService.login(username, password).subscribe({
          next: data => {debugger
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
    
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            this.router.navigate(['/']);
    
           // this.reloadPage();
    
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        });
      }

}
