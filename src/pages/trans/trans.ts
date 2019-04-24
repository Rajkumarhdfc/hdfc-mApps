import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';

/**
/**
 * Generated class for the TransPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trans',
  templateUrl: 'trans.html'
})
export class TransPage {

  emiRoot = 'EmiPage'
  pmiRoot = 'PmiPage'
  aiIcTransRoot = 'AiIcTransPage'
pages: Array < {
        title: string,
        component: any,
    } > ;
  LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public dbProvider: DbProvider,
    public events:Events) {
  	this.LacNo = navParams.get('item');
  	this.Borrname=navParams.get('item2');
 	  this.paramtab1={lac:this.LacNo,name:this.Borrname};

  }
 ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}

}
