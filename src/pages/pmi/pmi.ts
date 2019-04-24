import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the PmiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pmi',
  templateUrl: 'pmi.html',
})
export class PmiPage {
file_no:any;
pmi:any;
tot:any;

constructor(public navCtrl: NavController,
 public navParams: NavParams,
 public dbProvider:DbProvider) {
  
  	this.file_no = navParams.get('lac');
  	console.log(this.file_no);
  }

GetpmiAction(){
  	this.dbProvider.GetPmiTrans(this.file_no)

            .then((result) => {
                               this.pmi = result;
                               console.log(result);
                               console.log(this.file_no);
                               
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })

  }

  GetPmiTranstot(){
   this.dbProvider.GetPmiTransTotal(this.file_no)

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
  	  this.GetpmiAction();
      this.GetPmiTranstot();
      console.log('ionViewDidLoad PmiPage');
  }

}
