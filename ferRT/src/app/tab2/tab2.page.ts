import {Component} from '@angular/core';
import { Socket } from 'ngx-socket-io';

declare const faceapi: any;

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

    constructor(private socket: Socket) {}

    video: HTMLVideoElement;
    detections: any;

    ionViewDidEnter() {
        this.log('ionViewDidEnter');
        this.setupSocket();
        //this.startWebcamStream();
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
        // faceapi.matchDimensions(canvas, displaySize);
        setInterval(() => {
            const promise = new Promise((async (resolve, reject) => {
                this.detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions());
                resolve();
            }));
            promise.then(async () => {
                const resizedDetections = faceapi.resizeResults(this.detections, displaySize);

                if (typeof resizedDetections !== 'undefined') {
                    console.log('drawing');
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    this.socket.fromEvent('prediction').subscribe( predClass => {
                        canvas.getContext('2d').fillText(predClass, resizedDetections[0]._box.x, resizedDetections[0]._box.y + 2,
                            resizedDetections[0]._box.width);
                    });
                    /*const pythonProcess = spawn('python', ['assets/lib/python_scripts/main.py', this.resizeImage(canvas,
                        resizedDetections[0]._box.x, resizedDetections[0]._box.y,
                        resizedDetections[0]._box.width, resizedDetections[0]._box.height)]);
                    pythonProcess.stdout.on('data', data => {
                        canvas.getContext('2d').fillText(data, resizedDetections[0]._box.x, resizedDetections[0]._box.y + 2);
                    });*/
                }
            }, err => {
                console.log(err);
            });
        }, 100);
     }



    resizeImage(canvas, x, y, width, height) {
        const img = (document.querySelector('_canvas') as HTMLCanvasElement);
        const context = img.getContext('2d');
        img.width = width;
        img.height = height;
        context.drawImage(canvas, x, y, width, height, 0, 0, width, height);
        return img.toDataURL('image/jpeg');
    }

    setupSocket() {
        this.socket.connect();
        this.socket.on('connect', () => {
            this.socket.emit('setup-message', 'Front-end connected!!');
        });
    }


    private log(s) {
       // console.log('   >>>>>  tab2: ' + s + '  <<<<<   '); // comment out to turn off debug logging
    }
}

// this.resizeImage(canvas, resizedDetections[0]._box.x, resizedDetections[0]._box.y, resizedDetections[0]._box._width, resizedDetections[0]._box._height);
