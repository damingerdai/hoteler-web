import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  afterNextRender,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';
import {
  BreadcrumbComponent,
  ConfirmComponent,
  TagComponent,
} from 'src/app/shared/components';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
import { CreateUserComponent, UpdateUserComponent } from '../dialog';
import { RoleService } from 'src/app/core/services/role/role.service';
import { Roles } from 'src/app/core/models/roles';
import { Subscription, filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { ToasterService } from 'angular-toaster';

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
export class UserListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  protected dialog = inject(MatDialog);
  protected userService = inject(UserService);
  protected roleService = inject(RoleService);
  protected snackBar = inject(MatSnackBar);
  protected settings = inject(SettingsService);
  protected destroyRef = inject(DestroyRef);
  protected toasterService = inject(ToasterService);
  protected currentUser: IUser;
  protected loading: boolean = false;

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

  private loadUsers() {
    this.loading = true;
    this.userService.list().subscribe(
      (res) => {
        this.loading = false;
        if (res.status === 200) {
          this.users = res.data;
        } else {
          this.snackBar.open('获取用户失败', 'X');
        }
      },
      (_err) => {
        this.snackBar.open('系统异常');
        this.loading = false;
      }
    );
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
          // this.snackBar.open('创建用户成功', 'X');
          this.toasterService.pop({
            type: 'success',
            title: '创建成功',
            body: '创建用户成功',
            timeout: 10000
          });
          this.loadUsers();
        } else {
          this.snackBar.open('创建用户失败：' + res.error.message);
        }
      });
  }

  public openUpdateUserDialog(user: IUser) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: { roles: this.roles, user: {...user} },
      width: '400px',
    });
    // dialogRef
      // .afterClosed()
      // //.pipe(res => skip(res => res === undefined))
      // .pipe(
      //   filter((res) => !!res),
      //   switchMap((res) =>
      //     this.userService.createUser(
      //       res.username,
      //       res.password,
      //       res.roles
      //     )
      //   )
      // )
      // .subscribe((res) => {
      //   if (res.status === 200) {
      //     // this.snackBar.open('创建用户成功', 'X');
      //     this.toasterService.pop({
      //       type: 'success',
      //       title: '创建成功',
      //       body: '创建用户成功',
      //       timeout: 10000
      //     });
      //     this.loadUsers();
      //   } else {
      //     this.snackBar.open('创建用户失败：' + res.error.message);
      //   }
      // });
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
          this.snackBar.open('删除用户成功', 'X');
          this.loadUsers();
        } else {
          this.snackBar.open('删除用户失败：' + res.error.message);
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
