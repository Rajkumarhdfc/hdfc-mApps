import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the LacTermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lac-terms',
  templateUrl: 'lac-terms.html',
})
export class LacTermsPage {
LacTerms:any;
LacNo:any;
Borrname:any;
paramtab1:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
  	this.LacNo = navParams.get('lac');
  	this.Borrname=this.navParams.get('item2');
 	this.paramtab1={lac:this.LacNo,name:this.Borrname};
    console.log(this.paramtab1);
  }
	
	GetLacTermDetails(){
        this.dbProvider.GetLacTerms(this.LacNo)

            .then((result) => {
                              	this.LacTerms = result;
                           		console.log(this.LacTerms);
                           
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
   }


  	ionViewDidLoad(){
  	this.GetLacTermDetails();
    console.log('ionViewDidLoad LacTermsPage');
  }

}
