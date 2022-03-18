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
    console.log("mphke")
    if (!form.valid) {
      return;
    }
    else{
    console.log("mphke")
    const afm = form.value.username;
    const code = form.value.password;
    // axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCAwJM_nkRWgPvXmhBqWfdLI4qdCXyoAsE',{
    //   service: "SqlData",
    // clientID:"9J8pH7KbDqDXJsn4S5HG9JT4HLLOLKLCKN1oJLX5HrLpG694Ocn3J2KsC2KtGrH6TanLNrTKS4PqRMDDG71ZLoKrHL5bLbznLKLo9JL3KqmbDqL9H5HKILPLH2KtH6HDSN1Z9JL2Gq16LYKrHLL4NrLLGqGbDqHOKazPOLLLH7H2GqDGK4jMP4LL9JOmHLLHJoKrH410JtHZL2KtGaXrLKGbDqHdLoKrHM5IG4TeGK9CJ7LLUKrXHKDeSa9PKNLQUMHKKLHLH0" ,
    // appId: "3001",
    // SqlName: "AFM-KOD",
    // param1: afm,
    // param2: code
    // }).then(resData=>{
    //   console.log('hello')
    // })

    axios({
      method: 'GET',
      url: 'http://localhost:4000/',
      headers: { 'Content-Type': 'aplication/json;charaset=windows-1253'},
      params: { username: afm, password: code },
    }).then((resData: any) => {
        console.log(resData)
        const success = resData.data.success
        if(success){
          this.name = resData.data.rows[0].NAME
          this.auth.setAuthanticate(true)
          this.auth.setcustomer(this.name)
          this.router.navigate(['']);
        }
        });


    form.reset();
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
