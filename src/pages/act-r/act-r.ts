import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ActRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-act-r',
  templateUrl: 'act-r.html',
})
export class ActRPage {
  LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;
  addetails:any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
  	this.LacNo = navParams.get('lac');
  	this.Borrname=navParams.get('item2');
 	  this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

  GetActrDetails(){
    this.dbProvider.GetActRe(this.LacNo)

            .then((result) => {
                       console.log(this.LacNo);
                                this.addetails = result;
                                 console.log(this.addetails);
                              
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }
  ionViewDidLoad() {
    this.GetActrDetails();
    console.log('ionViewDidLoad ActRPage');
  }

}
