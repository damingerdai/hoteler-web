import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Room } from './room';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

describe('Room', () => {
    let component: Room;
    let fixture: ComponentFixture<Room>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Room, HttpClientTestingModule],
            providers: [
                provideRouter([]),
                provideNoopAnimations(),
                provideHotToastConfig(),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Room);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
