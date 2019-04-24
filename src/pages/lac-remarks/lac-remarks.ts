import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the LacRemarksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lac-remarks',
  templateUrl: 'lac-remarks.html',
})
export class LacRemarksPage {
 	lac:any;
	LacNo:any;
  	Borrname:any;
  	paramtab1:any;
  	paramtab2:any;
  	fu_action:any

   constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
    this.LacNo = navParams.get('lac');
    this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

 GetlacRemarks(){
	 this.dbProvider.GetLacRemarks(this.LacNo)

            .then((result) => {
                               this.lac = result;
                               console.log(this.lac);
                               console.log(this.LacNo);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }

  ionViewDidLoad(){
  	this.GetlacRemarks();
    console.log('ionViewDidLoad LacRemarksPage');
  }

}
