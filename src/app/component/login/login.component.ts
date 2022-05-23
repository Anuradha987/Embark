import { NavbarService } from './../../service/navbar.service';
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GenaralService } from "../../service/genaral.service";
import swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  Phone: any[];

  constructor(private globalService: GenaralService, private router: Router, public nav: NavbarService) {
    this.loginForm = this.loginFormGroup();
  }

  ngOnInit() {
    this.nav.hide();
    this.globalService.currentIsLoginPage(true);
  }

  loginFormGroup() {
    return new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  public onSubmit() {
    console.log(this.loginForm);
    let data = {
      email: this.loginForm.get("email").value,
      password: this.loginForm.get("password").value,
    };


    this.globalService.login(data).subscribe((serverResp) => {
      console.log(serverResp);
      if (serverResp["status"] == "true") {
        console.log(serverResp["status"]);
        this.globalService.currentIsLogin(true);
        this.globalService.currentIsLoginPage(false);
        this.globalService.currentUserData(data)
        let phone = serverResp["tel"]




        // this.globalService.sendotp(phone).subscribe((data) => {
        //   console.log(String(data));


        //   if (data == "Success") {
        //     let otp = prompt("What's your otp?");
        //     console.log(otp);

        //     this.globalService.verifyotp(phone, otp).subscribe((dataOtp) => {
        //       console.log(dataOtp);

        //       if (dataOtp == "Success" || data == "Success") {
        this.router.navigate(["pets"]);
        //       }

        //     });
        //   }
        // });








        // if (sign.toLowerCase() == "scorpio") {
        //   this.router.navigate(["home"]);
        // }
        // console.log(serverResp["tel"]);
        // console.log("Success!!!");
      } else {
        swal.fire(
          "Login Error!",
          "Please check user name and password!",
          "error"
        );
        location.reload();
        // this.router.navigate(["home"]);
      }
    });
  }

  isShown: boolean = false; // hidden by default


  toggleShow() {

    this.isShown = !this.isShown;

  }
}
