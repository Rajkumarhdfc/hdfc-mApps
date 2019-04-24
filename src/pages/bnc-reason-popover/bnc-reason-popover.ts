import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams,ViewController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the BncReasonPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bnc-reason-popover',
  templateUrl: 'bnc-reason-popover.html',
})
export class BncReasonPopoverPage {
file_no:any;
emi:any;
trans_date:any;
bncreason:any;
  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	 public viewCtrl:ViewController,
  	 public dbProvider:DbProvider) 
  {
  	 this.file_no = navParams.get('data');
  	 this.trans_date = navParams.get('transacdate');
  	 this.bncreason=navParams.get('bncdata');
  }


GetemiAction(){
	 this.dbProvider.GetBncReasonDtls(this.file_no,this.trans_date)
            .then((result) => {
                               this.emi = result;
                               console.log(this.emi);
                               console.log(this.file_no);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }

close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  	this.GetemiAction();
    console.log('ionViewDidLoad BncReasonPopoverPage');
  }

}
