import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


describe('AppComponent', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppComponent,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: true,
        })
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
