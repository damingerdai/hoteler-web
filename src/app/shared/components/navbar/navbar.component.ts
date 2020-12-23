import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public get username() {
    return this.localStorage.get('user')?.username;
  }

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }


  ngOnInit(): void {

  }

  public logout() {
    this.localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
