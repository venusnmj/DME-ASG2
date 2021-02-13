import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HomePage } from '../home/home.page';
import * as $ from 'jquery';

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

//for API response
  
  userfirstname: string;
  userlastname: string;
  userid: string;
  useremail: string;
  userpassword: string;
  userconfirmPassword: string;

  launchHomePage(){
    this.connectToDB();
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

  connectToDB(){
    let userData = {
      userid: this.userid,
      useremail: this.useremail,
    }

    var obj, dbParam, xmlhttp, myObj, x, txt = "";

    obj = { "limit":1 };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        for (x in myObj) {
          if(myObj[x].userid == userData.userid){
            console.log("error: username exists already");
          event.stopPropagation();
          console.log(event.stopPropagation());
        }
          if(myObj[x].useremail == userData.useremail){
            console.log("error: email exists already");
            event.stopPropagation();
            console.log(event.stopPropagation());
        }
      }
        console.log(myObj);
      }
    };
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2.php?x=" + dbParam, true);
    xmlhttp.send();
  }


  async sendToDB(form: NgForm){
    const result = form.value;
    console.log(form.value);

    this.dataService.create(result).subscribe(response => console.log(response));


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

this.launchHomePage();
  }

}
