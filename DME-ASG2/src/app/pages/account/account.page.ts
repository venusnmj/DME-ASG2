import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userData: any;
  serialData: any;
  userIdentity: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('params:', params);
      if (params && params.serial){
        this.serialData = [
          JSON.parse(params.serial),
        ]
      }
    })
  }

  launchHomePage(){
    let navigateExtras: NavigationExtras = {
      queryParams: {
        serial: JSON.stringify(this.serialData),
      }
    }
    this.router.navigate(['home/user'], navigateExtras);
  }

  ngOnInit() {
    if (this.route.snapshot.data['user']){
      this.userData = this.route.snapshot.data['user'];
      console.log(this.userData.email);

      this.userIdentity= this.userData.email;
      this.connectToDB(this.userIdentity);
    }
  }

  connectToDB(userIdentity: string){
    var obj, dbParam, xmlhttp, myObj, x, txt = "";

    obj = { "limit":1 };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        for (x in myObj) {
          if(myObj[x].useremail == userIdentity){
          txt += myObj[x].userid;
          document.getElementById("nameTxt").innerHTML = myObj[x].userid;
          document.getElementById("emailTxt").innerHTML = myObj[x].useremail;
          document.getElementById("contactTxt").innerHTML = myObj[x].usercontactno;
          document.getElementById("passwordTxt").innerHTML = myObj[x].userpassword;
        }
      }
        //document.getElementById("username").innerHTML = txt;
        console.log(myObj);
      }
    };
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/generateUV.php?x=" + dbParam, true);
    xmlhttp.send();
  }

  async editName() {
    let prompt = this.alertCtrl.create({
      header: 'Edit Name',
      message: "Enter your name",
      inputs: [
        {
          name: 'name',
          placeholder: 'Your Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('New name: ' + data.name);
          }
        }
      ]
    });
    (await prompt).present();
  }

  async editEmail() {
    let prompt = this.alertCtrl.create({
      header: 'Edit Email',
      message: "Enter your email",
      inputs: [
        {
          name: 'email',
          placeholder: 'Your Email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('New email: ' + data.email);
          }
        }
      ]
    });
    (await prompt).present();
  }

  async editContact() {
    let prompt = this.alertCtrl.create({
      header: 'Edit Contact Number',
      message: "Enter your contact number",
      inputs: [
        {
          name: 'contact',
          placeholder: 'Your Contact Number',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('New contact: ' + data.contact);
          }
        }
      ]
    });
    (await prompt).present();
  }

  async editPassword() {
    let prompt = this.alertCtrl.create({
      header: 'Edit Password',
      message: "Enter your new password",
      inputs: [
        {
          name: 'password',
          placeholder: 'Your New Password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('New password: ' + data.password);
          }
        }
      ]
    });
    (await prompt).present();
  }

}
