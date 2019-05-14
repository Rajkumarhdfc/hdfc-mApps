import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events,AlertController,ViewController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { LacInfoPage } from '../lac-info/lac-info';
import { AcDetailsPage } from '../ac-details/ac-details';
import { MapviewscreenPage} from '../mapviewscreen/mapviewscreen';



/**
 * Generated class for the RemindersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
export class RemindersPage {
reminders=[];
loading:any;
remids;
alllen;
crrlen:any = 0;
rangelen:any = 15;
totlen;
scroll_count:any = 0;
lac:any;
borrname:any;
comm_address_borr:any

constructor(public navCtrl: NavController,
 public navParams: NavParams,
 public dbProvider:DbProvider,
 public loadingCtrl:LoadingController,
 public events:Events,
 public alertCtrl: AlertController,
 public viewCtrl:ViewController)
{
this.dbProvider.GetReminders()
            .then((result) => {
                              this.remids=result;
                              this.alllen=this.remids.length;
                              console.log(this.alllen);
                              this.crrlen = 0;
                              this.totlen=this.alllen
                              var t=0;
                              for(let i = this.crrlen; i < this.alllen ; i++)
                              {
                                this.reminders.push(this.remids[i]);
                                this.crrlen++;
                                console.log(this.crrlen);
                                t++;
                                if(t==10){
                                  break;
                                }

                               }
                              console.log(this.reminders);
                              },

                                      
                               
                    (error) => {
                                console.log("ERROR: ", error);
                 })

}

// navigateACDetails(lacno,borrname){

//   this.navCtrl.push(AcDetailsPage,{item:lacno,item2:borrname})
//   console.log("navigated");
  
//   }

doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
                               var t=0;
                              this.scroll_count = this.crrlen;
                              for(let i = this.crrlen; i < this.alllen ; i++)
                              {
                                    this.reminders.push(this.remids[i]);
                                    this.crrlen++;
                                    console.log(this.crrlen);
                                    t++;
                                    if(t==this.rangelen){

                                      break;
                                    }

                                }
                                this.scroll_count++

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 50);
      
  }

  canWeLoadMoreContent() { // stop the scroll as soon as it reaches the totlen of list
   return (this.scroll_count===this.totlen) ? false : true;
  }  

navigateACDetails(lacno,borrname){

this.navCtrl.push(AcDetailsPage,{item:lacno,item2:borrname})
console.log("navigated");

}

 ionViewWillEnter() {
        this.events.publish('hidemenu', { menustatus:true });
        this.events.publish('hideHeader', { footerstatus:false,lac:"",borrname:""});
        this.events.publish('hideheader', { headerstatus:false,navheaderstat:false});

  }
 ionViewDidLoad() {
    console.log('ionViewDidLoad RemindersPage');
  }
  
// GetCustContact(lacno){
//   this.dbProvider.GetCustContact(lacno)

//          .then((result:any) => {
           
//           if(result.length!=0){
//             alert(result[0].contact_det);
//           }else{
//             alert('No contact found');
//           }
//                              console.log(result);
                        
//                            },
//                  (error) => {
//                              console.log("ERROR: ", error);
//               })
// }

goToMap(lacno,name){
  // not passing the borr name 

  this.dbProvider.GetCustomerAddress_lac(lacno).then((res:any)=>{
    // alert('success');
    if(res.length==0){
      alert('No address found ');
      this.comm_address_borr=[];
    }else{
     this.comm_address_borr=res;
     this.navCtrl.push(MapviewscreenPage,{"address_details":this.comm_address_borr[0],lacno:lacno,borname:name,permflag:false});

    }
 
     console.log(res);
 
   
   })
}


// 

getCommAddForBorr(lacno){
  this.dbProvider.GetCustomerAddress_lac(lacno).then((res:any)=>{
   // alert('success');
   if(res.length==0){
    alert('No address found ');
     this.comm_address_borr=[];
   }else{
    this.comm_address_borr=res;
    //alert(res[0].comm_address);

    const optionDialog = this.alertCtrl.create({
      title: 'HOME ADDRESS',
      message: '<div>' +
      '<span class="alert_name block"><img src="assets/imgs/alert_map.png" style="margin-right:10px;>'+res[0].comm_address+'</span>' +
     
      '</div>',
      cssClass: 'reset', 
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
          cssClass: 'alertCancel'
        }
      ]

    });
    optionDialog.present();



   }

    console.log(res);

  
  })
}

  

GetCustContact(lacno){
  this.dbProvider.GetCustContact(lacno)

         .then((result:any) => {
           
          if(result.length!=0){
            //alert(result[0].contact_det);

            const phoneDialog = this.alertCtrl.create({
              title: 'Mobile Number' ,
              message: '<div>' +
              '<span class="alert_add block" style="font-size: 16px;"><img src="assets/imgs/alert_phone.png" style="margin-right:10px;">'+result[0].contact_det+'</span>' + 
              '</div>',
              cssClass: 'reset', 
              buttons: [
                {
                  text: 'Cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  },
                  cssClass: 'alertCancel'
                }
              ]
        
            });
            phoneDialog.present();
          }else{
            alert('No contact found');
          }
                             console.log(result);
                       
                           },
                 (error) => {
                             console.log("ERROR: ", error);
              })
}


}
