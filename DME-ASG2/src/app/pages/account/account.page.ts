import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
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
    private toastCtrl: ToastController
  ) {
    // this.route.queryParams.subscribe(params => {
    //   console.log('userparams:', params);
    //   if (params && params.serial){
    //     this.serialData = [
    //       JSON.parse(params.serial),
    //     ]
    //   }
    // })
  }

  // launchHomePage(){
  //   let navigateExtras: NavigationExtras = {
  //     queryParams: {
  //       serial: JSON.stringify(this.serialData),
  //     }
  //   }
  //   this.router.navigate(['home/user'], navigateExtras);
  // }

  ngOnInit() {
    if (this.route.snapshot.data['user']){
      this.userData = this.route.snapshot.data['user'];

      this.userIdentity= this.userData.userid;      
      console.log("userIdentity:" + this.userData.userid);

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
          if(myObj[x].userid == userIdentity){
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
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am.php?x=" + dbParam, true);
    xmlhttp.send();
  }

  logout(){
    this.router.navigateByUrl('/login');
    this.showToast("Logged out");
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
            // this.dataService.update(data.ID, this.userIdentity).subscribe(() =>{
            //   //response => console.log(response);              
            //   console.log("Updating:" + data.ID + ':' + this.userIdentity );
            //   data.email = this.userIdentity;
            // });
                //console.log("Submitting Carplate:" + this.carplate);
          }
        }
      ]
    });
    (await prompt).present();
  }

  async editFirstName() {
    let prompt = this.alertCtrl.create({
      header: 'Edit First Name',
      message: "Enter your First Name",
      inputs: [
        {
          name: 'firstname',
          placeholder: 'Your First Name',
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
            if(data.firstname != null && data.firstname.length > 2){
            console.log('Saved clicked');
            console.log('New firstname: ' + data.firstname);
            document.getElementById("fnameTxt").innerHTML = data.firstname;

            var data = data.firstname;
            const result = {"userfirstname":data};
            console.log(result);
            this.dataService.updateUserfirstname(result, this.userIdentity).subscribe(() => {
            });
            this.showToast('Saved');
          }else{
            this.showErrorToast('Invalid entry');
            return false;
          }
          }
        }
      ]
    });
    (await prompt).present();
  }

  async editLastName() {
    let prompt = this.alertCtrl.create({
      header: 'Edit Last Name',
      message: "Enter your Last Name",
      inputs: [
        {
          name: 'lastname',
          placeholder: 'Your Last Name',
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
            if(data.lastname != null && data.lastname.length > 2){
            console.log('Saved clicked');
            console.log('New lastname: ' + data.lastname);
            document.getElementById("lnameTxt").innerHTML = data.lastname;

            var data = data.lastname;
            const result = {"userlastname":data};
            console.log(result);
            this.dataService.updateUserlastname(result, this.userIdentity).subscribe(() => {
            });
            this.showToast('Saved');
          }else{
            this.showErrorToast('Invalid entry');
            return false;
          }
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
            if(data.email != null && data.email.length > 2){  
            console.log('Saved clicked');
            console.log('New email: ' + data.email);
            document.getElementById("emailTxt").innerHTML = data.email;

            var data = data.email;
            const result = {"useremail":data};
            console.log(result);
            this.dataService.updateUseremail(result, this.userIdentity).subscribe(() => {
            });
            this.showToast('Saved');
            }else{
              this.showErrorToast('Invalid email');
              return false;
            }
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
            if(data.contact != null && data.contact.length > 2){
            console.log('Saved clicked');
            console.log('New contact: ' + data.contact);
            document.getElementById("contactTxt").innerHTML = data.contact;

            var data = data.contact;
            const result = {"usercontactno":data};
            console.log(result);
            this.dataService.updateUsercontactno(result, this.userIdentity).subscribe(() => {
            });
            this.showToast('Saved');
          }else{
            this.showErrorToast('Invalid contact number');
            return false;
          }
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
            if(data.password != null && data.password.length > 2){
            console.log('Saved clicked');
            console.log('New password: ' + data.password);
            document.getElementById("passwordTxt").innerHTML = data.password;

            var data = data.password;
            const result = {"userpassword":data};
            console.log(result);
            this.dataService.updateUserpassword(result, this.userIdentity).subscribe(() => {
            });
            this.showToast('Saved');
          }else{
            this.showErrorToast('Invalid password');
            return false;
          }
          }
        }
      ]
    });
    (await prompt).present();
  }

}
