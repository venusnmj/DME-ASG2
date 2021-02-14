import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
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
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  async showToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
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

  form = new FormGroup({
    userid: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ]),
    userpassword: new FormControl('', [
      Validators.required, Validators.minLength(3)
    ]),
  });
  
  connectToDB(){
    let userData = {
      userid: this.userid,
      useremail: this.useremail,
      userpassword: this.userpassword,
    }

    // var obj, dbParam, xmlhttp, myObj, x, txt = "";

    // obj = { "limit":1 };
    // dbParam = JSON.stringify(obj);
    // xmlhttp = new XMLHttpRequest();

    // xmlhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //     myObj = JSON.parse(this.responseText);
    //     for (x in myObj) {
    //     if(myObj[x].userid == userData.userid && myObj[x].userpassword == userData.userpassword){
    //       console.log("logging in");
    //     }
    //   }
    //     console.log(myObj);
    //   }
    // };

    this.dataService.get(userData.userid, userData.userpassword).subscribe(response => {
        if(response != null){  
        this.showToast('Logged in');
          console.log('link:' + 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2.php?userid=' + userData.userid + '&userpassword=' + userData.userpassword)
          this.launchHomePage();
        }else{
          this.showErrorToast('Wrong userid/ password');
        }
    })
  }

}
