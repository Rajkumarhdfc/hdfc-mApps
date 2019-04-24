import { Component} from '@angular/core';
import { DbProvider } from '../../providers/db/db';
import { IonicPage,LoadingController,NavController,NavParams,PopoverController,AlertController,ModalController,ViewController} from 'ionic-angular';
import { Events } from 'ionic-angular';
import { animate, state, trigger, transition, style } from '@angular/animations';
import { LacInfoPage } from '../lac-info/lac-info';
import { LacmastersortProvider } from '../../providers/lacmastersort/lacmastersort';
import { AcDetailsPage } from '../ac-details/ac-details';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';
import { LacDetails_ListPage } from '../lac-details - list/lac-details - list';
//import { MapviewscreenPage } from '../mapviewscreen/mapviewscreen';
//import{RemindersPage} from '../reminders/reminders'
import { MapviewscreenPage} from '../mapviewscreen/mapviewscreen';
import { p } from '@angular/core/src/render3';
/**
 * Generated class for the LacDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lac-details',
  templateUrl: 'lac-details.html',
  animations: [
    trigger("showHello", [
        state("true", style({
            "opacity": 1,
            "display": 'block',
            "width": '65vw',
            "border-radius" :'3px',
        })),
        state("false", style({
            "opacity": 0,
            "display": 'none',
            "width": '0vw',
        })),
        transition("1 => 0", animate("1s ease")),
        transition("0 => 1", animate("1s ease"))
    ])
]
})

export class LacDetailsPage {

public tableItemlist: any =[];
public most_visited_list: any=[];
public top_reminders: any=[];
 top_diff_level:any=[];
top_basket:any=[];
plt_tot_all:any
card:any;
card1:any;
scroll_count:any = 10;
totlen:any;
loading: any;
filter_cnt;
testRadioResult;
sort_type:string;
desc:string ="desc";
asc:string ="asc";
allRows :any;
alllen:any;
crrlen:any = 0;
rangelen:any = 10;
addfollowup_flag:any;
last_active_lacno:any;
confirm_basket:any;
tlen:any;
plttot:any;
uniq_id_acct:any;
uid:any;
plt_tot_cnt:any;
lac_no:any;
pltall:any;
remids:any;
top_diff_level_diff:any=[];
top_diff_level_try:any=[];
tot_top_count:any=0;
tot_len_reminders:any;
comm_address_borr:any;
public buttonClicked: boolean = false; //Whatever you want to initialise it as
public onButtonClick() {
    this.buttonClicked = !this.buttonClicked;
}

constructor(@Inject(DOCUMENT) document,public navCtrl: NavController, 
    public navParams: NavParams, 
    public dbProvider : DbProvider,
    public loadingCtrl:LoadingController,
    public modalCtrl:ModalController,
    public alertCtrl: AlertController,
    public lacsort:LacmastersortProvider,
    public events:Events,
    public popoverCtrl: PopoverController,
    public viewCtrl:ViewController) {

      this.top_diff_level_diff=0;
      this.top_diff_level_try=0;
  //  this.dbProvider.tableItems=[];
   events.subscribe('headercolor', (data) => {
          this.addfollowup_flag = data.hcolor;
          console.log(this.addfollowup_flag);
        })


  this.dbProvider.Get_Top_latest_Reminders().then(res=>{
  console.log(res);
  var remlen;
  this.top_reminders=res;
  remlen=res;
  this.tot_len_reminders=remlen.length;
  //alert(this.tot_len_reminders);
})
this.reminders_all();
}
 
reminders_all(){
  var remtotal;
  this.dbProvider.GetReminders().then((result) => {
                          remtotal=result;
                          this.remids=remtotal.length;

  })
}


navigateACDetails(lacno,borrname){

  this.navCtrl.push(AcDetailsPage,{item:lacno,item2:borrname})
  console.log("navigated");
  
  }
//  this.dbProvider.LacMasterTableDetails_v1()

//             .then((result) => {
//               console.log(result);
//                               this.allRows = result;
//                               this.alllen=this.allRows.length;
//                               this.tlen=this.alllen;
//                               this.crrlen = 0;
//                               this.totlen=this.alllen
//                               var t=0;
//                               for(let i = this.crrlen; i < this.alllen ; i++)
//                               {
//                                 this.tableItemlist.push(this.allRows[i]);
//                                 this.crrlen++;
//                                 console.log(this.crrlen);
//                                 t++;
//                                 if(t==10){
//                                   break;
//                                 }
//                                }
                            
//                               },
//                     (error) => {
//                               console.log("ERROR: ", error);
//                  })

  

  presentPopover(listitem) {
    let popover = this.popoverCtrl.create("LevelpopoverPage",{lacno:listitem.LAC_NO});
    popover.present();
    popover.onDidDismiss(data => {
      if(data!=undefined && listitem !="")
      {
        let index = this.most_visited_list.indexOf(listitem);
        this.most_visited_list[index].difficulty_level=data;
        console.log(data);
      }
   });

  }

Go_to_lacmaster_all(){
  this.navCtrl.push(LacDetails_ListPage);
    // item:this.todo.userID
 }
 Go_to_reminders_all(){
  this.navCtrl.push('RemindersPage');
 }
// doInfinite(infiniteScroll) {
//     console.log('Begin async operation');
//     setTimeout(() => {
//                              var t=0;
//                               this.scroll_count = this.crrlen;
//                               for(let i = this.crrlen; i < this.alllen ; i++)
//                               {
//                                     this.tableItemlist.push(this.allRows[i]);
//                                     this.crrlen++;
//                                     console.log(this.crrlen);
//                                     t++;
//                                     if(t==this.rangelen){

//                                       break;
//                                     }
//                                 }
//                                 this.scroll_count++
//                                  console.log('Async operation has ended');
//                                  infiniteScroll.complete();
//     }, 50);

//   }

// setFilteredItems(searchitem) {
//       let count = 0;
//       console.log(this.allRows);
//          if (searchitem && searchitem.length>=3 && searchitem!=null) 
//          {
//           this.plttot=0
//           this.tableItemlist=this.allRows.filter((item) => {
//               if(item.difficulty_level==null){
//                 item.difficulty_level=""
//                 console.log(item.difficulty_level);
//               }
//            return item.BORR_NAME.toLowerCase().indexOf(searchitem.toLowerCase())> -1
//            ||item.PROP_AREA_DESC.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
//            ||item.LAC_NO.toString().indexOf(searchitem.toString())>-1
//            ||item.FOLLOW_UP.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
//            ||item.EMP_AREA.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
//            ||item.PROP_NAME.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
//            ||item.EMP_COMPANY_NAME.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
//            ||item.my_basket.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
//            ||item.difficulty_level.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
//            ||item.M_OS.toString().indexOf(searchitem.toString())!= -1 ;
//           });

//            for(var i=0;i<this.tableItemlist.length;i++){

//                this.plttot=Number(this.tableItemlist[i].M_OS)+this.plttot;

//            }
//               this.plttot=(this.plttot)/10000000;
//               console.log(this.plttot);
//         }
//           else if(searchitem.length<=2) {
       
//                               this.plttot=this.plt_tot_all;
//                               this.tableItemlist=[];
//                               this.alllen=this.allRows.length;
//                               this.tlen=this.alllen;
//                               this.crrlen = 0;
//                               this.totlen=this.alllen
//                               var t=0;
//                               for(let i = this.crrlen; i < this.alllen ; i++)
//                               {
//                                 this.tableItemlist.push(this.allRows[i]);
//                                 this.crrlen++;
//                                 console.log(this.crrlen);
//                                 t++;
//                                 if(t==10){
//                                   break;
//                                 }
//                               }
//                               this.filter_cnt=0;
//         }
//                       this.filter_cnt=this.tableItemlist.length;
//                       this.scroll_count=this.filter_cnt;
          
//  }

  navigate(card: string,card1:string,index){
    this.last_active_lacno={
      LAC_NO:card,
      last_index:index
    }
    this.navCtrl.push(AcDetailsPage, 
    {
    item:card,
    item2:card1
    }

    );
    console.log(card+""+card1);
     this.lac_no=card;
     this.events.publish('hideHeader', { footerstatus: true,lac:card,borrname:card1});
      this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});
  }

  canWeLoadMoreContent() { // stop the scroll as soon as it reaches the totlen of list
   return (this.scroll_count==this.totlen||this.filter_cnt >= 1) ? false : true;
  }  


///////bucket ///////////////////////////////

navigate_my_basket(listItem){
  let index = this.most_visited_list.indexOf(listItem);
  console.log(index)
  if(this.most_visited_list[index].my_basket!=""){
    this.presentConfirm(listItem,index);
  }
  else{
      let modal = this.modalCtrl.create('BucketPage',{data1:listItem.LAC_NO});
      modal.onDidDismiss(data => {
        if(data!=undefined && listItem.LAC_NO !="")
        {
          let index = this.most_visited_list.indexOf(listItem);
          this.most_visited_list[index].my_basket=data;
          console.log(data);
        }
     });
     modal.present();   
  }
      
}

// navbasket(listItem){

//       let modal = this.modalCtrl.create('BucketPage',{data1:listItem.LAC_NO});
//       modal.onDidDismiss(data => {
//         if(data.length !=0 && listItem.LAC_NO =="")
//         {
//          this.dbProvider.SelectLacMasterPltSum_backet(this.tableItemlist[0].my_basket).then((res)=>{
//          this.plttot=(res[0].plt)/10000000;
//          console.log(this.plttot);

//          })
//                               this.tableItemlist=[];
//                               this.allRows = data;
//                               this.alllen=this.allRows.length;
//                               this.crrlen = 0;
//                               this.totlen=this.tlen;
//                               this.scroll_count=this.alllen;
//                               var t=0;
//                               for(let i = this.crrlen; i < this.alllen ; i++)
//                               {
//                                 this.tableItemlist.push(this.allRows[i]);
//                                 this.crrlen++;
//                                 console.log(this.crrlen);
//                                 t++;
//                                 if(t==10){
//                                   break;
//                                 }
//                                }
//   }

//  });
//  modal.present();
// }


formatNumber (num) {
  return (num / 100000).toFixed(2) + ' Lac'; 
  //return num.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
}

presentConfirm(listItem,index) {
  let alert = this.alertCtrl.create({
    title: 'Confirmation',
    message: 'Do you want to Discard/Edit the basket?',
    buttons: [
      {
        text: 'Discard',
        handler: () => {
        this.most_visited_list[index].my_basket="";
        this.confirm_basket= this.most_visited_list[index].my_basket;
        console.log(this.confirm_basket);
        this.dbProvider.LacMasterMyBasket(listItem.LAC_NO,"")
            .then((result) => {
                              console.log(result+"  "+ this.most_visited_list[index].my_basket);
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })
        }
      },
      {
        text: 'Edit',
        handler: () => {
        let modal = this.modalCtrl.create('BucketPage',{data1:listItem.LAC_NO});
        modal.onDidDismiss(data => {
          if(data!=undefined && listItem.LAC_NO !="")
          {
            let index = this.most_visited_list.indexOf(listItem);
            this.most_visited_list[index].my_basket=data;
            console.log(data);
          }

   });
   modal.present();   
            
        }
      }
    ]
  });
  alert.present();
}

///////--difficulty level---//////////

public openPopover(listItem){
      let modal = this.modalCtrl.create('LevelpopoverPage',{data:listItem.LAC_NO});
      modal.onDidDismiss(data => {
      let index = this.most_visited_list.indexOf(listItem);
      this.most_visited_list[index].difficulty_level=data;
      console.log(data);
});
     modal.present();

  } 

  getColor(followupflag) {
    switch (followupflag) {
      case "true":
        return "blue";
      case "false":
        return "red";
      }
  }

  getColorbasket(basketflag) {
    if(basketflag==undefined || basketflag==""){
            return "red";
    }
    else{
      return "#109a10";
    }
  }



// showRadio() {
//   this.lacsort.LacSort(this.allRows,this.alllen,this.crrlen,this.totlen,this.tableItemlist)
//     .then((result)=>{
//        this.filter_cnt=0;
//                    console.log(result);
//                    this.tableItemlist=[]
//                    this.allRows = result;
//                    this.alllen=this.allRows.length;
//                    this.crrlen = 0;
//                    this.totlen=this.alllen
//                    var t=0;
//                    for(let i = this.crrlen; i < this.alllen ; i++)
//                    {
//                      this.tableItemlist.push(this.allRows[i]);
//                      this.crrlen++;
//                      console.log(this.crrlen);

//                      t++;
//                      if(t==10){
//                        break;
//                      }
//                     }

//                     this.plttot=this.plt_tot_all;
                     

//    })
// }

getUniqueIdDetails(id){
           this.dbProvider.GetUniqueIdDetails(this.lac_no)

            .then((result:any) => {
                               this.uid = result;
                               console.log(this.uid)
                               ////////////unique id plt cnt///////////
                              this.uniq_id_acct=result.length;
                              // this.tableItemlist[id].no_of_acc=this.uniq_id_acct;

                               if(this.uniq_id_acct>0)
                               {
                                 this.plt_tot_cnt=result[result.length-1].sumplt;
                                 this.pltall=(this.plt_tot_cnt);
                                 this.most_visited_list[id].plt_count=this.pltall;
                                 this.plt_tot_cnt="";
                                  console.log(this.pltall);
                               }
                            //  this.uniq_id_acct="";

                            },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
}

click_count_header(lacno){
            this.dbProvider.updateClick_count(lacno).then(res=>{
              console.log(res);
            });
          
}
navg_map(){
  this.navCtrl.push(MapviewscreenPage);
}

clickcheck(){
  this.dbProvider.count_top_basket().then(res0=>{
    this.top_basket=[];
    this.top_basket=res0;
    console.log(this.top_basket);
  }).then(res=>{
    this.dbProvider.count_top_level_try().then(res1=>{
 console.log(res1);

      this.top_diff_level_try= res1[0].cnt_tot_try;      //res1//res1['rows']['item'](0)['cnt_tot_try'];
     // alert(this.top_diff_level_try);
     console.log(this.top_diff_level);
   }).then(re=>{
    this.dbProvider.count_top_level_diff().then(res2=>{
      console.log(res2);
     this.top_diff_level_diff=res2[0].cnt_tot_diff; //res2['rows']['item'](0)['cnt_tot_diff'];
    // alert(this.top_diff_level_diff);
     console.log(this.top_diff_level_diff);
   })

// }
   
   
//   // .catch().then(err=>{
//     console.log(err);
 })

  })
}
//GlobalBucket(){  
//   var listItem={LAC_NO:""}
//   this.navbasket(listItem);
// }

 ionViewDidLoad(){
    //  console.log('ionViewDidLoad LacDetailsPage');
    //    this.dbProvider.Listingmostvisitedlist().then(res=>{
    //     console.log(res);
    //     this.most_visited_list=[];
    //     this.most_visited_list=res;
    //     this.tot_top_count= this.most_visited_list.length;
    //    })
    //    this.dbProvider.SelectLacMasterPltSum().then((res)=>{
    //     this.plttot=(res[0].plt)/10000000;
    //     console.log(this.plttot);
    //     this.plt_tot_all=this.plttot
    //     })
      //  this.dbProvider.count_top_basket().then(res=>{
      
      //   this.top_basket=res;
      //   console.log(this.top_basket);
      // })
    //   this.dbProvider.count_top_level().then(res=>{
    //     //alert('top level');
    //     this.top_diff_level=res;
    //    console.log(this.top_diff_level);
    //  })
  
   //    this.clickcheck();
       
  }

 total_count_tablelist()
{
  var allrows;
  this.dbProvider.LacMasterTableDetails_v1()
      .then((res) => {
                    console.log(res);
                    allrows=res;
                    this.totlen=allrows.length;
                //    alert(this.totlen);
                   // this.totlen=res.length;
                    },
          (error) => {
                    console.log("ERROR: ", error);
      })

 
      
}   

ionViewWillEnter() {

    // this.dbProvider.Listingmostvisitedlist().then(res=>{
    //   console.log(res);
    //   this.most_visited_list=[];
    //   this.most_visited_list=res;
    //   this.tot_top_count= this.most_visited_list.length;
    //  })
    //  this.clickcheck();

    console.log('ionViewDidLoad LacDetailsPage');
    this.dbProvider.Listingmostvisitedlist().then(res=>{
     console.log(res);
     this.most_visited_list=[];
     this.most_visited_list=res;
     this.tot_top_count= this.most_visited_list.length;
    })
    this.dbProvider.SelectLacMasterPltSum().then((res)=>{
     this.plttot=(res[0].plt)/10000000;
     console.log(this.plttot);
     this.plt_tot_all=this.plttot
     })
   //  this.dbProvider.count_top_basket().then(res=>{
   
   //   this.top_basket=res;
   //   console.log(this.top_basket);
   // })
 //   this.dbProvider.count_top_level().then(res=>{
 //     //alert('top level');
 //     this.top_diff_level=res;
 //    console.log(this.top_diff_level);
 //  })

    this.clickcheck();
    this.total_count_tablelist();

        this.events.publish('hidemenu', { menustatus:true });///for hiding menu
         this.events.publish('hideHeader', { footerstatus:false,lac:"",borrname:""});//for hiding footer
         if(this.last_active_lacno!=undefined){
          this.dbProvider.getFollowuoFlag(this.last_active_lacno.LAC_NO).then((res)=>{
            this.most_visited_list[this.last_active_lacno.last_index].followupflag=res[0].followupflag;
            console.log(res);
          })
         }

   this.events.publish('hideheader', { headerstatus:false,navheaderstat:false});
  }



ionViewWillLeave() {
 this.events.publish('hidemenu', { menustatus:false });
 }

toggleList(id,lacno){
this.lac_no=lacno;
if(this.most_visited_list[id].details_flag==undefined || this.most_visited_list[id].details_flag==false){
this.most_visited_list[id].details_flag=true;
}
else
{
  this.most_visited_list[id].details_flag=false;
}

}



GetCustContact(lacno){
  this.dbProvider.GetCustContact(lacno)

         .then((result:any) => {
           
          if(result.length!=0){
            //alert(result[0].contact_det);

            const phoneDialog = this.alertCtrl.create({
              title: 'Mobile Number' ,
              message: '<div>' +
              '<span class="alert_add block"> <img src="assets/imgs/alert_phone.png">'+result[0].contact_det+'</span>' + 
              '</div>',
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
          }
            else{
              alert('No contact found');
              }
                     console.log(result);
                         
                           },
                 (error) => {
                             console.log("ERROR: ", error);
              })
}

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


close(){
  this.viewCtrl.dismiss();
}


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
      '<span class="alert_name block"><img src="assets/imgs/alert_map.png">'+res[0].comm_address+'</span>' +
     
      '</div>',
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




}
