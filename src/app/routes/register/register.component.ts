import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';

const identityPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { identityPassword: true } : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hidePassword: boolean;

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

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userApi: UserService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: identityPasswordValidator });

    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  public toggleVisibilityIcon(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  public toggleVisibilityConfirmPasswordIcon(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  public register() {
    this.userApi.createUser(this.username.value, this.password.value)
      .subscribe(res => {
        if (res.status === 200) {
          this.snackBar.open('注册成功', 'X');
          timer(1500).subscribe(() => this.router.navigateByUrl('login'));
        } else {
          this.snackBar.open(res.error?.message ?? '注册失败', 'X');
        }
      });
  }


}
