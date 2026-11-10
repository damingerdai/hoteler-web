import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Navbar } from 'src/app/shared/components';
import { FlexSpacer } from 'src/app/shared/ui/directives/flex-spacer';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.html',
    styleUrls: ['./admin-layout.scss'],
    imports: [
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        Navbar,
        FlexSpacer,
        RouterModule,
    ],
})
export class AdminLayout {
    private breakpointObserver = inject(BreakpointObserver);

    public isMobile: boolean;

    protected drawerOpened = true;
    protected drawerCollapsed = false;

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

    constructor() {
        this.breakpointObserver
            .observe([Breakpoints.XSmall])
            .subscribe((result) => {
                this.isMobile = result.matches;
                this.drawerOpened = !this.isMobile;
                this.drawerCollapsed = false;
            });
    }

    toggleDrawer() {
        if (this.isMobile) {
            this.drawerOpened = !this.drawerOpened;
            return;
        }

        this.drawerOpened = true;
        this.drawerCollapsed = !this.drawerCollapsed;
    }

    openDrawer() {
        this.drawerOpened = true;
        this.drawerCollapsed = false;
    }

    closeDrawer() {
        if (this.isMobile) {
            this.drawerOpened = false;
        } else {
            this.drawerCollapsed = true;
        }
    }

    closeDrawerInMobile() {
        if (this.isMobile) {
            this.drawerOpened = false;
        }
    }
}
