import { Component, OnInit } from '@angular/core';
import { Rooms } from 'src/app/core/models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public displayedColumns: string[] = ['no', 'roomname', 'status'];

  public rooms: Rooms;

  constructor(
    private roomApi: RoomService
  ) { }

  ngOnInit(): void {
    this.roomApi.list().subscribe(rooms => this.rooms = rooms);
  }



}
