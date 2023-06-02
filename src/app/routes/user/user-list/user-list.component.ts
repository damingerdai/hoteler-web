import { Component, OnInit, inject } from '@angular/core';
import { IUser } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  protected userService = inject(UserService);

  protected displayedColumns: string[] = ['id', 'username', 'roles'];

  protected users: IUser[] = [];

  constructor() {
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.list().subscribe((res) => {
      if (res.status === 200) {
        this.users = res.data;
      }
    });
  }
}
