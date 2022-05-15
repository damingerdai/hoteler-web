import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleVisibilityIcon(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.hide = !this.hide;
  }


}
