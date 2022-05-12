import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Admin } from './../model/admin.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminsUrl: string;
  httpOptions: any;

  rStatus: String;

  constructor(private http: HttpClient) {
    this.adminsUrl = "http://localhost:9292/admins/1";
    headers: new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
  }

  public findAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.adminsUrl);
  }

  public save(Admin: Admin) {
    return this.http.post<Admin>(this.adminsUrl, Admin);
  }

  //Login API Part

  login(email: string, password: string) {
    console.log("login method works!");
    let url = "http://localhost:9292/adminlogin";
    console.log(email, password);
    return this.http
      .post(
        url,
        {},
        {
          params: {
            email,
            password,
          },
        }
      )
      .pipe(
        tap((resp) => {
          console.log(resp);
          this.rStatus = resp["message"];
        }),
        catchError((error) => {
          return error.statusText;
        })
      );
  }
}
