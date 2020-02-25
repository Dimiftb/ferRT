import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Socket } from 'ngx-socket-io';
import { AndroidPermissions } from '@ionic-native/android-permissions';

declare const faceapi: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, ///private socket: Socket,
     private androidPermissions: AndroidPermissions) {}

  video: HTMLVideoElement;
  detections: any;

  ionViewDidEnter() {
    this.log('ionViewDidEnter');
   // this.startWebcamStream();
}


startWebcamStream() {
  this.video = (document.querySelector('#video') as HTMLVideoElement);
  faceapi.nets.tinyFaceDetector.loadFromUri('assets/lib/models').then(() => {  
    navigator.mediaDevices.getUserMedia(
      {video: {width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 776, ideal: 720, max: 1080 },
      facingMode: "user"}}).then(stream => {
        this.video.srcObject = stream;
        setTimeout(() => {
            this.log('Face Detection launched.');
            this.detectFace();
        }, 5000);
      }).catch(err => {err => console.error(err)});
  });
}


detectFace() {
  const canvas = (document.querySelector('#_canvas') as HTMLCanvasElement);
  const mainDiv = document.querySelector('#main');
  mainDiv.appendChild(canvas);
  const displaySize = {width: this.video.width, height: this.video.height};
  // faceapi.matchDimensions(canvas, displaySize);
  setInterval(() => {
      const promise = new Promise((async (resolve, reject) => {
          this.detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions());
          resolve();
      }));
      promise.then(async () => {
          const resizedDetections = faceapi.resizeResults(this.detections, displaySize);

          if (typeof resizedDetections !== 'undefined') {
              canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
              faceapi.draw.drawDetections(canvas, resizedDetections);
             // this.resizeImage resizedDetections[0]._box.x, resizedDetections[0]._box.y,
                //  resizedDetections[0]._box.width, resizedDetections[0]._box.height);
                  // canvas.getContext('2d').fillText(data, resizedDetections[0]._box.x, resizedDetections[0]._box.y + 2);
          }
      }, err => {
          console.log(err);
      });
  }, 1000);
}

resizeImage(canvas, x, y, width, height) {
  const img = (document.querySelector('#img_canvas') as HTMLCanvasElement);
  const img1 = (document.querySelector('#img') as HTMLImageElement);
  const context = img.getContext('2d');
  img.width = width;
  img.height = height;
  context.drawImage(canvas, x, y, width, height, 0, 0, width, height);
  img1.src = img.toDataURL('image/jpeg');
}

sendPic(pic) {
  //this.socket.emit('image', pic);
}


recievePrediction() {

}


private log(s) {
  console.log('   >>>>>  tab2: ' + s + '  <<<<<   '); // comment out to turn off debug logging
}

}
