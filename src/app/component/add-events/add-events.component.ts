import { Router } from '@angular/router';
import { GenaralService } from './../../service/genaral.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {
  eventRegisterForm: FormGroup;

  constructor(private globalService: GenaralService, private router: Router) {
    this.eventRegisterForm = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      time: new FormControl("", Validators.required),
      tp: new FormControl("", Validators.required),
      vaccinated: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    let oetDate = this.eventRegisterForm.value;
    console.log(oetDate)
    this.globalService.eventRegister(oetDate).subscribe((res) => {
      if (res) {
        swal.fire("Customer is register!", "success").then((result) => {
          if (result.value) {
            this.eventRegisterForm.reset();
            this.router.navigate(["/events"]);
          }
        });
      } else {
        swal.fire("Register Error!", "This email already exists", "error");
      }
    });
  }
}
