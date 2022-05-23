import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GenaralService } from './service/genaral.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cart';
  isLogin: boolean;
  isLoginPage: boolean
  router: string;

  constructor(
    private globalService: GenaralService,
    private titleService: Title,
    private _router: Router
  ) {
    this.router = _router.url;
    this.titleService.setTitle("| Embark |");
  }



  ngOnInit() {
    this.globalService.sharedIsLogin.subscribe(isLogin => this.isLogin = isLogin);
    this.globalService.sharedisLoginPage.subscribe(isLoginPage => this.isLoginPage = isLoginPage);
  }
}
