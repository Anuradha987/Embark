import { Pet } from './../../model/pet.model';
import { Customer } from './../../model/customer.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GenaralService } from './../../service/genaral.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from './../../service/admin.service';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  petForm: FormGroup;
  public customer: any;
  public pet: any;
  customers: Customer[];
  pets: Pet[];

  constructor(private adminService: AdminService, private http: HttpClient, private router: Router, private GenaralService: GenaralService) {
    this.petForm = this.petFormGroup();
  }

  petFormGroup() {
    return new FormGroup({
      id: new FormControl("", Validators.required),
      pet_image: new FormControl("", Validators.required),
      pet_name: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
      vaccinated: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      adopted: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.GenaralService.findAllPets().subscribe((data) => {
      this.pets = data;
    });

  }

  onSubmitUpdate() {
    let data = this.petForm.value;
    console.log(data)
    const getPets$ = this.http.put<Pet>("http://localhost:8083/pets/" + this.pet.id, data);
    getPets$.subscribe((data) => {
      console.log(data)
      swal.fire("Update Scueessful!", "Success", "info");
    });

  }

  DeletePets(id) {
    const deleteHos$ = this.http.delete("http://localhost:8083/pets/" + id);
    deleteHos$.subscribe((data) => {
      if (id = data) {
        swal.fire("Deletion Complete!", "Row has deleted", "info");
        location.reload();
      }
      else {
        swal.fire("Error!", "Try again!", "error");
        location.reload();
      }
      console.log(data);
    });
  }

  UpdateTodoPets(id) {
    //console.log(id)
    const getPdf$ = this.http.get("http://localhost:8083/pets/getPetById/" + id);
    getPdf$.subscribe((data) => {
      console.log(data[0])
      this.pet = data[0];
      console.log(data[0].id)
      this.petForm.controls["id"].setValue(this.pet.id);
      this.petForm.controls["pet_image"].setValue(this.pet.pet_image);
      this.petForm.controls["pet_name"].setValue(this.pet.pet_name);
      this.petForm.controls["gender"].setValue(this.pet.gender);
      this.petForm.controls["age"].setValue(this.pet.age);
      this.petForm.controls["description"].setValue(this.pet.description);
      this.petForm.controls["vaccinated"].setValue(this.pet.vaccinated);
      this.petForm.controls["adopted"].setValue(this.pet.adopted);
    });
  }

}
