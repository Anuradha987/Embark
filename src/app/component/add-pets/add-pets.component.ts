import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenaralService } from './../../service/genaral.service';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-add-pets',
  templateUrl: './add-pets.component.html',
  styleUrls: ['./add-pets.component.css']
})
export class AddPetsComponent implements OnInit {
  petRegisterForm: FormGroup;

  constructor(private globalService: GenaralService, private router: Router) {
    this.petRegisterForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      pet_image: new FormControl("", Validators.required),
      pet_name: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      vaccinated: new FormControl("", Validators.required),
      adopted: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    let oetDate = this.petRegisterForm.value;
    console.log(oetDate)
    this.globalService.petRegister(oetDate).subscribe((res) => {
      if (res) {
        swal.fire("Customer is register!", "success").then((result) => {
          if (result.value) {
            this.petRegisterForm.reset();
            this.router.navigate([""]);
          }
        });
      } else {
        swal.fire("Register Error!", "This email already exists", "error");
      }
    });
  }
}
