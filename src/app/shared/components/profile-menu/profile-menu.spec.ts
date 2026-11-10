import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProfileMenu } from './profile-menu';

describe('ProfileMenu', () => {
    let component: ProfileMenu;
    let fixture: ComponentFixture<ProfileMenu>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProfileMenu],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileMenu);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('username', 'tester');
        fixture.componentRef.setInput('role', 'admin');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
