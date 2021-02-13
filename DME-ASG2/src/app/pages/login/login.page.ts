import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  userid: string;
  useremail: string;
  userpassword: string;
  
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  launchHomePage(){
    // let navigateExtras: NavigationExtras = {
    //   queryParams: {
    //     email: JSON.stringify(this.email),
    //     password: JSON.stringify(this.password)
    //   }
    // }
    // this.router.navigate(['home'], navigateExtras);

    let userData = {
      userid: this.userid,
      useremail: this.useremail,
      userpassword: this.userpassword,
    }

    this.dataService.setData('user', userData);
    this.router.navigateByUrl('/home/user');

    console.log("form submitted:" + 
    userData.useremail +
    userData.userpassword)
  }

}
