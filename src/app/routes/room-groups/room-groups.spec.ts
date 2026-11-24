import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoomGroups } from './room-groups';

describe('RoomGroups', () => {
    let component: RoomGroups;
    let fixture: ComponentFixture<RoomGroups>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoomGroups],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(RoomGroups);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the page title and description', () => {
        const header: HTMLElement =
            fixture.nativeElement.querySelector('header');

        expect(header.querySelector('h1').textContent).toBe('房间分组');
        expect(header.querySelector('p').textContent).toBe(
            '管理酒店房间分组信息'
        );
    });

    it('should display the administrator breadcrumb with home and room group links', () => {
        const breadcrumb: HTMLElement = fixture.nativeElement.querySelector(
            'nav[aria-label="breadcrumb"]'
        );
        const links = breadcrumb.querySelectorAll('a');

        expect(breadcrumb.textContent).toContain('管理员');
        expect(links.length).toBe(2);
        expect(links[0].getAttribute('href')).toBe('/');
        expect(links[1].getAttribute('href')).toBe('/room-group');
        expect(links[1].textContent).toBe('房间分组');
    });

    it('should display an enabled create room group button', () => {
        const button: HTMLButtonElement =
            fixture.nativeElement.querySelector('header button');

        expect(button.textContent).toContain('创建房间分组');
        expect(button.disabled).toBe(false);
    });

    it('should display the empty state with guidance to create a room group', () => {
        const emptyState: HTMLElement =
            fixture.nativeElement.querySelector('app-empty-state');

        expect(emptyState.querySelector('mat-icon').textContent).toBe('layers');
        expect(emptyState.querySelector('h2').textContent).toBe('暂无房间数据');
        expect(emptyState.querySelector('p').textContent).toBe(
            '当前酒店还没有录入房间分组信息，您可以立即创建一个新房间分组'
        );
    });
});
