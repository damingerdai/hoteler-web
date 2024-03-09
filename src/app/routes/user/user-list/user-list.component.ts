import { Component, OnInit, afterNextRender, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';
import { PageHeaderComponent } from 'src/app/shared/components';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
import { CreateUserComponent } from '../dialog/create-user/create-user.component';
import { RoleService } from 'src/app/core/services/role/role.service';
import { Roles } from 'src/app/core/models/roles';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    standalone: true,
    imports: [PageHeaderComponent, SharedMaterialModule, SharedPipesModule],
})
export class UserListComponent implements OnInit {
    protected dialog = inject(MatDialog);
    protected userService = inject(UserService);
    protected roleService = inject(RoleService);

    protected displayedColumns: string[] = ['id', 'username', 'roles'];

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
            .subscribe(() => console.log('close create user dialog'));
    }

    ngOnInit(): void {
        this.userService.list().subscribe((res) => {
            if (res.status === 200) {
                this.users = res.data;
            }
        });
    }
}
