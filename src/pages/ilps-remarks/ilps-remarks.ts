import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the IlpsRemarksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ilps-remarks',
  templateUrl: 'ilps-remarks.html',
})
export class IlpsRemarksPage {
  ilps:any;
  LacNo:any;
  Borrname:any;
  paramtab1:any;
  paramtab2:any;
  fu_action:any
    constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider) {
       this.LacNo = navParams.get('lac');
       this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

  GetIRemarks(){
	 this.dbProvider.GetIlpsRemarks(this.LacNo)

            .then((result) => {
                               this.ilps = result;
                               console.log(this.ilps);
                               console.log(this.LacNo);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }

  
  ionViewDidLoad() {
    this.GetIRemarks();
    console.log('ionViewDidLoad IlpsRemarksPage');
  }

}
