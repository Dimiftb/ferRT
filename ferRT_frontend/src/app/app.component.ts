import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { AndroidPermissions } from '@ionic-native/android-permissions'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.requestPermission();
    });
    }
    requestPermission() {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(permission =>{
        console.log("Has permission: " + permission)
        this.presentToast("Has permission: " + permission)
      }, err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA));
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  
}
