import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router, RouterLinkWithHref } from '@angular/router';
import { NgxDomConfettiService } from 'ngx-dom-confetti';
import { timer } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { NgxDomConfettiModule } from 'ngx-dom-confetti';
import { MatxPassToggleVisibilityModule } from 'src/app/shared/components/matx-pass-toggle-visibility/matx-pass-toggle-visibility.module';

const identityPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password &&
        confirmPassword &&
        password.value !== confirmPassword.value
        ? { identityPassword: true }
        : null;
};

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [
        ReactiveFormsModule,
        SharedMaterialModule,
        NgxDomConfettiModule,
        MatxPassToggleVisibilityModule,
        UiModule,
        RouterLinkWithHref,
    ],
})
export class RegisterComponent implements OnInit {
    private fb = inject(FormBuilder);
    private toast = inject(HotToastService);
    private userApi = inject(UserService);
    private router = inject(Router);
    private ngxDomConfettiService = inject(NgxDomConfettiService);

    @ViewChild('btn', { read: ElementRef })
    btn!: ElementRef<HTMLButtonElement>;

    public hideConfirmPassword: boolean;

    public isLoading: boolean;

    public form: FormGroup;

    public get username() {
        return this.form.get('username');
    }

    public get password() {
        return this.form.get('password');
    }

    public get confirmPassword() {
        return this.form.get('confirmPassword');
    }

    constructor() {
        this.form = this.fb.group(
            {
                username: ['', [Validators.required]],
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]],
            },
            { validators: identityPasswordValidator }
        );

        this.hideConfirmPassword = true;
        this.isLoading = false;
    }

    ngOnInit(): void {
        this.isLoading = false;
    }

    public toggleVisibilityConfirmPasswordIcon(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.hideConfirmPassword = !this.hideConfirmPassword;
    }

    public register() {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        this.userApi
            .createUser(this.username!.value, this.password!.value)
            .subscribe((res) => {
                if (res.status === 200) {
                    this.toast.success('注册成功');
                    const el = this.btn.nativeElement.children.item(
                        0
                    ) as HTMLElement;
                    if (el) {
                        this.ngxDomConfettiService.open(el);
                    }

                    timer(1500).subscribe(() =>
                        this.router.navigateByUrl('login')
                    );
                } else {
                    this.toast.error(res.error?.message ?? '注册失败');
                    this.isLoading = false;
                }
            });
    }

    public test() {
        console.log('test', this.btn);
    }
}
