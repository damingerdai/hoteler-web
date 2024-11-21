import { Component, OnInit } from '@angular/core';
import { ENTER, MAC_ENTER } from '@angular/cdk/keycodes';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { switchMap, throwError } from 'rxjs';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { UiModule } from 'src/app/shared/ui/ui.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        ReactiveFormsModule,
        SharedMaterialModule,
        UiModule,
        RouterLinkWithHref,
    ],
})
export class LoginComponent implements OnInit {
    public hide = true;

    public isLoading = false;

    public errorMessage: string;

    public loginForm: FormGroup;

    public get username() {
        return this.loginForm.get('username');
    }

    public get password() {
        return this.loginForm.get('password');
    }

    constructor(
        private fb: FormBuilder,
        private settings: SettingsService,
        private tokenApi: TokenService,
        private userApi: UserService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });

        // this.loginForm.valueChanges.subscribe(res => this.errorMessage = '');
    }

    ngOnInit(): void {
        this.settings.clearUser();
    }

    public handleKeyPress(event: KeyboardEvent) {
        event.stopPropagation();
        if ([ENTER, MAC_ENTER].includes(event.keyCode)) {
            console.log('preventDefault');
            event.preventDefault();
        }
    }

    public toggleVisibilityIcon(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.hide = !this.hide;
    }

    public login() {
        this.isLoading = true;
        this.errorMessage = '';
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;
        this.tokenApi
            .login(username, password)
            .pipe(
                switchMap((res) => {
                    if (res.status != 200) {
                        return throwError(() => res);
                    }
                    const token = res.userToken;
                    this.settings.saveToken(token);
                    return this.userApi.getCurrentUser(token.accessToken);
                })
            )
            .subscribe({
                next: (res) => {
                    if (res.status == 200) {
                        this.settings.user = {
                            ...this.settings.user,
                            ...res.data,
                        };
                        this.router.navigate(['dashboard']);
                    }
                    this.isLoading = false;
                },
                error: (err) => {
                    this.loginForm.setErrors({
                        login: (err as any).error?.message ?? '登陆失败',
                    });
                    this.isLoading = false;
                },
                complete: () => (this.isLoading = false),
            });
    }
}
