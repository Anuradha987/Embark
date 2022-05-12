import { NavbarService } from './../../service/navbar.service';
import { Component, OnInit } from '@angular/core';
import { GenaralService } from "../../service/genaral.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public itemCount: number;
  public isLogin: boolean;

  constructor(
    private service: GenaralService,
    private router: Router,
    public nav: NavbarService,
  ) { }

  ngOnInit() {
    this.service.sharedItemCount.subscribe(itemCount => this.itemCount = itemCount);
    // this.service.sharedIsLogin.subscribe(isLogin => this.isLogin = isLogin);
  }

  logOut() {
    this.service.currentIsLogin(false);
    this.service.currentItemCount(0);
    this.service.currentCart([]);
    this.router.navigate(['']);
  }

  AdminLogin() {
    this.router.navigate(['admin']);
  }

  onLogin() {
    this.service.currentIsLoginPage(true);
    this.router.navigate(['']);
  }

}
