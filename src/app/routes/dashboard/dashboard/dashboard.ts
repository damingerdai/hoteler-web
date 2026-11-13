import { Component, computed, inject } from '@angular/core';
import { ApexOptions, NgxApexchartsModule } from 'ngx-apexcharts/signals';
import { CustomerData } from 'src/app/core/services/customers';
import { RoomData } from 'src/app/core/services/room';
import { Breadcrumb } from 'src/app/shared/components';
import { LoadingShade } from 'src/app/shared/components/loading-shade';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

type ApexOptionsResponse = ApexOptions & { show: boolean };

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss'],
    imports: [
        NgxApexchartsModule,
        MatCardModule,
        MatIconModule,
        LoadingShade,
        Breadcrumb,
    ],
})
export class Dashboard {
    private customerApi = inject(CustomerData);
    private roomApi = inject(RoomData);

    private roomResource = this.roomApi.getRoomStatusStatResource();
    private customerResource =
        this.customerApi.getPastWeekCustomerCountStatResource();

    protected loading = computed(
        () => this.roomResource.isLoading() || this.customerResource.isLoading()
    );

    protected roomStatusDonutChart = computed<ApexOptionsResponse>(() => {
        const baseOptions: ApexOptionsResponse = {
            show: false,
            chart: {
                type: 'donut',
                height: '300px',
            },
            title: {
                text: '房间状态统计',
            },
        };

        if (!this.roomResource.hasValue()) {
            return baseOptions;
        }
        const res = this.roomResource.value();
        if (res.status !== 200) {
            return baseOptions;
        }
        return {
            ...baseOptions,
            show: true,
            series: [res.data.inUseNums, res.data.notUsedNums],
            labels: ['占用', '空闲'],
        };
    });

    protected pastWeekCustomerCountChart = computed<ApexOptionsResponse>(() => {
        const baseOptions: ApexOptionsResponse = {
            show: false,
            chart: {
                type: 'line',
                height: '300px',
            },
            title: {
                text: '过去一周的入住客户数量变化',
            },
        };
        if (!this.customerResource.hasValue()) {
            return baseOptions;
        }
        const res = this.customerResource.value();
        if (res.status !== 200) {
            return baseOptions;
        }
        return {
            ...baseOptions,
            show: true,
            series: [
                {
                    name: '入住客户数量',
                    data: res.data.pastWeekCustomerCounts.map(
                        (v) => v.customerCount
                    ),
                },
            ],
            xaxis: {
                categories: res.data.pastWeekCustomerCounts.map(
                    (v) => v.checkInDate
                ),
            },
        };
    });
}
