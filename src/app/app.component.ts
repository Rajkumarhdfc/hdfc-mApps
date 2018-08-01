import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(private iab: InAppBrowser,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(()=>this.myHandlerFunction());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    myHandlerFunction(){

      var path = 'file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/04896128-2e2c-4950-a857-a220997957da/index.html';
  
      // path= path.split("//", 1)[1]
     console.log(path);
      const browser = this.iab.create(path, '_self');
    //   let toast = this.toastCtrl.create({
    //    message: "Press Again to Confirm Exit",
    //    duration: 3000
    //  });
  }
}
