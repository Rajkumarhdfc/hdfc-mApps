import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the DocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc',
  templateUrl: 'doc.html',
})
export class DocPage {
	LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;
  docdetails:any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider ) {
    this.LacNo = navParams.get('item');
    console.log(this.LacNo);
  	this.Borrname=navParams.get('item2');
 	this.paramtab1={lac:this.LacNo,name:this.Borrname};
  }

GetDocDetails(){
    this.dbProvider.GetLgDocs(this.LacNo)

            .then((result) => {
                       console.log(this.LacNo);
                                this.docdetails = result;
                                console.log(this.docdetails);
                              
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }
  ionViewDidLoad() {
  	this.GetDocDetails();
    console.log('ionViewDidLoad DocPage');
  }

}
