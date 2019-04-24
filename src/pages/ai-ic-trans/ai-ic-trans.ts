import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the AiIcTransPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ai-ic-trans',
  templateUrl: 'ai-ic-trans.html',
})
export class AiIcTransPage {
file_no:any;
ai:any;
tot:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
  	this.file_no = navParams.get('lac');
  	console.log(this.file_no);
  }

GetAiTrans(){
	 this.dbProvider.GetAITrans(this.file_no)

            .then((result) => {
                               this.ai = result;
                               console.log(this.ai);
                               console.log(this.file_no);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }
GetAiTranstot(){
   this.dbProvider.GetAITransTotal(this.file_no)

            .then((result) => {
                               this.tot = result;
                               console.log(this.tot);
                               console.log(this.file_no);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }

  ionViewDidLoad() {
  	this.GetAiTrans();
    this.GetAiTranstot();
    console.log('ionViewDidLoad AiIcTransPage');
  }

}
