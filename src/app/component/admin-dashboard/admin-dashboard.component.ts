import { Customer } from './../../model/customer.model';
import { GenaralService } from './../../service/genaral.service';
import { Item } from './../../model/item.model';
import { Router } from '@angular/router';
import { Admin } from './../../model/admin.model';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  admins: Admin[];
  AdminDisplayName = "";
  AdminDisplayAddress = "";
  AdminDisplayId = "";
  AdminDisplayEmail = "";
  jstoday = "";
  today = new Date();
  customers: Customer[];
  Items: Item[];


  items: Item[];

  constructor(private adminService: AdminService, private router: Router, private GenaralService: GenaralService) {
  }

  ngOnInit(): void {

    this.GenaralService.findAllCustomers().subscribe((data) => {
      this.customers = data;
    });

    this.GenaralService.findAllItems().subscribe((data) => {
      this.Items = data;
    });

    this.adminService.findAll().subscribe((data) => {
      this.admins = data;
    });

    this.AdminDisplayName = sessionStorage.getItem("loggedAdminName");
    this.AdminDisplayAddress = sessionStorage.getItem("loggedAdminAddress");
    this.AdminDisplayId = sessionStorage.getItem("loggedAdminId");
    this.AdminDisplayEmail = sessionStorage.getItem("loggedAdminEmail");
    this.jstoday = formatDate(this.today, "hh:mm:ss a", "en-US", "+0530");
  }

  ManageItems() {
    this.router.navigate(['products-manage']);
  }

}
