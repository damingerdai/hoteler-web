import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs/operators';
import { UserRoomService } from 'src/app/core/services/user-room';
import { AddUserRoomComponent } from '../dialog/add-user-room/add-user-room.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chart = { type: 'line'};

  public series = [{
    name: 'sales',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }];

  public title = {
    text: 'Test'
  };

  constructor(
    public dialog: MatDialog,
    private userRoomApi: UserRoomService,
  ) { }

  openAddUserRoomDialog() {
    const dialogRef = this.dialog.open(AddUserRoomComponent);
    dialogRef.afterClosed()
      .pipe(
        filter(res => !!res),
        switchMap(ur => this.userRoomApi.create(ur))
      ).subscribe(res => {
        if (res.status === 200) {
          console.log('test');
        }
      });
  }

  ngOnInit(): void {
  }

}
