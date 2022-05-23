import { NavbarService } from './../../service/navbar.service';
import { AdminService } from './../../service/admin.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loginForm: FormGroup;
  feedBack = "";
  email = "";
  password = "";
  invalidLogin = false;
  message: String;

  constructor(private router: Router, private adminService: AdminService, public nav: NavbarService) {
    this.loginForm = this.loginFormGroup();
  }

  ngOnInit(): void { this.nav.hide(); }
  loginFormGroup() {
    return new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }
  public onSubmit() {
    console.log(this.loginForm);
    this.email = this.loginForm.get("email").value;
    this.password = this.loginForm.get("password").value;
    console.log(this.email, this.password);
    this.adminService
      .login(this.email, this.password)
      .subscribe((serverResp) => {
        console.log(serverResp);

        if (serverResp["status"] == "true") {
          console.log(serverResp["status"]);
          let sts = serverResp["status"];
          sessionStorage.setItem("loggedAdminId", serverResp["id"]);
          sessionStorage.setItem("loggedAdminName", serverResp["name"]);
          sessionStorage.setItem("loggedAdminAddress", serverResp["address"]);
          sessionStorage.setItem("loggedAdminEmail", serverResp["email"]);
          this.router.navigate(["pets"]);
        } else {

          swal.fire(
            "Login Error!",
            "Please check user name and password!",
            "error"
          );

          //      this.router.navigate(["admin-dashboard"]);
        }
      });
  }
}
