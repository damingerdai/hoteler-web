import { inject, Injectable } from '@angular/core';
import { ApiClient } from '../../api/api-client';
import { UserTokenResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class TokenApi {

  private api: ApiClient = inject(ApiClient);
  
  public login(username: string, password: string) {
    return this.api.post<UserTokenResponse>('/api/v1/token', {}, {
      username,
      password
    });
  }

}
