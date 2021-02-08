import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
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

  constructor() { 
    this.loadWorker();
  }

  ngOnInit() {
    this.captureImage();
  }

  async loadWorker(){
    this.worker = createWorker({
      logger: progress => {
        console.log(progress);
        if (progress.status == 'recognizing text'){
          this.captureProgress = parseInt('' + progress.progress * 100);
        }
      }
    });
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('FIN');
    this.workerReady = true;
  }

  async captureImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    console.log('image:', image);
    this.image = image.dataUrl;
    this.captureProgress = 0;
    this.ocrResult = "";

    this.recognizeImage();
  }

  async recognizeImage(){
    const result = await this.worker.recognize(this.image);
    console.log(result);
    this.ocrResult = result.data.text;
  }

  async manualImage(){
    console.log('edit text'); //redirect to manual page
  }

  async confirmImage(){
    console.log('carplate no.:' + this.ocrResult); //result output
  }
}
