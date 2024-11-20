import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApexOptions, NgxApexchartsModule } from 'ngx-apexcharts';
import { CustomerService } from 'src/app/core/services/customers';
import { RoomService } from 'src/app/core/services/room';
import { CustomerCheckinRecordService } from 'src/app/core/services/customer-checkin-record';
import { BreadcrumbComponent } from 'src/app/shared/components';
import { LoadingShadeComponent } from 'src/app/shared/components/loading-shade';
import { MatCardModule } from '@angular/material/card';

type ApexOptions2 = ApexOptions & { show: boolean };

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
        NgxApexchartsModule,
        MatCardModule,
        LoadingShadeComponent,
        BreadcrumbComponent,
    ]
})
export class DashboardComponent implements OnInit {
    protected loading = false;

    private customerApi: CustomerService = inject(CustomerService);
    private customerCheckinRecordApi: CustomerCheckinRecordService = inject(
        CustomerCheckinRecordService
    );
    private roomApi: RoomService = inject(RoomService);
    private dialog = inject(MatDialog);

    public roomStatusDonutChart: ApexOptions2 = {
        show: false,
        chart: {
            type: 'donut',
            height: '300px'
        },
        title: {
            text: '房间状态统计',
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
                        },
                    },
                },
            },
        },
    };

    public pastWeekCustomerCountChart: ApexOptions2 = {
        show: false,
        chart: {
            type: 'line',
             height: '300px'
        },
        title: {
            text: '过去一周的入住客户数量变化',
        },
    };

    constructor() {}

    ngOnInit(): void {
        this.loading = true;
        this.roomApi.getRoomStatusStat().subscribe((res) => {
            this.loading = false;
            if (res.status === 200) {
                this.roomStatusDonutChart.show = true;
                this.roomStatusDonutChart.series = [
                    res.data.inUseNums,
                    res.data.notUsedNums,
                ];
                this.roomStatusDonutChart.labels = ['占用', '空闲'];
            }
        });

        this.customerApi.getPastWeekCustomerCountStat().subscribe((res) => {
            this.loading = false;
            if (res.status === 200) {
                this.pastWeekCustomerCountChart.show = true;
                this.pastWeekCustomerCountChart.series = [
                    {
                        name: '入住客户数量',
                        data: res.data.pastWeekCustomerCounts.map(
                            (v) => v.customerCount
                        ),
                    },
                ];
                this.pastWeekCustomerCountChart.xaxis = {
                    categories: res.data.pastWeekCustomerCounts.map(
                        (v) => v.checkInDate
                    ),
                };
            }
        });
    }
}
