import {
    Component,
    OnInit,
    computed,
    inject,
    signal,
} from '@angular/core';
import {
    FieldState,
    FieldTree,
    FormField,
    FormRoot,
    TreeValidationResult,
    form,
    required,
} from '@angular/forms/signals';
import { Router, RouterLinkWithHref } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserSession } from 'src/app/core/services/settings/user-session';
import { TokenApi } from 'src/app/core/services/token/token-api';
import { UserData } from 'src/app/core/services/user/user-data';
import { SharedMaterialModule } from 'src/app/shared/shared-material-module';
import { UiModule } from 'src/app/shared/ui/ui-module';

interface LoginModel {
    username: string;
    password: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    imports: [
        FormField,
        FormRoot,
        SharedMaterialModule,
        UiModule,
        RouterLinkWithHref,
    ],
})
export class Login implements OnInit {
    private settings = inject(UserSession);
    private tokenApi = inject(TokenApi);
    private userApi = inject(UserData);
    private router = inject(Router);

    public hide = signal(true);

    private model = signal<LoginModel>({ username: '', password: '' });

    public loginForm: FieldTree<LoginModel> = form(
        this.model,
        (login) => {
            required(login.username, { message: '用户名是必填项' });
            required(login.password, { message: '密码是必填项' });
        },
        {
            submission: {
                action: (login) => this.loginAction(login().value()),
            },
        }
    );

    public isLoading = computed(() => this.loginForm().submitting());

    public loginError = computed(() => this.loginForm().errors()[0]?.message);

    public get username(): FieldState<string> {
        return this.loginForm.username();
    }

    public get password(): FieldState<string> {
        return this.loginForm.password();
    }

    ngOnInit(): void {
        this.settings.clearUser();
    }

    public toggleVisibilityIcon(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.hide.set(!this.hide());
    }

    private async loginAction(
        credentials: LoginModel
    ): Promise<TreeValidationResult> {
        const { username, password } = credentials;
        try {
            const res = await firstValueFrom(
                this.tokenApi.login(username, password)
            );
            if (res.status != 200) {
                return this.toLoginErrors(res);
            }
            const token = res.userToken;
            this.settings.saveToken(token);
            const userRes = await firstValueFrom(
                this.userApi.getCurrentUser(token.accessToken)
            );
            if (userRes.status == 200) {
                this.settings.user = {
                    ...this.settings.user,
                    ...userRes.data,
                };
                this.router.navigate(['dashboard']);
            }
            return undefined;
        } catch (err) {
            return this.toLoginErrors(err);
        }
    }

    private toLoginErrors(source: unknown): TreeValidationResult {
        const message = (source as { error?: { message?: string } })?.error
            ?.message;
        return [{ kind: 'server', message: message ?? '登陆失败' }];
    }
}
