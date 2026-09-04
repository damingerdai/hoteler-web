import {
    Component,
    DestroyRef,
    OnDestroy,
    OnInit,
    afterNextRender,
    inject,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';
import {
    BreadcrumbComponent,
    ConfirmComponent,
} from 'src/app/shared/components';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
import { CreateUserComponent, UpdateUserComponent } from '../dialog';
import { RoleService } from 'src/app/core/services/role/role.service';
import { Roles } from 'src/app/core/models/roles';
import { Subscription, filter, finalize, switchMap } from 'rxjs';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { UpperCasePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    imports: [
        BreadcrumbComponent,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        SharedMaterialModule,
        SharedPipesModule,
        UpperCasePipe,
    ],
})
export class UserListComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

    protected dialog = inject(MatDialog);
    protected userService = inject(UserService);
    protected roleService = inject(RoleService);
    protected toast = inject(HotToastService);
    protected settings = inject(SettingsService);
    protected destroyRef = inject(DestroyRef);
    protected currentUser: IUser;
    protected readonly loading = signal(false);

    protected displayedColumns: string[] = [
        'id',
        'username',
        'roles',
        'action',
    ];

    protected readonly users = signal<IUser[]>([]);
    protected roles: Roles = [];

    constructor() {
        this.users.set([]);
        afterNextRender(() => {
            this.roleService.list().subscribe((res) => {
                if (res.status === 200) {
                    this.roles = res.data;
                }
            });
        });
    }


    private loadUsers(): void {
        this.loading.set(true);

        this.userService
            .list()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => {
                    this.loading.set(false);
                })
            )
            .subscribe({
                next: (res) => {
                    if (res.status === 200) {
                        this.users.set(res.data);
                    } else {
                        this.toast.error('获取用户失败');
                    }
                },
                error: () => {
                    this.toast.error('系统异常');
                },
            });
    }

    sortRoles(roles: Roles) {
        return roles.sort((a, b) => a.name.localeCompare(b.name));
    }

    public openCreateUserDialog() {
        const dialogRef = this.dialog.open(CreateUserComponent, {
            data: { roles: this.roles },
            width: '400px',
        });
        dialogRef
            .afterClosed()
            //.pipe(res => skip(res => res === undefined))
            .pipe(
                filter((res) => !!res),
                switchMap((res) =>
                    this.userService.createUser(
                        res.username,
                        res.password,
                        res.roles
                    )
                )
            )
            .subscribe((res) => {
                if (res.status === 200) {
                    this.toast.success('创建用户成功', {
                        duration: 10000,
                    });
                    this.loadUsers();
                } else {
                    this.toast.error('创建用户失败：' + res.error.message);
                }
            });
    }

    public openUpdateUserDialog(user: IUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dialogRef = this.dialog.open(UpdateUserComponent, {
            data: { roles: this.roles, user: { ...user } },
            width: '400px',
        });
    }

    public openDeleteUserDialog(id: string) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                title: '删除用户',
                description: '一旦删除用户将无法回复',
            },
        });
        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => !!res),
                switchMap(() => this.userService.delete(id))
            )
            .subscribe((res) => {
                if (res.status === 200) {
                    this.toast.success('删除用户成功');
                    this.loadUsers();
                } else {
                    this.toast.error('删除用户失败：' + res.error.message);
                }
            });
    }

    ngOnInit(): void {
        this.currentUser = this.settings.user as IUser;
        this.loadUsers();
        this.settings.user$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((u) => {
                this.currentUser = u as IUser;
            });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
