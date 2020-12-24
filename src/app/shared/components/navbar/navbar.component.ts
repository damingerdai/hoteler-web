import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isMobile: boolean;

  public get username() {
    return this.localStorage.get('user')?.username;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private localStorage: LocalStorageService,
    private router: Router,
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(
      result => {
        this.isMobile = result.matches;
      }
    );
  }


  ngOnInit(): void {

  }

  public logout() {
    this.localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
