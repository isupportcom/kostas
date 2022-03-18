import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './components/login/guards/auth.guard';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  isopen = true;

  postData:{
    "service": "login",
    "username": "useralex",
    "password": "02041992",
    "appId": "3001"
}

constructor(private auth: AuthService, private router: Router){}
  ngOnInit(){
    this.auth.setAuthanticate(false);
    this.router.navigate(['/sign-in']);
  }
  
}

