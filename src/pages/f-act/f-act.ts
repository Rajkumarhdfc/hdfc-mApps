import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the FActPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-f-act',
  templateUrl: 'f-act.html',
})
export class FActPage {
	LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;
  	fuactdetails:any;
  	
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider ) {
	this.LacNo = navParams.get('lac');
  this.Borrname=this.navParams.get('item2');
 	this.paramtab1={lac:this.LacNo,name:this.Borrname};
    console.log(this.paramtab1);
  }

	GetFuAct(){
        this.dbProvider.GetFuActdetails(this.LacNo)

            .then((result) => {
                              	this.fuactdetails = result;
                           		console.log(this.fuactdetails);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
   }

  ionViewDidLoad() {
  	this.GetFuAct();
    console.log('ionViewDidLoad FActPage');
  }

}