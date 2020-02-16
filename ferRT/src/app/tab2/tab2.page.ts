import {Component} from '@angular/core';


declare const faceapi: any;

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

    constructor() {}

    video: HTMLVideoElement;
    detections: any;

    ionViewDidEnter() {
        this.log('ionViewDidEnter');
        this.startWebcamStream();
    }

    startWebcamStream() {
        this.video = (document.querySelector('#video') as HTMLVideoElement);
        faceapi.nets.tinyFaceDetector.loadFromUri('assets/lib/models').then(() => {
            navigator.getUserMedia(
                {video: {}},
                stream => {
                    this.video.srcObject = stream;
                    setTimeout(() => {
                        this.log('Face Detection launched.');
                        this.detectFace();
                    }, 5000);
                },
                err => console.error(err)
            );
        });
    }

     detectFace() {
        const canvas = (document.querySelector('#_canvas') as HTMLCanvasElement);
        const mainDiv = document.querySelector('#main');
        mainDiv.appendChild(canvas);
        const displaySize = {width: this.video.width, height: this.video.height};
        //faceapi.matchDimensions(canvas, displaySize);
        setInterval(() => {
            const promise = new Promise((async (resolve, reject) => {
                this.detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
                resolve();
            }));
            promise.then(async () => {
                const resizedDetections = faceapi.resizeResults(this.detections, displaySize);
                console.log(resizedDetections[0]);
                if (typeof resizedDetections !== 'undefined') {
                    console.log('drawing');
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                }
            }, err => {
                console.log(err);
            });
        }, 100);
     }



    resizeImage(canvas, x, y, width, height) {
        const _canvas = (document.querySelector('_canvas') as HTMLCanvasElement);
        const context = _canvas.getContext('2d');
        _canvas.width = width;
        _canvas.height = height;
        context.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    }

    private log(s) {
       // console.log('   >>>>>  tab2: ' + s + '  <<<<<   '); // comment out to turn off debug logging
    }
}

// this.resizeImage(canvas, resizedDetections[0]._box.x, resizedDetections[0]._box.y, resizedDetections[0]._box._width, resizedDetections[0]._box._height);
