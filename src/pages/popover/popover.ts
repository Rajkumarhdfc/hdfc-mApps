import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
LacNo:any;
list:any;
list1:any;

 constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public viewCtrl:ViewController,
  public dbProvider:DbProvider) {

  	this.LacNo = navParams.get('data');
  	this.list = navParams.get('data1');
   	console.log(this.LacNo);
    console.log(this.list);
  }

close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  	 this.dbProvider.GetFu_actionPopoverDetails(this.LacNo,this.list)

          	.then((result) => {
                               this.list1 = result;
                           		  console.log(this.list1+""+this.list);
                           		 
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
    console.log('ionViewDidLoad PopoverPage');
  
  }

}
