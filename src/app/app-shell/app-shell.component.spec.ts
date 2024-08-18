import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShellComponent } from './app-shell.component';
import { SharedMaterialModule } from '../shared/shared.material.module';
import { CoreModule } from '../core';
import { provideRouter } from '@angular/router';
import { SettingsService } from '../core/services/settings/settings.service';
import { ThemeStorageService } from '../shared/components';

describe('AppShellComponent', () => {
    let component: AppShellComponent;
    let fixture: ComponentFixture<AppShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CoreModule, SharedMaterialModule, AppShellComponent],
            providers: [
                provideRouter([]),
                SettingsService,
                ThemeStorageService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
