import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Pro } from '@ionic/pro';
import {  Injectable, Injector } from '@angular/core';

// source added from previuos version


import { HttpClient, HttpClientModule } from '@angular/common/http';


import { Camera } from '@ionic-native/camera';


import { IonicStorageModule, Storage } from '@ionic/storage';


import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';

//import { OtpPage } from './../pages/otp/otp';



/* My Project */



import {LocalStorageModule} from 'angular-2-local-storage';


import {StorageProvider} from '../providers/storage/storage';
import {confirm_Alert_Provider} from '../providers/alertController/alertController';

import { DeviceProvider } from '../providers/device/device';
import {AuthProvider} from '../providers/auth/auth';
import {ApiProvider} from '../providers/api/api';
import {ToastProvider} from '../providers/toast/toast';
import {TransformProvider} from '../providers/xmltojson/xmltojson';
import {LoaderProvider} from "../providers/loader/loader";

import { FileSize }    from '../providers/bytestosize/bytestosize';

// import { Settings, User } from '../providers';

import { GeolocProvider } from '../providers/geoloc/geoloc';
import { NetworkInfoProvider } from '../providers/network-info/network-info';


/* My Project End */




 
Pro.init('040d0d97', {
  appVersion: '0.0.1'
})


@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {

    var user_id="RAJKUMAR";
    var application_pack="crm"
    Pro.monitoring.handleNewError(user_id+' '+application_pack+' '+err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    LocalStorageModule.withConfig({
      prefix: 'hdfc-mobile-app1',
      storageType: 'localStorage'
  }), 
  IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
 
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StorageProvider,SQLite,NativeStorage,GeolocProvider,
    NetworkInfoProvider,
    ,AuthProvider,
    DeviceProvider,
    ApiProvider,LoaderProvider,
    ToastProvider,TransformProvider,
    FileSize,
    confirm_Alert_Provider,
    StatusBar,Device,Geolocation,Network,
    StatusBar,Camera,
    SplashScreen,InAppBrowser,
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }]
  ]
})
export class AppModule {}
