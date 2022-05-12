import { AddAdoptionsComponent } from './component/add-adoptions/add-adoptions.component';
import { AdoptionComponent } from './component/adoption/adoption.component';
import { AddEventsComponent } from './component/add-events/add-events.component';
import { EventComponent } from './component/event/event.component';
import { AddPetsComponent } from './component/add-pets/add-pets.component';
import { PetComponent } from './component/pet/pet.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './component/admin/admin.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./component/login/login.component";
import { MainPageComponent } from "./component/main-page/main-page.component";

const routes: Routes = [
  { path: "home", component: MainPageComponent },
  { path: "", component: LoginComponent },
  { path: "register", component: SignUpComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "pets", component: PetComponent },
  { path: "events", component: EventComponent },
  { path: "add-pets", component: AddPetsComponent },
  { path: "add-events", component: AddEventsComponent },
  { path: "adoptions", component: AdoptionComponent },
  { path: "add-adoptions", component: AddAdoptionsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
