import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmMpinPage } from '../';
import { AuthProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-choose-mpin',
  templateUrl: 'choose-mpin.html',
})
export class ChooseMpinPage {
  todo : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private auth: AuthProvider) {

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
  logForm(){
    console.log(this.todo.value);
      this.navCtrl.push(ConfirmMpinPage, {
      data: this.todo.value.mpin_val
    });
  }
  clear(){
    this.todo.reset()
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseMpinPage');
  }

}
