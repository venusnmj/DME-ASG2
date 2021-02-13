import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
  }

  carplate: string;

  submitForm(){
    console.log("Submitting Carplate:" + this.carplate);
    
    let navigateExtras: NavigationExtras = {
      queryParams: {
        serial: JSON.stringify(this.carplate),
      }
    }
    this.router.navigate(['home/user'], navigateExtras);

    // this.dataService.setData('serial', serialData);
    // this.router.navigateByUrl('/home/user/serial');
    }
}
