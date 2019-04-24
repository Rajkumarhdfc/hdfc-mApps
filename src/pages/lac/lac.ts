import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams} from 'ionic-angular';

/**
 * Generated class for the LacPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lac',
  templateUrl: 'lac.html'
})
export class LacPage {

  lacAmrtRoot = 'LacAmrtPage'
  lacTermsRoot = 'LacTermsPage'

LacNo:any;
Borrname:any;
paramtab1:any;

  constructor(public navCtrl: NavController,public navParams:NavParams) {
  	this.LacNo = this.navParams.get('item');
  	this.Borrname=this.navParams.get('item2');
 	  this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

}
