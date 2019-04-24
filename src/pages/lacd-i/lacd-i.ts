import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the LacdIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lacd-i',
  templateUrl: 'lacd-i.html',
})
export class LacdIPage {
 	LacNo:any;
	Borrname:any;
	paramtab1:any;
  lacddetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
  	this.LacNo = navParams.get('lac');
  	this.Borrname=navParams.get('item2');
 	this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

 GetlacdDetails(){
    this.dbProvider.GetLacDinfo(this.LacNo)

            .then((result) => {
            	 				console.log(this.LacNo);
                              	this.lacddetails = result;
                               	console.log(this.lacddetails);
                              
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }

  ionViewDidLoad() {
  	this.GetlacdDetails();
    console.log('ionViewDidLoad LacdIPage');
  }

}
