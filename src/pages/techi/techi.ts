import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the TechiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-techi',
  templateUrl: 'techi.html',
})
export class TechiPage {
LacNo:any;
techdtls:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) 
  {
  	this.LacNo = navParams.get('lac');
  }

GetTechDetails(){
	this.dbProvider.TechDetails(this.LacNo).then((res)=>{
		this.techdtls=res;
		console.log(res);
	})
}
  ionViewDidLoad() {
  	this.GetTechDetails();
    console.log('ionViewDidLoad TechiPage');
  }

}
