import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,NavParams,Content,ModalController} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';


@IonicPage()
@Component({
  selector: 'page-lac-info',
  templateUrl: 'lac-info.html'
})
export class LacInfoPage {
@ViewChild(Content) content: Content;

  acDetailsRoot = 'AcDetailsPage'
  propertyDetailsRoot = 'PropertyDetailsPage'
  disbursementRoot = 'DisbursementPage'
  uniqueIdRoot = 'UniqueIdPage'
  transPage ='TransPage'
  remarksPage='RemarkPage'
  viewdocsPage='ViewDocPage'
  addetailsPage='AddetailsPage'

LacNo:any;
Borrname:any;
paramtab1:any;
paramtab2:any;
name:any;
itemlist:any;
acdetails:any;
lacacdtls:any;


  pages: Array < {
        title: string,
        component: any,
    } > ;

 constructor(public navCtrl: NavController,
  public navParams:NavParams,
  public events:Events,
  public dbProvider:DbProvider,
     public modalCtrl: ModalController){
 	    this.LacNo = navParams.get('card');
      this.Borrname=navParams.get('card1');

 	    this.paramtab1={lac:this.LacNo,name:this.Borrname};
           ////hide footer///////
      this.events.publish('hideHeader', { footerstatus:true,lac:this.LacNo,borrname:this.Borrname});



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


    openPage(page) { // --- for menu
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(page.component, {
            name: page.title,
            item:this.LacNo ,
            item2:this.Borrname
        });
 
    }
    
cardlac(){
	console.log(this.LacNo);
	console.log(this.paramtab1);
}

GetACDetails(){
     this.dbProvider.GetACDetails(this.LacNo)

            .then((result) => {
                              this.acdetails = result;
                               console.log(this.acdetails);
                               console.log(this.LacNo);
                               
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
    
  }


  SelectLacMasterAcDetails(){
    this.dbProvider.SelectLacMasterAcDetails(this.LacNo)
    .then((res)=>{
      this.lacacdtls=res;
        console.log(this.lacacdtls);
        },
      (error) => {
                  console.log("ERROR: ", error);
                 })

  }





   ngOnInit(){
      this.dbProvider.LacMasterTableInfo(this.LacNo)

        .then((result) => {
                  this.itemlist = result;
                   console.log(this.itemlist);
                   console.log(this.LacNo);
                          },
                    (error) => {
                   console.log("ERROR: ", error);
                 })
             this.GetACDetails();
             this.SelectLacMasterAcDetails();

   }

openModal(){
      let modal = this.modalCtrl.create('FileReminderPage',{data: this.LacNo });
      modal.present();
  } 
  
 

 

ionViewDidLoad(){
 this.cardlac();
 ///////hide footer////
  this.events.publish('hideHeader', { footerstatus: true,lac:this.LacNo,borrname:this.Borrname});

}


ionViewDidEnter(){
   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}

}
