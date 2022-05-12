import { FormGroup } from '@angular/forms';
import { NavbarService } from './../../service/navbar.service';
import { Router } from '@angular/router';
import { GenaralService } from './../../service/genaral.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  shareForm: FormGroup;
  isLogin: boolean;

  constructor(private globalService: GenaralService, private router: Router, public nav: NavbarService) {
  }

  ngOnInit() {
    this.nav.show();
    this.globalService.sharedIsLogin.subscribe((isLogin) => (this.isLogin = isLogin));

    if (!this.isLogin) {
      this.router.navigate([""]);

    }
  }
}
