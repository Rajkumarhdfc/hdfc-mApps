import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams,AlertController,LoadingController,ToastController,Events} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DbProvider } from '../../providers/db/db';
import { Subscription} from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';
import { Base64 } from '@ionic-native/base64';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
userData:any;
todo = { userID : "" , password : ""  };
loading: any;
displayData:any;
data:any;
refresh:any;
common:any;
sessionid:any;
upload_count:any;
table_type='D';
difflevel:any;
id:any;
ldap_id:any;
authobj:any;
totprop:any;
totcontact:any;
totfollup:any;
table_id_prop_class=229;
table_id_contact_upd=230;
table_id_add_follow_upd=209;
photoupldcount:any;
total_upd_cnt:number=0;

constructor(public navCtrl: NavController,private base64: Base64,
  public navParams: NavParams,
  public alertCtrl:AlertController,
  public loadingCtrl:LoadingController,
  public restProvider: RestProvider,
  public dbProvider : DbProvider,
  public toastCtrl:ToastController,
  private network: Network,
  public events:Events
  ) 
  {
    
  	this.userData = this.navParams.get('UserID');
    console.log(this.userData);
	  this.todo.userID = this.userData;	
    this.dbProvider.CreateTablePhotoSave().then((res)=>{
      console.log(res);
    })
  }
  
navigate_continue(){

this.navCtrl.push('LacDetailsPage', {UserID: this.todo.userID});     

}
navigate_reminders(){
this.navCtrl.push("RemindersPage");     
}
goBackToMain(){

  this.events.publish('goback','');

}
navigate_reportissue(){
	this.navCtrl.push("ReportIssuePage");
}
navigate_Sync(){
console.log(this.todo.userID)
 this.navCtrl.push('TableListPage',{UserID:this.todo.userID,full_sync:'Y'});     
}


clearlevel(){

  // for (let i=0; i<1; i++){
  //  let x = 10/i; // Arithmetic exception
  //   }

  this.dbProvider.ClearLevelUpdate().then((res)=>{
    console.log('level cleared');
    alert('Level cleared');
})

}


presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirmation',
    message: 'Do you want to view your reminders?',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
        this.navCtrl.push("RemindersPage");     
         
        }
      },
      {
        text: 'Cancel',
        handler: () => {
        	this.navCtrl.push('LacDetailsPage', {UserID: this.todo.userID});     
          	
        }
      }
    ]
  });
  alert.present();
}

/////////////////////////////////////Refresh////////////////////////////////////////////////////////////////////

refreshData(){
    this.navCtrl.push('TableListPage',{UserID:this.todo.userID,full_sync:'N'});     
 }


   
getuserid(){
  this.dbProvider.getAppMasterUserID().then((result)=>{
    this.id=result;
    this.ldap_id=this.id.UserID
    console.log(this.ldap_id);
  })
}

  getSessionId(){
  this.dbProvider.getsessionid().then((result)=>{
  var sid:any;
  sid=result;
  this.sessionid=sid.SessionId;
  console.log(this.sessionid);
})
}

public SelectAllPropclass(){
  new Promise((resolve,reject) => {
    this.dbProvider.selectallPropClass().then((res:any)=>{
             console.log(res);
             this.totprop=res.length;
                 if(res.length!=0){
                  this.restProvider.uploadData(this.table_id_prop_class,res,this.sessionid)
                  .then(response => { 
                    console.log(response);
                   this.authobj=response;
                    if(this.authobj.UploadTable[0].RETURN_CODE=="0")
                               {
                                 let toast = this.toastCtrl.create({
                                 message: 'uploaded successfully',
                                 duration: 500
                                 });
                                 toast.present();
                                 this.dbProvider.deleteallPropClass().then((result)=>{
                                 this.dbProvider.GlobalUpload().then((result)=>{
                                  console.log(result);
                                  let count=result[0].totalcount;
                              /////////////////update upload count/////////////////////////
                                   this.upload_count=count;
                                   console.log(this.upload_count);
                                 })
                                 console.log(result);
                               })
                            }

                             else
                             {
                             let toast = this.toastCtrl.create({
                               message: 'upload error pls try again',
                               duration: 2500
                               });
                               toast.present(); 
                             }
                 })

                 }
    resolve(res);
         })
  })

}

SelectAllFuAction(){
  new Promise((resolve,reject) => {

    this.dbProvider.selectallnew_fu_action().then((res:any)=>{
           console.log(res)
               if(res.length!=0){

                  this.restProvider.uploadData(this.table_id_add_follow_upd,res,this.sessionid)
                .then(response => { 
                             console.log(response);
                              this.authobj=response;
                               if(this.authobj.UploadTable[0].RETURN_CODE=="0")
                               {
                                 let toast = this.toastCtrl.create({
                                 message: 'uploaded successfully',
                                 duration: 500
                                 });
                                 toast.present();
                                this.dbProvider.deleteallnew_fu_action().then((result)=>{
                                  this.dbProvider.GlobalUpload().then((result)=>{
                                      console.log(result);
                                      let count=result[0].totalcount;
                                /////////////////update upload count/////////////////////////
                                     this.upload_count=count;
                                     console.log(this.upload_count);
                                   })
                                    console.log(result);
                                })
                               }
                             else
                             {
                             let toast = this.toastCtrl.create({
                               message: 'upload error pls try again',
                               duration: 4000
                               });
                               toast.present(); 
                             }
                 })
               }
 
         })
  return resolve();

  })

}

SelectAllContactUpd(){
new Promise((resolve,reject) => {
     this.dbProvider.selectallContact_Update().then((res:any)=>{
           console.log(res)
               if(res.length!=0){
                   this.restProvider.uploadData(this.table_id_contact_upd,res,this.sessionid)
                   .then(response => { 
                             console.log(response);
                              this.authobj=response;
                               if(this.authobj.UploadTable[0].RETURN_CODE=="0")
                               {
                                 let toast = this.toastCtrl.create({
                                 message: 'uploaded successfully',
                                 duration: 500
                                 });
                                 toast.present();
                                 this.dbProvider.deleteallContact_Update().then((result)=>{
                                 this.dbProvider.GlobalUpload().then((result)=>{
                                 console.log(result);
                                  let count=result[0].totalcount;
                        /////////////////update upload count/////////////////////////
                                 this.upload_count=count;
                                 console.log(this.upload_count);
                                   })
                                 console.log(result);
                               })
                               }
                             else
                             {
                             let toast = this.toastCtrl.create({
                               message: 'upload error pls try again',
                               duration: 4000
                               });
                               toast.present(); 
                             }
                 })
               }
                        
         })
  resolve();
})
  
}

globalupload(){
if(this.network.type=="none"){
      let toast = this.toastCtrl.create({
                                 message: 'Check Internet Connection',
                                 duration: 2500
                                 });
                                 toast.present();
    }
    else{
   this.dbProvider.SelectLevelUpd().then(res=>{
   this.difflevel=res;
   console.log(this.difflevel);
  if(this.difflevel.length!=0){
     for(var i=0;i<this.difflevel.length;i++){
       this.restProvider.Level_Upd(this.difflevel[i].LAC_NO,this.difflevel[i].LEVEL1,this.difflevel[i].REMARK).then((res)=>{
         console.log(res);
       })
     }
   }
})
  
if(this.upload_count==0&&this.photoupldcount==0)
     {
       console.log("all the records alreay uploaded");
       alert("All the records alreay uploaded");
       // this.total_upd_cnt=Number(this.upload_count)+Number(this.photoupldcount);

     }

   else
   {
     this.SelectAllPropclass();
     this.SelectAllFuAction();
     this.SelectAllContactUpd();
     this.globaluploadPhoto();
     this.total_upd_cnt=0;

    }
    }

 }


  ionViewDidLoad() {
     this.dbProvider.GlobalUpload().then((result)=>{
      console.log(result);
      let count=result[0].totalcount;
/////////////////update upload count/////////////////////////
     this.upload_count=count;
     console.log(this.upload_count);
      this.total_upd_cnt=Number(this.upload_count)+Number(this.photoupldcount);

   })
    this.getSessionId();
    console.log('ionViewDidLoad MenuPage');
  }



ionViewWillLeave(){
     this.events.publish('hideheader', { headerstatus:false,navheaderstat:false});
}

ionViewDidEnter() {

 this.dbProvider.GlobalUpload().then((result)=>{
      console.log(result);
      let count=result[0].totalcount;
/////////////////update upload count/////////////////////////
     this.upload_count=count;
     console.log(this.upload_count);
        this.total_upd_cnt=Number(this.upload_count)+Number(this.photoupldcount);

   })

 this.dbProvider.PhotoUploadcount().then((result)=>{
      console.log(result);
      let countphoto =result[0].photoupcnt;
/////////////////update upload count/////////////////////////
     this.photoupldcount=countphoto;
     console.log(this.photoupldcount);
     this.total_upd_cnt=Number(this.upload_count)+Number(this.photoupldcount);

   })
   this.events.publish('hideheader', { headerstatus:false,navheaderstat:false});
}



globaluploadPhoto(){
  new Promise((resolve,reject) => {
     this.dbProvider.selectPhotoUpload().then((res:any)=>{
       for(var i=0;i<res.length;i++){
        this.encodebase64image(res[i].LAC_NO,res[i].PhotoType,res[i].Path,res[i].Photourl,res[i].prop_no,i+1,res.length)
       }
     })
       resolve();

  })
}

encodebase64image(lacno,phototype,file_name,fileurl,propno,index,resp_length){
       let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
        loading.present()
        this.base64.encodeFile(fileurl).then((base64File: string) => {
        base64File=base64File.split(",")[1];
        console.log(base64File); 
          this.restProvider.
          uploadphoto(lacno,this.ldap_id,propno,file_name,this.sessionid,base64File).
          then((res:any)=>{
          console.log(res);
              if(res.UploadDocument[0].RETURN_CODE==0)
                                   {
                                     console.log(index);
                                   }
                                   else{
                                       let toast = this.toastCtrl.create({
                                       message: 'Error in upload',
                                       duration: 2500
                                   });

                                     
                                   }
         loading.dismiss();
         this.dbProvider.DeleteTablePhotoUpld().then((res)=>{
        if(index==resp_length){
        }
         console.log("deleted photos",res);
           this.photoupldcount=0;
         })
            })
        }, (err) => {
            loading.dismiss();
          console.log(err);
        });

}

}
