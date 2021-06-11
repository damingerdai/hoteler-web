import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApexOptions } from 'ng-apexcharts';
import { filter, switchMap } from 'rxjs/operators';
import { RoomService } from 'src/app/core/services/room';
import { UserRoomService } from 'src/app/core/services/user-room';
import { AddUserRoomComponent } from '../dialog/add-user-room/add-user-room.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chart = { type: 'line' };

  public roomStatusDonutChart: ApexOptions & { show: boolean } = {
    show: false,
    chart: {
      type: 'donut',
    },
    title: {
      text: '房间状态统计'
    },
    series: [44, 55, 13, 33],
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
            }
          }
        }
      }
    }
  }

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
    private roomApi: RoomService
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
    this.roomApi.getRoomStatusStat().subscribe(res => {
      if (res.status ===  200) {
        this.roomStatusDonutChart.show = true;
        this.roomStatusDonutChart.series = [res.data.inUseNums, res.data.notUsedNums];
        this.roomStatusDonutChart.labels = ['占用', '空闲'];
      }
    })
  }

}
