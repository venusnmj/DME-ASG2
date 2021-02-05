import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  name: string;
  email: string;
  password: string;
  confirmPassword: string;

  submitForm(){
    console.log("Submitting");
    console.log(this.name);
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPassword);
  }  
}
