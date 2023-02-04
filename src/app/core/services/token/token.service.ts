import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { UserTokenResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private api: ApiService = inject(ApiService);

  constructor() { }

  public login(username: string, password: string) {
    return this.api.post<UserTokenResponse>('/api/v1/token', {}, {
      username,
      password
    });
  }

}
