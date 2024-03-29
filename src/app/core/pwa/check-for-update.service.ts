import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApplicationRef, Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { NgxIsStandaloneService } from 'ngx-is-standalone';
import { Subject, concat, interval } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfirmComponent } from 'src/app/shared/components';


@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {

  private isMobile = false;
  private checkInterval = 1000 * 60 * 60 * 6;  // 6 hours
  private onDisable = new Subject<void>();

  appRef: ApplicationRef = inject(ApplicationRef);
  updates: SwUpdate = inject(SwUpdate);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  dialog: MatDialog = inject(MatDialog);
  ngxIsStandaloneService: NgxIsStandaloneService = inject(NgxIsStandaloneService);

  public get isStandalone() {
    return this.ngxIsStandaloneService.isStandalone;
  }

  constructor() {
    this.isMobile = false;

  }

  public close() {
    this.onDisable.next();
  }

  public check() {
    this.checkIsMobile();
    this.checkForUpdate();
    this.trackVersionUpdates();
    this.trackUnrecoverableError();
  }

  private checkForUpdate() {
    concat(
      this.appRef.isStable.pipe(first(isStable => isStable === true)),
      interval(60 * 1000)
    ).pipe(
      tap(() => console.log('Checking for update...')),
      takeUntil(this.onDisable),
    )
      .subscribe(() => {
        this.updates.checkForUpdate();
      });
  }


  private checkIsMobile() {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(state => {
      this.isMobile = state.matches;
    });
  }

  private trackVersionUpdates() {
    this.updates.versionUpdates
      .pipe(
        takeUntil(this.onDisable),
      )
      .subscribe(evt => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${evt.currentVersion.hash}`);
            console.log(
              `New app version ready for use: ${evt.latestVersion.hash}`
            );
            this.confirmUser();
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(
              `Failed to install app version '${evt.version.hash}': ${evt.error}`
            );
            break;
        }
      });
  }

  private confirmUser() {
    if (!this.updates.isEnabled) {
      return;
    }

    if (
      this.isStandalone ||
      document.referrer.includes('android-app://') ||
      this.isMobile
    ) {
      const confirm = this.dialog.open(ConfirmComponent, {
        width: '400px',
        data: {
          title: '新的版本已经发布',
          description: '请选择更新到最新版'
        }
      });
      confirm.afterClosed().subscribe(value => {
        if (value) {
          this.updates.activateUpdate().then(() => {
            document.location.reload();
          });
        }
      });
    } else {
      this.updates.activateUpdate();
    }
  }

  private trackUnrecoverableError() {
    this.updates.unrecoverable
      .pipe(
        switchMap(() => {
          const unrecoverableDialog = this.dialog.open(ConfirmComponent, {
            width: '400',
            height: '200px',
            data: {
              title: '未知错误',
            }
          });

          return unrecoverableDialog.afterClosed();
        }),
        filter(result => !!result),
        takeUntil(this.onDisable),
      )
      .subscribe(() => {
        document.location.reload();
      });
  }

}
