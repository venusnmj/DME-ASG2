import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  //getData: any;
  userData: any;
  serialData: any;
  userIdentity: string;

  // GET data before UPDATE


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('userparams:', params);
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

      this.userIdentity= this.userData.useremail;      
      console.log("userIdentity:" + this.userData.useremail);
      this.connectToDB(this.userIdentity);
    }
  }

  // Connect to DB: GET
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
          //txt += myObj[x].userid;

          document.getElementById("fnameTxt").innerHTML = myObj[x].userfirstname;
          document.getElementById("lnameTxt").innerHTML = myObj[x].userlastname;
          document.getElementById("nameTxt").innerHTML = myObj[x].userid;
          document.getElementById("emailTxt").innerHTML = myObj[x].useremail;
          document.getElementById("contactTxt").innerHTML = myObj[x].usercontactno;
          document.getElementById("passwordTxt").innerHTML = myObj[x].userpassword;

          // let getData = {
          //   olduserid: myObj[x].userid,
          //   olduseremail: myObj[x].useremail,
          //   oldusercontactno: myObj[x].usercontactno,
          //   olduserpassword: myObj[x].userpassword,
          // }
          // this.editID(getData);
        }
      }
        //document.getElementById("username").innerHTML = txt;
        console.log(myObj);
      }
    };
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/folder/am2.php" + dbParam, true);
    xmlhttp.send();
  }

  async editID() {
    let prompt = this.alertCtrl.create({
      header: 'Edit ID',
      message: "Enter your ID",
      inputs: [
        {
          name: 'ID',
          placeholder: 'Your ID',
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
            console.log('New ID: ' + data.ID);
            this.dataService.update(data.ID, this.userIdentity).subscribe(() =>{
              //response => console.log(response);              
              console.log("Updating:" + data.ID + ':' + this.userIdentity );
              data.email = this.userIdentity;
            });
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
            this.dataService.update(data.email, this.userIdentity).subscribe(() =>{
              //response => console.log(response);              
              console.log("Updating:" + data.email + ':' + this.userIdentity );
              data.email = this.userIdentity;
            });
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
