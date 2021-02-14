import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DataService } from 'src/app/services/data.service';
import { createWorker } from 'tesseract.js';
const { Camera } = Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  worker: Tesseract.Worker;
  workerReady = false;
  image: string;
  ocrResult = '';
  captureProgress = 0;

  userData: any;
  userIdentity: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) { 
    this.loadWorker();
  }

  ngOnInit() {
    if (this.route.snapshot.data['user']){
      this.userData = this.route.snapshot.data['user'];

      //this.userIdentity= this.userData.useremail;
      this.userIdentity= this.userData.userid;
      console.log("userIdentity: " + this.userIdentity);
    }
    
    this.captureImage();
  }

  async loadWorker(){
    this.worker = createWorker({
      logger: progress => {
        //console.log(progress);
        if (progress.status == 'recognizing text'){
          this.captureProgress = parseInt('' + progress.progress * 100);
        }
      }
    });
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('READY');
    this.workerReady = true;
  }

  async captureImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    //console.log('image:', image);
    this.image = image.dataUrl;
    this.captureProgress = 0;
    this.ocrResult = "";

    this.recognizeImage();
  }

  async recognizeImage(){
    const results = await this.worker.recognize(this.image);
    //console.log(result);
    this.ocrResult = results.data.text;
  }

  async confirmImage(){
    console.log('carplate no.:' + JSON.stringify(this.ocrResult)); //result output

    var ocr = JSON.stringify(this.ocrResult);
    this.sendImage(ocr);
  }

  sendImage(ocr){
    //console.log("Submitting Carplate:" + this.carplate);
    const result = {"carid":ocr};
    //console.log(JSON.parse(this.ocrResult));
    console.log("id:" + this.userIdentity);
    this.dataService.vpdate(result, this.userIdentity).subscribe(() => {
    });

    this.router.navigateByUrl('/home/user');
  }
}
