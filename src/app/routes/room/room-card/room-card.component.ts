import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IRoom } from 'src/app/core/models';
import { CurrencyPipe, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { TagComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-room-card',
    templateUrl: './room-card.component.html',
    styleUrl: './room-card.component.scss',
    imports: [
        NgClass,
        CurrencyPipe,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        TagComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class RoomCardComponent {
    @Input({ required: true }) public room!: IRoom;
    @Input({ required: true }) public imageIndex!: number;

    @Output() public checkIn = new EventEmitter<IRoom>();
    @Output() public update = new EventEmitter<IRoom>();
    @Output() public delete = new EventEmitter<string | number>();

    public get statusClass(): string {
        return this.room?.status === 1 ? 'status-vacant' : 'status-occupied';
    }

    public get statusText(): string {
        return this.room?.status === 1 ? '空闲' : '占用';
    }

    public get statusTagColor(): 'primary' | 'secondary' | 'tertiary' | 'error' {
        return this.room?.status === 1 ? 'primary' : 'secondary';
    }

    public get imageUrl(): string {
        return `https://picsum.photos/400/300?random=${this.imageIndex}`;
    }

    public onCheckIn(): void {
        if (this.room.status === 1) {
            this.checkIn.emit(this.room);
        }
    }

    public onUpdate(): void {
        this.update.emit(this.room);
    }

    public onDelete(): void {
        if (this.room.id !== undefined) {
            this.delete.emit(this.room.id);
        }
    }
}
