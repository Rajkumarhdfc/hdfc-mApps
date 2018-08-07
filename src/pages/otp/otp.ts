import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ChooseMpinPage } from '../';
import { ApiProvider } from '../../providers/api/api';
import { DeviceProvider } from '../../providers/device/device';
//import { StorageProvider } from '../../providers/storage/storage';
import { Storage } from '@ionic/storage';
import { LoaderProvider } from '../../providers/loader/loader';
import {confirm_Alert_Provider} from '../../providers/alertController/alertController';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  user_data: any;
  otp: FormGroup;
  user_id: any;
  pwd: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private api: ApiProvider, private device: DeviceProvider, private store: Storage, private loader: LoaderProvider,
    public alertCtrl: confirm_Alert_Provider) {
    this.user_data = this.navParams.data.data;
    this.otp = this.formBuilder.group({
      otp_str: ['', Validators.required]
    });
    this.store.get('userId').then((val) => { this.user_id = val; });
    this.store.get('password').then((val) => { this.pwd = val; });
    console.log("user_id: " + JSON.stringify(this.user_id));
    console.log("pwd: " + this.pwd);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

  submitOTP() {
    let loader = this.loader.show('Authenticating...');
    let device_info = this.device.getDeviceInfo();
    let dataObj = {
      "USER_TYPE": this.api.getUserType(),
      "USER_ID": this.user_id,
      "OTP_CODE": this.otp.value.otp_str,
      "DEVICE_INFO_JSON": '[' + JSON.stringify(device_info) + ']',
      "NOTIFICATION_ID": "yuiy8909"
    };
    console.log(this.otp.value);
    console.log(dataObj);
    this.otp.reset();

    this.api.verifyOTP('Verify_OTP', dataObj).subscribe((res: any) => {
      this.loader.hide(loader);
      console.log(res);
      //If "RESULT_DET.RETURN_CODE": "0" => redirect to mpin page
       if (res.RESULT_DET[0].RETURN_MESSAGE == 'User Logged in successfully') {
         this.store.set('user_LoginData', JSON.stringify(res));
         this.navCtrl.push(ChooseMpinPage, {
          data: res
         });
       }
      //  else display error
       else {
        this.alertCtrl.showConfirm('OTP incorrect','Error','Ok', '');
      }
    }, err => {
      this.loader.hide(loader);
      console.log(err);
    });
    //this.navCtrl.push(ChooseMpinPage);
  }
  resendOTP() {
    this.otp.reset()
  }
}
