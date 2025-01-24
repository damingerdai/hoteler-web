import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RoomComponent } from './room.component';

describe('RoomComponent', () => {
    let component: RoomComponent;
    let fixture: ComponentFixture<RoomComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoomComponent, HttpClientTestingModule],
            providers: [provideRouter([]), provideNoopAnimations()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
