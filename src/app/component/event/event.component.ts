import { GenaralService } from './../../service/genaral.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Event } from './../../model/event.model';
import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventForm: FormGroup;
  public event: any;
  events: Event[];

  constructor(private http: HttpClient, private router: Router, private GenaralService: GenaralService) {
    this.eventForm = this.eventFormGroup();
  }

  eventFormGroup() {
    return new FormGroup({
      id: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      time: new FormControl("", Validators.required),
      tp: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.GenaralService.findAllEvents().subscribe((data) => {
      this.events = data;
    });

  }

  onSubmitUpdate() {
    let data = this.eventForm.value;
    console.log(data)
    const getPets$ = this.http.put<Event>("http://localhost:8082/events/" + this.event.id, data);
    getPets$.subscribe((data) => {
      console.log(data)
      swal.fire("Update Scueessful!", "Success", "info");
    });

  }

  DeleteEvents(id) {
    const deleteHos$ = this.http.delete("http://localhost:8082/events/" + id);
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

  UpdateTodoEvents(id) {
    //console.log(id)
    const getPdf$ = this.http.get("http://localhost:8082/events/getEventById/" + id);
    getPdf$.subscribe((data) => {
      console.log(data[0])
      this.event = data[0];
      console.log(data[0].id)
      this.eventForm.controls["id"].setValue(this.event.id);
      this.eventForm.controls["name"].setValue(this.event.name);
      this.eventForm.controls["description"].setValue(this.event.description);
      this.eventForm.controls["date"].setValue(this.event.date);
      this.eventForm.controls["time"].setValue(this.event.time);
      this.eventForm.controls["tp"].setValue(this.event.tp);
      this.eventForm.controls["location"].setValue(this.event.location);
    });
  }

}
