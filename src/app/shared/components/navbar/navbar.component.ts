import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser, Permission } from 'src/app/core/models';
import { SettingsService } from '../../../core/services/settings/settings.service';
import { SharedMaterialModule } from '../../shared.material.module';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import { FlexSpacerDirective } from '../../ui/directives/flex-spacer.directive';
import { environment } from 'src/environments/environment';
import { LogoComponent } from '../logo/logo.component';
import { GithubComponent } from '../icons/github/github.component';
import { AvatarModule } from 'ngx-avatars';

interface IMenuItem {
    displayName: string;
    slug: string;
    neededPermissions?: string | string[];
    // eslint-disable-next-line no-unused-vars
    withPermissions: boolean | ((user: Partial<IUser>) => boolean);
}

const MENUS: IMenuItem[] = [
    {
        displayName: '仪表盘',
        slug: '/dashboard',
        neededPermissions: Permission.MANAGE_DASHBOARD,
        withPermissions: true,
    },
    {
        displayName: '客户信息',
        slug: '/customer',
        neededPermissions: Permission.MANAGE_CUSTOMER,
        withPermissions: true,
    },
    {
        displayName: '房间信息',
        slug: '/room',
        neededPermissions: Permission.MANAGE_ROOM,
        withPermissions: true,
    },
];

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        NgTemplateOutlet,
        SharedMaterialModule,
        AvatarModule,

        LogoComponent,
        ThemePickerComponent,
        TitleCasePipe,
        FlexSpacerDirective,
        GithubComponent
    ],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    protected _user: IUser;

    protected menus = [] as IMenuItem[];

    @Input()
    public showMenu: boolean = false;

    protected isMobile: boolean;

    protected isKikeIPhone5s: boolean;

    public get user() {
        return this._user;
    }

    public get username() {
        return this._user?.username;
    }

    public get isAdmin() {
        return this._user?.roles?.map((r) => r.name).includes('admin');
    }

    public get showBarnd() {
        if (this.showMenu) {
            return !this.isKikeIPhone5s;
        }
        return true;
    }

    public get showGithubLogo() {
        return environment.showGithubLogo;
    }

    @Output()
    public menuClick = new EventEmitter<void>();

    constructor(
        private breakpointObserver: BreakpointObserver,
        private settings: SettingsService,
        private router: Router,
        private sanitizer: DomSanitizer
    ) {
        this.isKikeIPhone5s = false;
        const subscription1 = this.breakpointObserver
            .observe([Breakpoints.XSmall])
            .subscribe((result) => {
                this.isMobile = result.matches;
            });
        this.subscriptions.push(subscription1);
        const subscription2 = this.settings.user$.subscribe((user) =>
            this.processUser(user)
        );
        this.subscriptions.push(subscription2);
        const subscription4 = this.breakpointObserver
            .observe(['(max-width: 374px) and (orientation: portrait)'])
            .subscribe((result) => {
                this.isKikeIPhone5s = result.matches;
            });
        this.subscriptions.push(subscription4);
    }

    ngOnInit(): void {
        this.processUser(this.settings.user as IUser);
    }

    ngOnDestroy(): void {
        if (this.subscriptions?.length > 0) {
            this.subscriptions.forEach((subscription) =>
                subscription.unsubscribe()
            );
        }
    }

    public logout() {
        this.settings.user = null;
        this.router.navigateByUrl('login');
    }

    public toggle() {
        this.menuClick.next();
    }

    protected processUser(user: Partial<IUser>) {
        this._user = { ...user } as IUser;
        const permissions = this._user.permissions?.map((p) => p.name);
        if (!permissions || permissions.length == 0) {
            this.menus = [];
            return;
        }
        this.menus = MENUS.map((item) => {
            if (typeof item.withPermissions === 'boolean') {
                item.withPermissions =
                    !item.neededPermissions ||
                    (Array.isArray(item.neededPermissions)
                        ? item.neededPermissions?.some((p) =>
                              permissions.includes(p)
                          )
                        : permissions.includes(item.neededPermissions));
            } else if (typeof item.neededPermissions === 'function') {
                item.withPermissions = item.withPermissions({
                    ...this.user,
                } as Partial<IUser>);
            }

            return { ...item };
        }).filter((item) => item.withPermissions);
    }
}
