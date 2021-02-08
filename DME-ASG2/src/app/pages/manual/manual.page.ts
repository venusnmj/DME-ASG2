import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('init');
  }

  carplate: string;

  submitForm(){
    console.log("Submitting");
    console.log(this.carplate);
  }  
}
