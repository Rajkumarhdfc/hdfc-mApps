import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';

/**
 * Generated class for the PropertyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-property-details',
  templateUrl: 'property-details.html',
})
export class PropertyDetailsPage {
LacNo:any;
proplist:any;
name:any;
propname:any;

  pages: Array < {
        title: string,
        component: any,
    } > ;

   constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public dbProvider: DbProvider,
    public events:Events) {
    
  	// this.LacNo = navParams.get('lac');
  	// this.name=navParams.get('name');

    this.LacNo = navParams.get('item');
    this.name=navParams.get('item2');
this.pages = [
            {
                title: 'Property',
                component: "PropertyDetailsPage"
            },
        
            {
                title: 'Disbursement',
                component: "DisbursementPage"
            },
            
            {
                title: 'Unique',
                component: "UniqueIdPage"
            },
             {
                title: 'Trans',
                component: "TransPage"
            },

            {
                title: 'Remark',
                component: "RemarkPage"
            },
            {
                title: 'ViewDoc',
                component: "ViewDocPage"
            },
             {
                title: 'Addetails',
                component: "AddetailsPage"
            },


        ];
   

  }

PropertyNameDetails(){
  this.dbProvider.GetPropName(this.LacNo)

            .then((result) => {
                              this.propname=result; 
                              console.log(this.propname)                           
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })

    
}


openPage(page) { // --- for menu
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(page.component, {
            name: page.title,
            item:this.LacNo ,
            item2:this.name
        });
 
    }

  ionViewDidLoad() {
  this.PropertyNameDetails();
  	this.dbProvider.GetPropertyDetails(this.LacNo)

          	.then((result) => {
                              this.proplist = result;
                           		console.log(this.proplist);
                           		console.log(this.LacNo);
                           		
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
    console.log('ionViewDidLoad PropertyDetailsPage');
  }
  
  ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}


}
