import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,Renderer} from '@angular/core';
import { IonicApp,IonicErrorHandler,IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { RestProvider } from '../providers/rest/rest';
import { DbProvider } from '../providers/db/db';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { LacInfoPage } from '../pages/lac-info/lac-info';
import { AcDetailsPage } from '../pages/ac-details/ac-details';
import { AddetailsPage } from '../pages/addetails/addetails';
import { LacDetails_ListPage } from '../pages/lac-details - list/lac-details - list';
import { RemarkPage } from '../pages/remark/remark';
import { TransPage } from '../pages/trans/trans';
import { CommnPage } from '../pages/commn/commn';
import { Firebase } from '@ionic-native/firebase';
//import { MapviewscreenPage } from '../pages/mapviewscreen/mapviewscreen';
import { FupPage } from '../pages/fup/fup';
import { Geolocation } from '@ionic-native/geolocation';
import { LacmastersortProvider } from '../providers/lacmastersort/lacmastersort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesPage } from '../pages/notes/notes';
import { File, IWriteOptions } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';
import { AlertsPage} from '../pages/alerts/alerts';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
//import { CapturePhotoPage } from '../pages/capture-photo/capture-photo';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import{RemindersPage} from '../pages/reminders/reminders'
import { Base64 } from '@ionic-native/base64';
import{GetLatLongProvider} from '../providers/get-lat-long/get-lat-long'
import { MapviewscreenPage} from '../pages/mapviewscreen/mapviewscreen';

// import { CommnDetailsPage} from '../pages/commn-details/commn-details';
// import { ContactsPage} from '../pages/contacts/contacts';
// import { ContactsUpdatePage} from '../pages/contacts-update/contacts-update';
// import { CommnOthDetailsPage} from '../pages/commn-oth-details/commn-oth-details';
//import { Pro } from '@ionic/pro';
//import {enableProdMode} from '@angular/core';


// Pro.init('040d0d97', {
//   appVersion: '0.0.1'
// })

// enableProdMode();
// @Injectable()
// export class MyErrorHandler implements ErrorHandler {
//   ionicErrorHandler: IonicErrorHandler;

//   constructor(injector: Injector) {
//     try {
//       this.ionicErrorHandler = injector.get(IonicErrorHandler);
//     } catch(e) {
//       // Unable to get the IonicErrorHandler provider, ensure
//       // IonicErrorHandler has been added to the providers list below
//     }
//   }

//   handleError(err: any): void {

//     var user_id="crm :";
//     var application_pack="RAJKUMAR -"
//     Pro.monitoring.handleNewError(user_id+' '+application_pack+' '+err);
//     // Remove this if you want to disable Ionic's auto exception handling
//     // in development mode.
//     this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
//   }
// }


@NgModule({
  declarations: [
    MyApp,
    LacInfoPage,
    AcDetailsPage,
    AddetailsPage,
    RemarkPage,
    TransPage,
    CommnPage,
    FupPage,
    AlertsPage,
   // CapturePhotoPage,
    NotesPage,
  //  RemindersPage,
   MapviewscreenPage,
    LacDetails_ListPage
   
  ],
  
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp,{
    tabsPlacement: 'top',
    scrollPadding:false,
    scrollAssist:false,
    platforms: {
    android: {
      tabsPlacement: 'top'
    },
    ios: {
      tabsPlacement: 'top'
    },
    windows:
    {
      tabsPlacement: 'top'
    }
  }
}),
  IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LacInfoPage,
    AcDetailsPage,
    AddetailsPage,
    RemarkPage,
    TransPage,
    CommnPage,
    FupPage,
    NotesPage,
    AlertsPage,
   // RemindersPage,
   // CapturePhotoPage,
   MapviewscreenPage,
    LacDetails_ListPage

  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    DbProvider,GetLatLongProvider,
    SQLite,
    Firebase,
    Network,
    InAppBrowser,
    LacmastersortProvider,
    File,
    Base64,
    Geolocation,
    LaunchNavigator


  ]
})
export class AppModule{}
