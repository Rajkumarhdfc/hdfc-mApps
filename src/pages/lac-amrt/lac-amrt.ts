import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the LacAmrtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lac-amrt',
  templateUrl: 'lac-amrt.html',
})
export class LacAmrtPage {
LamrtTerms:any;
LacNo:any;
Borrname:any;
paramtab1:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
  	this.LacNo = navParams.get('lac');
  	this.Borrname=this.navParams.get('item2');
 	  this.paramtab1={lac:this.LacNo,name:this.Borrname};
    console.log(this.paramtab1);
  }

GetLacAmrt(){
        this.dbProvider.GetLacTerAmrt(this.LacNo)

            .then((result) => {
                              	this.LamrtTerms = result;
                           		console.log(this.LamrtTerms);
                           
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
   }

  ionViewDidLoad() {
  	this.GetLacAmrt();
    console.log('ionViewDidLoad LacAmrtPage');
  }

}
