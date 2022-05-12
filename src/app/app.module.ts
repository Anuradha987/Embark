import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { PetComponent } from './component/pet/pet.component';
import { AddPetsComponent } from './component/add-pets/add-pets.component';
import { EventComponent } from './component/event/event.component';
import { AddEventsComponent } from './component/add-events/add-events.component';
import { AdoptionComponent } from './component/adoption/adoption.component';
import { AddAdoptionsComponent } from './component/add-adoptions/add-adoptions.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainPageComponent,
    LoginComponent,
    AdminComponent,
    AdminDashboardComponent,
    AboutUsComponent,
    SignUpComponent,
    PetComponent,
    AddPetsComponent,
    EventComponent,
    AddEventsComponent,
    AdoptionComponent,
    AddAdoptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
