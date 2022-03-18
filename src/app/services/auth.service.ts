import { Injectable } from '@angular/core';
import { Customer, User } from '../models/customer.model';
import { Customers } from '../data/customer.data';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

  export interface  ResponseData {
  kind: string;
  idToken: string;
  email:string;
  refreshToken: string;
  expiresin: string;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _customer: Customer;
  private customerList: Customer[] = Customers;
  private loggedInStatus: boolean = false;
  _user = new Subject<User>();

  constructor(private http: HttpClient) { }



  ngOnInit(){

  }


  setLoggedIn(value: boolean): void {
    console.log(value);
    this.loggedInStatus = value;
  }

  get isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  getCustomerDetails(username: string, password: string): Customer {
    this._customer = this.customerList.find(customer => customer.username.toLowerCase() === username.toLowerCase()
      && customer.password === password);
    if (!!this._customer) {
      delete this._customer.password;
    }
    return this._customer;

    /**** This function works with api. Not with hardcoded data ****
    return this.http.post<ResponseData>(this.url,
      {
        username,
        password
      })
      */
  }

  name: string;
  setcustomer(name: string){
    this.name = name;
  }
_customersList:Observable< Customer[]>;
  getcustomers():Observable< Customer[]>{
     this._customersList = of(Customers);
     return this._customersList;
  }

  get customer(): Customer {
    // return this._customer;
    return {
      "id": 1,
      "username": this.name,
      "password": '',
      "timol_pol": {
        "id": 2101,
        "name": '21-01',
        // Discount percentage
        "discount": 10
      }
    }
  }
  //Auth variables
  idToken: string;
  isAuth = false;
  response: ResponseData;

  login(email: string, password: string){
    return this.http.post<ResponseData>('https://pca.oncloud.gr/s1services',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    // .pipe(catchError(this.handledError), tap(resData =>{
    //  this.handledAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresin)
    // }));
  }

  // private handledAuthentication(email: string, localId: string, token: string, expiresin: number){
  //   const expirationDate = new Date(new Date().getTime() + +expiresin * 1000);
  //   const user = new User(email, localId, token, expirationDate );
  //   this._user.next(user);
  // }

  private handledError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not correct';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

  setAuthanticate(value: boolean){
    this.isAuth = value;
  }

  get isAuthanticate(){
    return this.isAuth;
  }

  // get user() {
  //   // return this._customer;
  //   return {
  //     "service": "login",
  //     "username": "useralex",
  //     "password": "02041992",
  //     "appId": "3001"
  // }
  // }


  body = {
    service: "login",
    username: "useralex",
    password: "02041992",
    appId: "3001"
   }

baseurl = 'https://pca.oncloud.gr/s1services';

apicall(){
return this.http.post(this.baseurl,this.body);
}

api2call(token: string){
return this.http.post(this.baseurl,{
service: "authenticate",
clientID:token ,
company: "1001",
branch: "1000",
module: "0",
refid: "1"
}
);
}

api3call(token: string,afm: string, code: string){
return this.http.post(this.baseurl,{
    service: "SqlData",
    clientID: token,
    appId: "3001",
    SqlName: "AFM-KOD",
    param1: afm,
    param2: code
}
);
}
}
