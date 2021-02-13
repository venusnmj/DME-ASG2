import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  carplate: string;
  userData: any;
  serialData: any;
  userIdentity: string;

  ngOnInit() {
    if (this.route.snapshot.data['user']){
      this.userData = this.route.snapshot.data['user'];

      //this.userIdentity= this.userData.useremail;
      this.userIdentity= this.userData.userid;
      console.log("userIdentity: " + this.userIdentity);
    }
  }

  submitForm(form: NgForm){
    //console.log("Submitting Carplate:" + this.carplate);
    const result = form.value;
    console.log(form.value);
    console.log("id:" + this.userIdentity);
    this.dataService.vpdate(result, this.userIdentity).subscribe(() => {
      //console.log(result.userid + ':' + this.userIdentity);
      //response => console.log(response);
    });
    
    // let navigateExtras: NavigationExtras = {
    //   queryParams: {
    //     serial: JSON.stringify(this.carplate),
    //   }
    // }
    // this.router.navigate(['home/user'], navigateExtras);
    this.router.navigateByUrl('/home/user');
    }
}
