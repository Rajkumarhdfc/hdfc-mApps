import { LoginMpinPage } from '../';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ListMasterPage } from '../';


@IonicPage()
@Component({
  selector: 'page-confirm-mpin',
  templateUrl: 'confirm-mpin.html',
})
export class ConfirmMpinPage {
  cpin: number;
  todo : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private auth: AuthProvider) {
    
    this.cpin = this.navParams.data.data;
    console.log(this.navParams);
    // this.todo = this.formBuilder.group({
    //   mpin_a: ['', Validators.required],
    //   mpin_b: ['', Validators.required],
    //   mpin_c: ['', Validators.required],
    //   mpin_d: ['', Validators.required],
    // });

    this.todo = this.formBuilder.group({
      mpin_val: [''],// Validators.required],
    });
  }
  
  HomePage() {
    console.log(this.todo.value);
    if(this.cpin == this.todo.value.mpin_val){
      this.auth.setAuth_mpin(this.todo.value.mpin_val);
      console.log('Success');
    //  this.navCtrl.push(LoginMpinPage);
    this.navCtrl.setRoot(ListMasterPage);
    }
    else{
      console.log('Mpin fail');
    }
        
  }

  clear(){
    this.todo.reset()
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmMpinPage');
  }

  deleteVal(){
    if(this.todo.value.mpin_val.length > 0) {
      let newVal = this.todo.value.mpin_val.substring(0, this.todo.value.mpin_val.length - 1);
      this.todo.controls['mpin_val'].setValue(newVal);
  }
  }
  
  add(val){
    if(this.todo.value.mpin_val === null){
      this.todo.value.mpin_val = '';  
    }
    this.todo.value.mpin_val += val;
    this.todo.controls['mpin_val'].setValue(this.todo.value.mpin_val);

  }

}
