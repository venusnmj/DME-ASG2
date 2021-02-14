import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HomePage } from '../home/home.page';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
    public toastCtrl:ToastController
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

//for API response
  
  userfirstname: string;
  userlastname: string;
  userid: string;
  useremail: string;
  userpassword: string;
  usercfmpassword: string;

  form = new FormGroup({
    userfirstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userlastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    userid: new FormControl('', [Validators.required, Validators.minLength(3)]),
    useremail: new FormControl('bad@cat.com', Validators.email),
    userpassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    usercfmpassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  launchHomePage(){
    //this.connectToDB();
    //this.sendToDB(form: NgForm);

    // let navigateExtras: NavigationExtras = {
    //   queryParams: {
    //     special: 'what'
    //   }
    // }
    // this.router.navigate(['home'], navigateExtras);

    let userData = {
      userfirstname: this.userfirstname,
      userlastname: this.userlastname,
      userid: this.userid,
      useremail: this.useremail,
      userpassword: this.userpassword,
    }

    this.dataService.setData('user', userData);
    // this.router.navigateByUrl('/home/user');
    this.router.navigateByUrl('/slider');

    console.log("form submitted:" + 
    userData.userfirstname + 
    userData.userlastname +
    userData.userid +
    userData.useremail +
    userData.userpassword);
  }

  // connectToDB(){
  //   let userData = {
  //     userid: this.userid,
  //     useremail: this.useremail,
  //   }

  //   var obj, dbParam, xmlhttp, myObj, x, txt = "";

  //   obj = { "limit":1 };
  //   dbParam = JSON.stringify(obj);
  //   xmlhttp = new XMLHttpRequest();

  //   xmlhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {
  //       myObj = JSON.parse(this.responseText);
  //       for (x in myObj) {
  //         if(myObj[x].userid == userData.userid){
  //           console.log("error: username exists already");
  //           this.showErrorToast("Error: username already exists");
  //         event.stopPropagation();
  //         console.log(event.stopPropagation());
  //       }
  //         if(myObj[x].useremail == userData.useremail){
  //           console.log("error: email exists already");
  //           this.showErrorToast("Error: email already exists");
  //           event.stopPropagation();
  //           console.log(event.stopPropagation());
  //       }
  //     }
  //       console.log(myObj);
  //     }
  //   };
  //   xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am.php?x=" + dbParam, true);
  //   xmlhttp.send();
  // }


  sendToDB(form: NgForm){
    const result = form.value;
    console.log(form.value);

  //   this.dataService.getCheck(this.userid).subscribe(response => {
  //     if(response != null){  
        this.dataService.create(result).subscribe(response => {
        console.log(response);        
        this.showToast('Registered successfully');
        this.launchHomePage();
        });

  //     }else{
  //       this.showErrorToast('userid already taken');
  //     }
  // })

    // this.dataService.vcreate(result).subscribe(response => console.log(response));


//   $.ajax({  
//     url: 'https://student.amphibistudio.sg/10187403A/folder/am2.php?x=',  
//     type: 'POST',  
//     dataType: 'json',  
//     data: result,
//     success: function (data, textStatus, xhr) {  
//         console.log(data);  
//     },  
//     error: function (xhr, textStatus, errorThrown) {  
//         console.log('Error in Operation');  
//     }  
// });  

  }

}
