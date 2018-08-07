import { FirstRunPage } from '../';
import { Storage } from '@ionic/storage';
import { ListMasterPage } from '../';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {confirm_Alert_Provider} from '../../providers/alertController/alertController';
import { LoaderProvider } from '../../providers/loader/loader';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from "../../providers/toast/toast";
import { App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login-mpin',
  templateUrl: 'login-mpin.html',
})
export class LoginMpinPage {
  @ViewChild(Nav) nav: Nav;
  todo: FormGroup;
  user_id: any;
  pwd: any;
  user_LoginData: {};
  rootPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private auth: AuthProvider, private alertCtrl: confirm_Alert_Provider, private loader: LoaderProvider,
    private toast: ToastProvider, private store: Storage, private api: ApiProvider, public app: App) {
    console.log(this.navParams);
    this.todo = this.formBuilder.group({
      mpin_val: [''],// Validators.required],
    });
    this.store.get('userId').then((val) => { this.user_id = val; });
    this.store.get('user_LoginData').then((val) => { this.user_LoginData = JSON.parse(val) });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginMpinPage');
  }

  HomePage() {
    console.log(this.todo.value);
    let mpin_val = this.auth.getAuth_mpin('MPIN');
    if (mpin_val == this.todo.value.mpin_val) {
      console.log('Success');
      this.navCtrl.push(ListMasterPage);
    }
    else {
      console.log('Mpin fail');
    }
    // this.store.get('MPIN').then((val) => {
    //   if(val == this.todo.value.mpin_val){
    //     console.log('Success');
    //   this.navCtrl.push(ListMasterPage);
    // }
    // else{
    //   console.log('Mpin fail');
    // }

    // });        
  }

  forgotMPIN() {
    this.navCtrl.setRoot(FirstRunPage);
  }

  add(val) {
    if (this.todo.value.mpin_val === null) {
      this.todo.value.mpin_val = '';
    }
    this.todo.value.mpin_val += val;
    this.todo.controls['mpin_val'].setValue(this.todo.value.mpin_val);

  }

  clear() {
    this.todo.reset()
  }

  deleteVal() {
    if (this.todo.value.mpin_val.length > 0) {
      let newVal = this.todo.value.mpin_val.substring(0, this.todo.value.mpin_val.length - 1);
      this.todo.controls['mpin_val'].setValue(newVal);
    }
  }

  logout(){
    this.alertCtrl.showConfirm('Confirm Logout','Error','Ok', 'Cancel');
    
    let loader = this.loader.show('Authenticating...');
    let dataObj = {
      "USER_TYPE": this.api.getUserType(),
      "USER_ID": this.user_id,
      "SESSION_ID": this.user_LoginData['USER_DET'][0].SESSION_ID
    };
    console.log(dataObj);

    this.api.logOut('logOut', dataObj).subscribe((res: any) => {
      this.loader.hide(loader);
      console.log(res);
      //If "RESULT_DET.RETURN_CODE": "0" => redirect to mpin page
       if (res.Logout_User[0].RETURN_CODE == 0) {
        this.toast.show("Successfully Logged Out");
        //this.app.getActiveNav().popToRoot();
        //this.nav.popToRoot();// or this.nav.rootNav.setRoot(Tabs)
        // this.navCtrl.push(ChooseMpinPage, {
        //   data: res
        //  });
        //this.rootPage = FirstRunPage;
        this.navCtrl.setRoot(FirstRunPage);
       }
      //  else display error
       else {
        //this.alertCtrl.showConfirm('OTP incorrect','Error','Ok', '');
        console.log(res.RESULT_DET[0].RETURN_MESSAGE);
      }
    }, err => {
      this.loader.hide(loader);
      console.log(err);
    });
  }
}
