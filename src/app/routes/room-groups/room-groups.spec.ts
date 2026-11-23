import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomGroups } from './room-groups';

describe('RoomGroups', () => {
    let component: RoomGroups;
    let fixture: ComponentFixture<RoomGroups>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoomGroups],
        }).compileComponents();

        fixture = TestBed.createComponent(RoomGroups);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
