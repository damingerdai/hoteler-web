import { Component, OnInit, afterNextRender, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';
import { BreadcrumbComponent, TagComponent } from 'src/app/shared/components';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
import { CreateUserComponent } from '../dialog/create-user/create-user.component';
import { RoleService } from 'src/app/core/services/role/role.service';
import { Roles } from 'src/app/core/models/roles';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbComponent,
        TagComponent,
        SharedMaterialModule,
        SharedPipesModule,
    ],
})
export class UserListComponent implements OnInit {
    protected dialog = inject(MatDialog);
    protected userService = inject(UserService);
    protected roleService = inject(RoleService);
    protected snackBar = inject(MatSnackBar);

    protected displayedColumns: string[] = [
        'id',
        'username',
        'roles',
        'action',
    ];

    protected users: IUser[] = [];
    protected roles: Roles = [];

    constructor() {
        this.users = [];
        afterNextRender(() => {
            this.roleService.list().subscribe((res) => {
                if (res.status === 200) {
                    this.roles = res.data;
                }
            });
        });
    }

    public openCreateUserDialog() {
        const dialogRef = this.dialog.open(CreateUserComponent, {
            data: { roles: this.roles },
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
                    this.snackBar.open('创建用户成功', 'X');
                    this.userService.list().subscribe((res) => {
                        if (res.status === 200) {
                            this.users = res.data;
                        }
                    });
                } else {
                    this.snackBar.open('创建用户失败：' + res.error.message);
                }
            });
    }

    ngOnInit(): void {
        this.userService.list().subscribe((res) => {
            if (res.status === 200) {
                this.users = res.data;
            }
        });
    }
}
