import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { TokenApi } from './token-api';

describe('TokenApi', () => {
  let service: TokenApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(TokenApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
