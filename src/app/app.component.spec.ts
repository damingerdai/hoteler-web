import { TestBed, inject } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CheckForUpdateService } from './core/pwa/check-for-update.service';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        AppComponent,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: true,
        })
      ],
      providers: [
        provideAnimationsAsync(),
        {
          provide: CheckForUpdateService, usefactory: () => {
            const service = jasmine.createSpyObj<CheckForUpdateService>('CheckForUpdateService', ['close', 'check']);
            let status = false;
            service.close.and.callFake(() => status = false);
            service.check.and.callFake(() => status = true);
            service['status'] = status;

            return service;
          }
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be enabled when the component is initialized', () => {
    inject([CheckForUpdateService], (service: CheckForUpdateService) => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      expect(service.check).toHaveBeenCalled();
      fixture.destroy();
      expect(service.close).toHaveBeenCalled();
    });
  });

});
