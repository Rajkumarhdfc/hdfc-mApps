import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController  } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';


/**
 * Generated class for the EmiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emi',
  templateUrl: 'emi.html',
})
export class EmiPage {
file_no:any;
emi:any;
tot:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dbProvider:DbProvider,
      public modalCtrl:PopoverController) {
  	this.file_no = navParams.get('lac');
  	console.log(this.file_no);
  }

GetemiAction(){
	 this.dbProvider.GetEmiTrans(this.file_no)
            .then((result) => {
                               this.emi = result;
                               console.log(this.emi);
                               console.log(this.file_no);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }
GetEmiTranstot(){
   this.dbProvider.GetEmiTransTotal(this.file_no)
            .then((result) => {
                               this.tot = result;
                               console.log(this.tot);
                               console.log(this.file_no);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }


public PopoverBncReason(bncreason,tran_dt){
    let modal = this.modalCtrl.create('BncReasonPopoverPage',{data:this.file_no,bncdata:bncreason,transacdate:tran_dt});
    modal.present();
    console.log(bncreason,tran_dt);
} 

  ionViewDidLoad() {
  	this.GetemiAction();
    this.GetEmiTranstot();
    console.log('ionViewDidLoad EmiPage');
  }

}
