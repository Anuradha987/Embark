import { GenaralService } from './../../service/genaral.service';
import { Router } from '@angular/router';
import { Adoption } from './../../model/adoption.model';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {
  adoptionForm: FormGroup;
  public adoption: any;
  adoptions: Adoption[];

  constructor(private http: HttpClient, private router: Router, private GenaralService: GenaralService) {
    this.adoptionForm = this.adoptionFormGroup();
  }

  adoptionFormGroup() {
    return new FormGroup({
      id: new FormControl("", Validators.required),
      pet_image: new FormControl("", Validators.required),
      pet_name: new FormControl("", Validators.required),
      owner: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.GenaralService.findAllAdoptions().subscribe((data) => {
      console.log(data)
      this.adoptions = data;
      console.log(this.adoptions)
    });

  }

  onSubmitUpdate() {
    let data = this.adoptionForm.value;
    console.log(data)
    const getPets$ = this.http.put<Event>("http://localhost:8081/adoptions/" + this.adoption.id, data);
    getPets$.subscribe((data) => {
      console.log(data)
      swal.fire("Update Scueessful!", "Success", "info");
    });
    location.reload()
  }

  DeleteAdoptions(id) {
    const deleteHos$ = this.http.delete("http://localhost:8081/adoptions/" + id);
    deleteHos$.subscribe((data) => {
      if (id = data) {
        swal.fire("Deletion Complete!", "Row has deleted", "warning");
        location.reload();
      }
      else {
        swal.fire("Error!", "Try again!", "error");
        location.reload();
      }
      console.log(data);
    });
  }

  UpdateTodoAdoptions(id) {
    //console.log(id)
    const getPdf$ = this.http.get("http://localhost:8081/adoptions/getAdoptionById/" + id);
    getPdf$.subscribe((data) => {
      console.log(data[0])
      this.adoption = data[0];
      console.log(data[0].id)
      this.adoptionForm.controls["id"].setValue(this.adoption.id);
      this.adoptionForm.controls["pet_image"].setValue(this.adoption.pet_image);
      this.adoptionForm.controls["pet_name"].setValue(this.adoption.pet_name);
      this.adoptionForm.controls["owner"].setValue(this.adoption.owner);
      this.adoptionForm.controls["date"].setValue(this.adoption.date);
    });
  }
}
