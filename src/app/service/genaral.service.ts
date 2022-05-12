import { Adoption } from './../model/adoption.model';
import { Event } from './../model/event.model';
import { Pet } from './../model/pet.model';
import { Customer } from './../model/customer.model';
import { Item } from './../model/item.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { environment } from "./../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class GenaralService {
  private itemCount = new BehaviorSubject(0);
  sharedItemCount = this.itemCount.asObservable();

  private cart = new BehaviorSubject([]);
  sharedCart = this.cart.asObservable();

  private userData = new BehaviorSubject([]);
  shareduserData = this.userData.asObservable();

  private isLogin = new BehaviorSubject(false);
  sharedIsLogin = this.isLogin.asObservable();

  private isLoginPage = new BehaviorSubject(false);
  sharedisLoginPage = this.isLoginPage.asObservable();

  constructor(private http: HttpClient) { }

  currentItemCount(item: number) {
    this.itemCount.next(item);
  }

  currentCart(data: any) {
    this.cart.next(data);
  }

  currentUserData(data: any) {
    this.userData.next(data);
  }

  currentIsLogin(data: boolean) {
    this.isLogin.next(data);
  }

  currentIsLoginPage(data: boolean) {
    this.isLoginPage.next(data);
  }

  custermerRegister(data) {
    let url = "http://localhost:9797/customers";
    return this.http.post(url, data).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }


  sendotp(phone: any) {
    let baseUrl = 'http://localhost:8080/sendotp/'
    return this.http.get(baseUrl + phone, { responseType: "text" as "json" }).pipe(
      tap((resp) => {
        return String(resp);
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }




  verifyotp(phone, otp) {
    let baseUrl = 'http://localhost:8080/verifyotp/'
    return this.http.get("http://localhost:8080/verifyotp/" + phone + "/" + otp, { responseType: "text" as "json" }).pipe(
      tap((resp) => {
        return resp;
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }


  custermerFeedback(data) {
    let url = "http://localhost:9792/feedbacks";
    return this.http.post(url, data).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }

  // private baseUrl = 'http://localhost:8080/sendotp/';
  // getEmployee(phone): Observable<Object> {
  //   return this.http.get(`${this.baseUrl}/${phone}`);
  // }

  // getEmployee(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }






  login(data) {
    let data1 = [];
    let email = data.email;
    let password = data.password;

    let url = "http://localhost:9797/login";
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
          if (resp["status"]) {
            console.log(resp);
            data1["stutas"] = true;
            data1["user"] = {
              name: resp["name"],
              id: resp["id"],
              tel: resp["tel"],
            };
            this.userData.next(data1["user"]);
            this.isLogin.next(true);
            environment.isLogin = true;
            return data1;
          }
        }),
        catchError((error) => {
          return error.statusText;
        })
      );
  }

  getCategory() {
    let data1 = [];
    let url = "http://localhost:9090/categories";
    return this.http.get(url).pipe(
      tap((resp) => {
        return resp;
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }

  getAllIteam() {
    let url = "http://localhost:9191/items";
    return this.http.get(url).pipe(
      tap((resp) => {
        console.log(resp);
        return resp;
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }

  getSelectItem(id) {
    return this.http.get("http://localhost:9191/items/" + id).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }

  setOrderDetailes(data) {
    let url = "http://localhost:9394/shippings";
    let orderItem;
    let userData;
    this.sharedCart.subscribe((res) => (orderItem = res));
    this.shareduserData.subscribe((res) => (userData = res));

    console.log(userData);

    let cart = {
      customer: userData.name,
      address: data.address,
      tel: data.tel,
      quantity: orderItem.length,
      price: data.ttotalPrice,
    };
    console.log(cart);
    return this.http.post(url, cart).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }
  public saveItems(Item: Item) {
    let feedbacksUrl = "http://localhost:9191/items";
    return this.http.post<Item>(feedbacksUrl, Item);
  }
  public deleteByProductId(id: any) {
    let deletebyIdUrl = "http://localhost:9191/items/";
    return this.http.delete(deletebyIdUrl + id);
  }

  public deleteByBranchId(id: any) {
    let deletebyIdUrl = "http://localhost:9596/branches/";
    return this.http.delete(deletebyIdUrl + id);
  }


  public findAllCustomers(): Observable<Customer[]> {
    let getAllCars = "http://localhost:9797/customers";
    return this.http.get<Customer[]>(getAllCars);
  }

  public findAllItems(): Observable<Item[]> {
    let getAllCars = "http://localhost:9191/items";
    return this.http.get<Item[]>(getAllCars);
  }


  getPopularItems() {
    let url = "http://localhost:9191/randoms";
    return this.http.get(url).pipe(
      tap((resp) => {
        console.log(resp);
        return resp;
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }

  sendMoney(name, amount) {
    return this.http.get("http://localhost:7875/accounts/increment/" + name + "/" + amount).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }
  // -----------------------------------------
  public findAllPets(): Observable<Pet[]> {
    let getAllPets = "http://localhost:8083/pets";
    return this.http.get<Pet[]>(getAllPets);
  }

  petRegister(data) {
    console.log(data.age)
    let url = "http://localhost:8083/pets";
    return this.http.post(url, data).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }
  // -------------------------------------------
  public findAllEvents(): Observable<Event[]> {
    let getAllEvents = "http://localhost:8082/events";
    return this.http.get<Event[]>(getAllEvents);
  }

  eventRegister(data) {
    console.log(data)
    let url = "http://localhost:8082/events";
    return this.http.post(url, data).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }

  // -------------------------------------------
  public findAllAdoptions(): Observable<Adoption[]> {
    let getAllAdoptions = "http://localhost:8081/adoptions";
    return this.http.get<Adoption[]>(getAllAdoptions);
  }

  adoptionRegister(data) {
    console.log(data.age)
    let url = "http://localhost:8081/adoptions";
    return this.http.post(url, data).pipe(
      tap((resp) => {
        if (resp) {
          return resp;
        }
      }),
      catchError((error) => {
        return error.statusText;
      })
    );
  }

}


