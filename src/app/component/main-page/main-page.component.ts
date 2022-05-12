import { NavbarService } from './../../service/navbar.service';
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { GenaralService } from "../../service/genaral.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
})
export class MainPageComponent implements OnInit {
  items: any = [];
  itemsRandoms: any = [];
  cartItem: any = [];
  clickBtn: any = [];
  isLogin: boolean;
  categoryType: any = [];


  constructor(private service: GenaralService, private router: Router, public nav: NavbarService) { }



  ngOnInit() {
    this.nav.show();
    this.service.sharedIsLogin.subscribe((isLogin) => (this.isLogin = isLogin));

    if (!this.isLogin) {
      this.router.navigate([""]);
    }

    this.service.getCategory().subscribe((res) => {
      this.categoryType = res;
    });

    this.service.getAllIteam().subscribe((res) => {
      this.items = res;
    });

    this.service.getPopularItems().subscribe((res) => {
      this.itemsRandoms = res;
    });
  }

  addCart(item, i) {
    item["count"] = 1;
    this.cartItem.push(item);
    this.clickBtn.push(i);
    this.service.currentItemCount(this.cartItem.length);
    this.service.currentCart(this.cartItem);
  }

  getIteam(type) {
    this.service.getSelectItem(type).subscribe((res) => {
      console.log(res);
      this.items = [];
      this.items = res;
    });
  }
}
