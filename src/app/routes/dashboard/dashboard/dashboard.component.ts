import {
    Component,
    OnInit,
    inject,
    signal,
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApexOptions, NgxApexchartsModule } from 'ngx-apexcharts/signals';
import { CustomerService } from 'src/app/core/services/customers';
import { RoomService } from 'src/app/core/services/room';
import { BreadcrumbComponent } from 'src/app/shared/components';
import { LoadingShadeComponent } from 'src/app/shared/components/loading-shade';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

type ApexOptions2 = ApexOptions & { show: boolean };

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [
        NgxApexchartsModule,
        MatCardModule,
        MatIconModule,
        LoadingShadeComponent,
        BreadcrumbComponent,
    ],
})
export class DashboardComponent implements OnInit {
    protected loading = signal(false);

    protected roomStatusDonutChart = signal<ApexOptions2>({
        show: false,
        chart: {
            type: 'donut',
            height: '300px',
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
    });

    protected pastWeekCustomerCountChart = signal<ApexOptions2>({
        show: false,
        chart: {
            type: 'line',
            height: '300px',
        },
        title: {
            text: '过去一周的入住客户数量变化',
        },
    });

    private customerApi: CustomerService = inject(CustomerService);

    private roomApi: RoomService = inject(RoomService);


    ngOnInit(): void {
        this.loading.set(true);

        forkJoin({
            room: this.roomApi.getRoomStatusStat(),
            customer: this.customerApi.getPastWeekCustomerCountStat(),
        }).subscribe({
            next: ({ room, customer }) => {
                if (room.status === 200) {
                    this.roomStatusDonutChart.update((chart) => ({
                        ...chart,
                        show: true,
                        series: [
                            room.data.inUseNums,
                            room.data.notUsedNums,
                        ],
                        labels: ['占用', '空闲'],
                    }));
                }

                if (customer.status === 200) {
                    this.pastWeekCustomerCountChart.update((chart) => ({
                        ...chart,
                        show: true,
                        series: [
                            {
                                name: '入住客户数量',
                                data: customer.data.pastWeekCustomerCounts.map(
                                    (v) => v.customerCount
                                ),
                            },
                        ],
                        xaxis: {
                            categories: customer.data.pastWeekCustomerCounts.map(
                                (v) => v.checkInDate
                            ),
                        },
                    }));
                }
            },
            error: () => {
                this.loading.set(false);
            },
            complete: () => {
                this.loading.set(false);
            },
        });
    }
}
