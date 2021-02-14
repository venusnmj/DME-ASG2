import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
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
    private dataService: DataService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async showErrorToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
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

  connectToDB(){
    let userData = {
      userid: this.userid,
      useremail: this.useremail,
      userpassword: this.userpassword,
    }

    var obj, dbParam, xmlhttp, myObj, x, txt = "";

    obj = { "limit":1 };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        for (x in myObj) {
        if(myObj[x].userid == userData.userid && myObj[x].userpassword == userData.userpassword){
          console.log("logging in");
        }
      }
        console.log(myObj);
      }
    };

    if (userData.userid != userData.userid || userData.userpassword != userData.userpassword){
      this.showErrorToast('Wrong userid/ password');
      return false;
    }else{
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2.php?x=" + dbParam, false);
    xmlhttp.send();
    this.showErrorToast('Logged in');
    this.launchHomePage();
    }
  }

}
