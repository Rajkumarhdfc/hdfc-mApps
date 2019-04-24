import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';


/**
 * Generated class for the UniqueIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unique-id',
  templateUrl: 'unique-id.html',
})
export class UniqueIdPage {

LacNo:any;
uid:any;
name:any;

 constructor(public navCtrl: NavController,
    public navParams:NavParams,
    public events:Events,
     public dbProvider: DbProvider
    ) {
    this.LacNo = navParams.get('item');
    this.name=navParams.get('item2');
}
  ngOnInit(){
      this.dbProvider.GetUniqueIdDetails(this.LacNo)

            .then((result:any) => {
                              this.uid = result;
                            },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
     
   }

   ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}


}
