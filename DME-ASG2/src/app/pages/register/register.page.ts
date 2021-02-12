import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  submitForm(){
    console.log("Submitting");
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPassword);
  }  

  launchHomePage(){
    // let navigateExtras: NavigationExtras = {
    //   queryParams: {
    //     special: 'what'
    //   }
    // }
    // this.router.navigate(['home'], navigateExtras);

    let userData = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password,
    }

    this.dataService.setData('user', userData);
    // this.router.navigateByUrl('/home/user');

    console.log(userData.firstname);
    console.log(userData.lastname);
    console.log(userData.username);
    console.log(userData.email);
    console.log(userData.password);
  }
}
