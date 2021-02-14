import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  userData: any;
  serialData: any;
  userIdentity: string;
  buttonDisabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { 
  }

  ngOnInit() {
    if (this.route.snapshot.data['user']){
      this.userData = this.route.snapshot.data['user'];

      this.userIdentity= this.userData.userid;
      console.log("userIdentity: " + this.userIdentity);

      this.connectToDB(this.userIdentity);
    }
    // if (this.route.snapshot.data['serial']){
    //   this.serialData = this.route.snapshot.data['serial'];
    //   console.log(this.serialData);
    // }
  }

  ionViewDidEnter(){
    if (document.getElementById("vehicleid").innerHTML = ""){
      this.buttonDisabled = true;
    }else{
    this.buttonDisabled = true;
    }
    document.getElementById("locationid").innerHTML = "";
    document.getElementById("parkingid").innerHTML = "";

    console.log("reload");
    this.connectToDB(this.userIdentity);
    this.connectToVDB();
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
          if(myObj[x].userid == userIdentity){
            document.getElementById("username").innerHTML = myObj[x].userid;
            document.getElementById("vehicleid").innerHTML = myObj[x].carid;
            //console.log("derived:" + myObj[x].userid);
        }
      }
        console.log(myObj);
      }
    };
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am.php?x=" + dbParam, true);
    xmlhttp.send();

    this.connectToVDB();
  }

  connectToVDB(){
    var obj, dbParam, xmlhttp, myObj, x, txt = "";

    obj = { "limit":1 };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        for (x in myObj) {
          if(myObj[x].vehicleid == document.getElementById("vehicleid").innerHTML){
            document.getElementById("locationid").innerHTML = myObj[x].carparkname;
            document.getElementById("parkingid").innerHTML = "Lot: " + myObj[x].lotzone + ",  " + myObj[x].parkinglotid;
            //console.log("derived:" + myObj[x].userid);
        }
      }
        console.log(myObj);
      }
    };
    xmlhttp.open("GET", "https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/generatePC.php?x=" + dbParam, true);
    xmlhttp.send();
    
    if (document.getElementById("vehicleid").innerHTML = ""){
      this.buttonDisabled = true;
    }else{
      this.buttonDisabled = false;
    }
  }

  checkOut(){
    const result = {"carid":""};
    console.log(result);

    console.log("id:" + this.userIdentity);
    this.dataService.vpdate(result, this.userIdentity).subscribe(() => {
    });
    document.getElementById("vehicleid").innerHTML = "";
    document.getElementById("locationid").innerHTML = "";
    document.getElementById("parkingid").innerHTML = "";

    this.buttonDisabled = true;
  }
}
  
