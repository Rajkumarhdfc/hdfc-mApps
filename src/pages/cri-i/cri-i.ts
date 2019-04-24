import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the CriIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cri-i',
  templateUrl: 'cri-i.html',
})
export class CriIPage {
	LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;
  	crinfo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
  	this.LacNo = navParams.get('lac');
  	this.Borrname=navParams.get('item2');
 	this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

GetCriInfo(){
    this.dbProvider.GetCriticalInfo(this.LacNo)

            .then((result) => {
                       console.log(this.LacNo);
                                this.crinfo = result;
                                 console.log(this.crinfo);
                              
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }
  ionViewDidLoad() {
  	this.GetCriInfo();
    console.log('ionViewDidLoad CriIPage');
  }

}
