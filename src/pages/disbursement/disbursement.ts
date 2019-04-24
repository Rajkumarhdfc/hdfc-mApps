import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';


/**
 * Generated class for the DisbursementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disbursement',
  templateUrl: 'disbursement.html',
})
export class DisbursementPage {
LacNo:any;
Datalist:any;
Data:any;
amt:any;
name:any;
pages: Array < {
        title: string,
        component: any,
    } > ;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public dbProvider: DbProvider,
   public events:Events) {
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

  GetBuilderInfo(){
  this.dbProvider.GetBuilderDetails(this.LacNo)

            .then((result) => {
                               this.Data = result;
                               console.log(this.Data);
                               console.log(this.LacNo);
                               
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
}


Getdisbamt(){
  this.dbProvider.GetDisbAmtDetails(this.LacNo)

            .then((result) => {
                              this.amt = result;
                               console.log(this.amt);
                               console.log(this.LacNo);
                               
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


 ngOnInit(){
      this.dbProvider.GetDisbDetails(this.LacNo)

          	.then((result) => {
                              this.Datalist = result;
                           		console.log(this.Datalist);
                           		console.log(this.LacNo);
                           		
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
            
              this.GetBuilderInfo();
              this.Getdisbamt();
     
 	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisbursementPage');
  }
  ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}

}
