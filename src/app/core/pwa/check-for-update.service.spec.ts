import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxIsStandaloneModule } from 'ngx-is-standalone';

import { CheckForUpdateService } from './check-for-update.service';
import { UnrecoverableStateEvent, VersionEvent, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Observable, Subject } from 'rxjs';


export class SwUpdateServerMock {

  public isEnabled = false;

  public available: Observable<VersionReadyEvent> = new Subject();
  public activated: Observable<VersionReadyEvent> = new Subject();

  public unrecoverable: Observable<UnrecoverableStateEvent> = new Subject();
  public versionUpdates: Observable<VersionEvent> = new Subject();

  public checkForUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
  public activateUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}

describe('CheckForUpdateService', () => {
  let service: CheckForUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NgxIsStandaloneModule
      ],
      providers: [
        { provide: SwUpdate, useClass: SwUpdateServerMock }
      ]
    });
    service = TestBed.inject(CheckForUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
