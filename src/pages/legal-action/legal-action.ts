import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';


/**
 * Generated class for the LegalActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-legal-action',
  templateUrl: 'legal-action.html',
})
export class LegalActionPage {
LacNo:any;
legal:any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public dbProvider:DbProvider) {
  	this.LacNo = navParams.get('lac');
  	console.log(this.LacNo);
  }

  GetLegalAction(){
    this.dbProvider.GetLegalAction(this.LacNo)

            .then((result) => {
                              this.legal = result;
                               console.log(this.legal);
                               console.log(this.LacNo);
                               
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }


  ionViewDidLoad() {
  	this.GetLegalAction();
    console.log('ionViewDidLoad LegalActionPage');
  }

}
