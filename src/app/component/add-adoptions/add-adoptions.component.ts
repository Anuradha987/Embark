import { Router } from '@angular/router';
import { GenaralService } from './../../service/genaral.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-add-adoptions',
  templateUrl: './add-adoptions.component.html',
  styleUrls: ['./add-adoptions.component.css']
})
export class AddAdoptionsComponent implements OnInit {

  adoptionRegisterForm: FormGroup;

  constructor(private globalService: GenaralService, private router: Router) {
    this.adoptionRegisterForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      pet_image: new FormControl("", Validators.required),
      pet_name: new FormControl("", Validators.required),
      owner: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    let oetDate = this.adoptionRegisterForm.value;
    console.log(oetDate)
    this.globalService.adoptionRegister(oetDate).subscribe((res) => {
      if (res) {
        swal.fire("Customer is register!", "success").then((result) => {
          if (result.value) {
            this.adoptionRegisterForm.reset();
            this.router.navigate(["add-adoptions"]);
          }
        });
      } else {
        swal.fire("Register Error!", "This email already exists", "error");
      }
    });
  }
}
