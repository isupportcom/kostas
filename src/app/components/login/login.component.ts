import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { AuthService } from 'src/app/services/auth.service';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name:string
  storage:any;
  spinerVisible = false
  private token:string= "N0Fh3HYzQ28OT0CT1Ka6BgMQg7Zro6Zl0HWHYL1r8CxabUbMV72TjkcPdXX"
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) // public store:Store
  {}

  ngOnInit(): void {}

  error: string;
  data: any;


  login(form: NgForm) {
    this.spinerVisible = true
    if (!form.valid) {
      return;
    }
    else{

    const afm = form.value.username;
    const code = form.value.password;
    axios({
      method: 'GET',
      url: 'http://localhost:4000/',
      headers: { 'Content-Type': 'aplication/json;charaset=windows-1253'},
      params: {
        username: afm,
        password: code,
        token: this.token
      },
    }).then((resData: any) => {
        const totacount = resData.data.totalcount
        if(totacount!=0){
          this.name = resData.data.rows[0].NAME
          this.auth.setAuthanticate(true)
          this.auth.setcustomer(this.name)
          this.spinerVisible = false
          this.router.navigate(['']);
        }
        else{
          this.spinerVisible = false
          this.error = "Invalid Credentials"
          form.reset();
        }
        });



    }
  }

  _customers: Customer[];

  get customers() {
    this.auth
      .getcustomers()
      .subscribe((customers) => (this._customers = customers));
    return this._customers;
  }

  guest() {
    // this.auth.login('guest@guest.gr', '1234567890').subscribe((resData) => {
      this.auth.setAuthanticate(true);
      this.auth.setcustomer("Guest")
    //   this.auth.setcustomer(resData.email);
      this.router.navigate(['']);
   // });
  }
}
