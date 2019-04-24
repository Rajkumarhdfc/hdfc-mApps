import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {
	lac:any;
	LacNo:any;
  	Borrname:any;
  	paramtab1:any;
  	paramtab2:any;
  	fu_action:any
    alertflg:any;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public dbProvider:DbProvider,
   public events:Events) {
  	this.LacNo = navParams.get('item');
  	this.Borrname =navParams.get('item2');
  }

GetTabAlerts(){
	 this.dbProvider.GetTabAlerts(this.LacNo)

            .then((result:any) => {
                               this.lac = result;
                               this.alertflg=result.length
                               console.log(this.lac);
                               console.log(this.LacNo);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }

ionViewDidLoad() {
  	this.GetTabAlerts();
    console.log('ionViewDidLoad AlertsPage');
    this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});
  }

ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});
}
// ionViewWillLeave() {
//     this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});
//    }

}
