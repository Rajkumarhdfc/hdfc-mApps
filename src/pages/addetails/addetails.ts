import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';

/**
 * Generated class for the AddetailsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addetails',
  templateUrl: 'addetails.html'
})
export class AddetailsPage {

  actRRoot = 'ActRPage'
  lacdIRoot = 'LacdIPage'
  fActRoot = 'FActPage'
  techiRoot = 'TechiPage'
 // docRoot = 'DocPage'
  criIRoot = 'CriIPage'
	LacNo:any;
	Borrname:any;
	paramtab1:any;
  addetails:any;
  
  constructor(public navCtrl: NavController,
    public navParams:NavParams,
    public dbProvider:DbProvider,
    public events:Events) {
  	this.LacNo = navParams.get('item');
  	this.Borrname=navParams.get('item2');
 	  this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }


ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}

}
