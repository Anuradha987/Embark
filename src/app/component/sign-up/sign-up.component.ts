import { Router } from '@angular/router';
import { GenaralService } from './../../service/genaral.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  contactForm: FormGroup;
  category: any[] = [];
  qualifications: any[] = [];
  selectQualifications: any[] = [];
  qualificationsId: number;
  isLogin: boolean;
  isLoginPage: boolean

  constructor(private globalService: GenaralService, private router: Router) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
    this.globalService.sharedIsLogin.subscribe((isLogin) => (this.isLogin = isLogin));
  }


  createFormGroup() {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      tel: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });
  }

  public onSubmit() {
    console.log("Hello")


    let data = this.contactForm.value;
    console.log(data.tel)
    let phone = data.tel;

    this.globalService.sendotp(phone).subscribe((dataOTPCheck) => {
      console.log(String(dataOTPCheck));

      if (dataOTPCheck == "Success") {
        let otp = prompt("What's your otp?");
        console.log(otp);

        this.globalService.verifyotp(phone, otp).subscribe((dataOTPVerify) => {
          console.log(dataOTPVerify);

          if (dataOTPVerify == "Success" || dataOTPCheck == "Success") {

            let UserData = this.contactForm.value;
            console.log(UserData)
            this.globalService.custermerRegister(UserData).subscribe((res) => {
              if (res) {
                swal.fire("Customer is register!", "success").then((result) => {
                  if (result.value) {
                    this.contactForm.reset();
                    this.router.navigate([""]);
                  }
                });
              } else {
                swal.fire("Register Error!", "This email already exists", "error");
              }
            });
          }

        });
      }
    });


  }
}
