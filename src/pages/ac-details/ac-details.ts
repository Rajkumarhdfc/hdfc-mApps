import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,Events } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
//import { LacDetailsPage } from '../lac-details/lac-details';
//import { FileReminderPage } from '../file-reminder/file-reminder';

/**
 * Generated class for the AcDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ac-details',
  templateUrl: 'ac-details.html',
})

export class AcDetailsPage {
LacNo:any;
Borrname:any;
name:any;
itemlist:any;
acdetails:any;
lacacdtls:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public dbProvider:DbProvider,
     public modalCtrl: ModalController,
      public events:Events) {

   this.LacNo = navParams.get('item');
  this.name=navParams.get('item2');
  console.log(this.LacNo+"  "+this.name);
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
 ///////hide footer////
 this.events.publish('hideHeader', { footerstatus: true,lac:this.LacNo,borrname:this.name});
 // this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});


}


ionViewDidEnter(){
 this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}

}
