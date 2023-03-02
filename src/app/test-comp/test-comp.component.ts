import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent {

  data :any;
  error:any;

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) {}

  login(){
    this.loginService.login("usuário","senha").subscribe({
      next: (data)=> {  this.data = data},
      error: (err)=> {  this.error = err },
      complete:()=> { console.log('complete') }
    });
  }

}
