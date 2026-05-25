import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomer } from 'src/app/core/models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { TagComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-customer-card',
    templateUrl: './customer-card.component.html',
    styleUrl: './customer-card.component.scss',
    imports: [
        NgClass,
        UpperCasePipe,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        TagComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CustomerCardComponent {
    @Input({ required: true }) public customer!: ICustomer;

    @Output() public update = new EventEmitter<ICustomer>();
    @Output() public delete = new EventEmitter<number | string>();

    public get nameInitial(): string {
        return this.customer?.name ? this.customer.name.charAt(0) : '';
    }

    public get genderClass(): string {
        if (this.customer?.gender === 'M') {
            return 'gender-male';
        } else if (this.customer?.gender === 'F') {
            return 'gender-female';
        }
        return 'gender-unknown';
    }

    public get genderText(): string {
        if (this.customer?.gender === 'M') return '男';
        if (this.customer?.gender === 'F') return '女';
        return '未知性别';
    }

    public get genderTagColor(): 'primary' | 'secondary' | 'tertiary' | 'error' {
        if (this.customer?.gender === 'M') return 'primary';
        if (this.customer?.gender === 'F') return 'tertiary';
        return 'error';
    }

    public processPhone(): string {
        if (!this.customer?.phone) return '';
        return this.customer.phone
            .toString(10)
            .replace(
                /^(\d{4})(\d*)(\d{4})$/,
                (a, b, c, d) => b + c.replace(/\d/g, '*') + d
            );
    }

    public processCardId(): string {
        if (!this.customer?.cardId) return '';
        return this.customer.cardId.replace(
            /^(\d{4})(\d*)((\dX{4})|(\d{3}X))$/,
            (a, b, c, d) => b + c.replace(/\d/g, '*') + d
        );
    }

    public onUpdate(): void {
        this.update.emit(this.customer);
    }

    public onDelete(): void {
        if (this.customer.id !== undefined) {
            this.delete.emit(this.customer.id);
        }
    }
}
