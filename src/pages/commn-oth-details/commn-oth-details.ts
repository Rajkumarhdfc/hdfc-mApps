import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';

/**
 * Generated class for the CommnOthDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commn-oth-details',
  templateUrl: 'commn-oth-details.html',
})
export class CommnOthDetailsPage {
LacNo:any;
commothdtls:any;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public dbProvider:DbProvider,
   public events:Events,
) {
   	this.LacNo = navParams.get('lac');
  	console.log(this.LacNo);
  }
   GetOtherCommnDetails(){
  	 this.dbProvider.GetOtherCommDetails(this.LacNo)

            .then((result) => {
                              this.commothdtls = result;
                               console.log(this.commothdtls);
                               console.log(this.LacNo);
                               
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }


  ionViewDidLoad() {
  	this.GetOtherCommnDetails();
    console.log('ionViewDidLoad CommnOthDetailsPage');
  }

 
}
