import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from 'src/app/shared/components';
import { FlexSpacerDirective } from 'src/app/shared/ui/directives/flex-spacer.directive';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
    imports: [
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        NavbarComponent,
        FlexSpacerDirective,
        RouterModule,
    ],
})
export class AdminLayoutComponent {
    public isMobile: boolean;

    protected drawerOpened = true;

    // @ViewChild('drawer') drawer: MatDrawer;

    protected menus = [
        {
            type: 'menu',
            header: '主页',
            items: [
                {
                    icon: 'dashboard',
                    link: './dashboard',
                    line: '仪表盘',
                },
                {
                    icon: 'face',
                    link: './customer',
                    line: '客户信息',
                },
                {
                    icon: 'room_service',
                    link: './room',
                    line: '房间信息',
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            type: 'menu',
            header: '管理员',
            items: [
                {
                    icon: 'group',
                    link: './user',
                    line: '用户管理',
                },
                {
                    icon: 'receipt',
                    link: './orders',
                    line: '订单管理',
                },
            ],
        },
    ];

    public get mode() {
        return this.isMobile ? 'over' : 'side';
    }

    constructor(private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver
            .observe([Breakpoints.XSmall])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
    }

    toggleDrawer() {
        this.drawerOpened = !this.drawerOpened;
    }

    openDrawer() {
        this.drawerOpened = true;
    }

    closeDrawer() {
        this.drawerOpened = false;
    }

    closeDrawerInMobile() {
        if (this.isMobile) {
            this.drawerOpened = false;
        }
    }
}
