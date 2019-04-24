import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the FupPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fup',
  templateUrl: 'fup.html'
})
export class FupPage {

  fuActionRoot = 'FuActionPage'
  legalActionRoot = 'LegalActionPage'
  addFollowUpRoot = 'AddFollowUpPage'
  //propClassRoot = 'PropClassPage'

  LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;

  constructor(public navCtrl: NavController,public navParams:NavParams,public events:Events) {
  	this.LacNo = this.navParams.get('item');
  	this.Borrname=this.navParams.get('item2');
 	  this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

// ionViewCanEnter(){
// }

ionViewWillEnter() {
  this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});
}
// ionViewWillLeave() {
//     this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});
//   }
}
