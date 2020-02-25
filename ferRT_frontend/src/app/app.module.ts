import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { ImageFerPage } from '../pages/image-fer/image-fer';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { HTTP } from '@ionic-native/http/ngx';
//import { SocketIoModule } from 'ngx-socket-io';

//const config: SocketIoConfig = { url: 'http://0.0.0.0:5000', options: {} };
//https://floating-oasis-92405.herokuapp.com/

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ImageFerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,

    HomePage,
    TabsPage,
    ImageFerPage
  ],
  providers: [
    Camera,
    FileTransferObject,
    File,
    FileTransfer,
    StatusBar,
    SplashScreen,
    HTTP,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
