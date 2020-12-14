import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api/api.service';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public get username() {
    return this.loginForm.get('username');
  }

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private settings: SettingsService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public login() {
    this.api.post('/api/v1/token', {}, {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(res => {
      this.settings.user = {
        username: this.loginForm.value.username
      };
    });
  }

}
