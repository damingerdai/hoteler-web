import { Component, OnInit } from '@angular/core';
import { ENTER, MAC_ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api/api.service';
import { UserTokenReponse } from 'src/app/core/models';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide = true;

  public errorMessage: string;

  public loginForm: FormGroup;

  public get username() {
    return this.loginForm.get('username');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private settings: SettingsService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // this.loginForm.valueChanges.subscribe(res => this.errorMessage = '');
  }

  ngOnInit(): void {
  }

  public handleKeyPress(event: KeyboardEvent) {
    event.stopPropagation();
    if ([ENTER, MAC_ENTER].includes(event.keyCode)) {
      event.preventDefault();
    }
  }

  public toggleVisibilityIcon(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.hide = !this.hide;
  }

  public login() {
    this.errorMessage = '';
    this.api.post<UserTokenReponse>('/api/v1/token', {}, {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(res => {
      if (res.status === 200) {
        const user =  {
          ...res.userToken,
          username: this.loginForm.value.username
        };
        this.settings.user = user;
        this.router.navigate(['dashboard']);
      } else {
        // this.errorMessage = (res as any).error.message;
        this.loginForm.setErrors({
          login: (res as any).error.message
        });
      }

    });
  }

}
