import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiProvider } from "../../providers/api/api";
import { DeviceProvider } from './../../providers/device/device';
import { ToastProvider } from "../../providers/toast/toast";
import { TransformProvider } from '../../providers/xmltojson/xmltojson';
import { AuthProvider } from "../../providers/auth/auth";
import { GeolocProvider } from './../../providers/geoloc/geoloc';
import { Observable } from 'rxjs/Observable';
import { LoaderProvider } from "../../providers/loader/loader";
//import { ListMasterPage } from '../list-master/list-master';
import { ListMasterPage } from '../';
import { ChooseMpinPage } from '../';
import { OtpPage } from '../';

// import { Pro, MonitoringExtra } from "@ionic/pro";
// import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  credentialsForm: FormGroup;
  response: any;
  deviceDetails: any;
  geoData: any;
  dataObj: any;
  constructor(public navCtrl: NavController, public loader: LoaderProvider, public xmltoJSON: TransformProvider,
    private auth: AuthProvider, private formBuilder: FormBuilder, private api: ApiProvider,
    private toast: ToastProvider, private device: DeviceProvider, private geo: GeolocProvider,
    private store: Storage) {

    this.credentialsForm = this.formBuilder.group({
      // userId: ['edgarr'],
      // password: ['mowbly']
      userId: ['PRAJAKTAKITC'],
      password: ['Secure2019']
      //userId: ['ASHISHL'],
      //password: ['Secure2020']
    });

    this.store.set('userId', this.credentialsForm.value['userId']);
    this.store.set('password', this.credentialsForm.value['password']);

    // this.deviceDetails = this.device.getDeviceData();
    // this.geo.getLatLong().then((val) => {
    //   debugger;
    //   console.log(val);
    //   this.geoData = val;
    // });

    //  this.store.get('coord').then(val => {
    //   //console.log(val);
    //  });
    //  this.deviceDetails.DEVICE_ID = this.device.getDevice_serial();
    //  this.deviceDetails.DEVICE_NAME = this.device.getDevice_Manufacturer();
    //  this.deviceDetails.DEVICE_MODEL = this.device.getDevice_Model();
    //  this.deviceDetails.LATTITUDE = this.geo.getLatLong();
    //  this.deviceDetails.LONGITUDE = this.geo.getLatLong();
    //  this.deviceDetails.DEVICE_OS = this.device.getDevice_Platform();
    //  this.deviceDetails.DEVICE_OS_VERSION = this.device.getDevice_OSver();
    //  this.deviceDetails.DEVICE_NETWORK_MODE = this.device.getDevice_Cordova();
    //  this.deviceDetails.NOTIFICATION_ID = this.device.getDevice_Cordova();
  }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad LoginPage1');

  }

  login() {
  //  Pro.monitoring.log('This happens sometimes', { level: 'error' })

   

    if (this.credentialsForm.valid) {
      let device_info = this.device.getDeviceInfo();
      this.dataObj = {
        "APP_VERSION": "1.0",
        "USER_TYPE": this.api.getUserType(),
        "USER_ID": this.credentialsForm.value['userId'],
        "PASSWORD": this.credentialsForm.value['password'],
        "DEVICE_INFO_JSON": '['+JSON.stringify(device_info)+']',
        "NOTIFICATION_ID": "yuiy8909"
      }
      this.auth.setAuth({}, {"USER_PACK_LIST":["CRM"]});
      this.navCtrl.push(ChooseMpinPage, {
        data:{"USER_PACK_LIST":["CRM"]}
      });

     // let loader = this.loader.show('Authenticating...');
      // this.api.postLogin('User_Login', this.dataObj).subscribe((res: any) => {
      //   this.loader.hide(loader);
      //   console.log(res);
      //   //If "OTP_REQ_FLAG": "Y" => redirect to OTP page
      //     if(res.OTP_DET[0].OTP_REQ_FLAG == 'Y'){
      //       this.navCtrl.push(OtpPage, {
      //         data: res
      //       });
      //     }
      //     //  else redirect to mpin page
      //     else {
      //       this.navCtrl.push(ChooseMpinPage, {
      //         data: res 
      //       });
      //     }
      // },err => {
      //   this.loader.hide(loader);
      //   console.log(err);
      // });
    }

  }
  onLogIn() {
   let loader = this.loader.show('Authenticating...');
    if (this.credentialsForm.valid) {
      // const that = this;
      let data = {
        ApplicationId: 6,
        UserID: this.credentialsForm.value['userId'],
        Password: this.credentialsForm.value['password'],
      };

      this.api.post('Authenticate_v2', data).subscribe((res: any) => {
        this.loader.hide(loader);
        let result = this.xmltoJSON.convertToJson(res);
        if (result) {
          this.response = JSON.parse(result['string']._)
        }

        if (this.response.OBJECT[0].AUTHENTICATE.length != 0 && this.response.OBJECT[0].AUTHENTICATE[0].MESSAGE == "VALID") {
          this.auth.setAuth(res, {
            USER_PACK_LIST: this.response.OBJECT[2].USER_PACK_LIST
          });

          //this.navCtrl.setRoot(ChooseMpinPage)
          //this.navCtrl.setRoot(OtpPage)
          this.navCtrl.push(OtpPage);
          // this.navCtrl.setRoot(ListMasterPage, { USER_PACK_LIST: this.response.OBJECT[2].USER_PACK_LIST });
        } else {
          this.toast.show("Invalid user name and password...");
        }

        console.log(res);
      }, err => {
        this.loader.hide(loader);
        this.toast.show("Error in reaching the server..Pls check again or contact helpdesk...")
      });

    }

  }
}
