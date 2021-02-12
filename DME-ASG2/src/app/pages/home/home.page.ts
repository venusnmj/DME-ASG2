import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  userData: any;
  serialData: any;
  userIdentity: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.queryParams.subscribe(params => {
      console.log('params:', params);
      if (params && params.serial){
        this.serialData = JSON.parse(params.serial)
      }
    })
  }

  launchAccountPage(){
    let navigateExtras: NavigationExtras = {
      queryParams: {
        serial: JSON.stringify(this.serialData),
      }
    }
    this.router.navigate(['account/user'], navigateExtras);
  }

  ngOnInit() {
    if (this.route.snapshot.data['user']){
      this.userData = this.route.snapshot.data['user'];
      console.log("userData:" + this.userData.email);

      this.userIdentity= this.userData.email;
      this.connectToDB(this.userIdentity);
    }
    // if (this.route.snapshot.data['serial']){
    //   this.serialData = this.route.snapshot.data['serial'];
    //   console.log(this.serialData);
    // }
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
          txt = myObj[x].userid;
        }
      }
        document.getElementById("username").innerHTML = txt;
        console.log(myObj);
      }
    };
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/generateUV.php?x=" + dbParam, true);
    xmlhttp.send();
  }

}
  
