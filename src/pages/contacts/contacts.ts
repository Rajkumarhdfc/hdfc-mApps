import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
LacNo:any;
custcontact:any;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public dbProvider:DbProvider) {
  	this.LacNo = navParams.get('lac');
  	console.log(this.LacNo);
  }
  
  GetCustContact(){
  	 this.dbProvider.GetCustContact(this.LacNo)

            .then((result) => {
                              this.custcontact = result;
                               console.log(this.custcontact);
                               console.log(this.LacNo);
                               
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }


  ionViewDidLoad() {
  	this.GetCustContact();
    console.log('ionViewDidLoad ContactsPage');
  }

}
