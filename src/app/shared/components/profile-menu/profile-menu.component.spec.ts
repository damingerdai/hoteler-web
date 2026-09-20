import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProfileMenuComponent } from './profile-menu.component';

describe('ProfileMenuComponent', () => {
    let component: ProfileMenuComponent;
    let fixture: ComponentFixture<ProfileMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileMenuComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileMenuComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('username', 'tester');
        fixture.componentRef.setInput('role', 'admin');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
