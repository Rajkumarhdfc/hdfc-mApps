import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,NavParams,ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DbProvider } from '../../providers/db/db';
import { LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Firebase } from '@ionic-native/firebase';


@IonicPage()
@Component({
  selector: 'page-table-list',
  templateUrl: 'table-list.html',
})

export class TableListPage {
    rflag:boolean=false;
    loading: any;
    tabledata:any;
    App_Master: any;
    UserID: any;
    displayData:  any;
    seconds: number;
    minutes: number;
    timer: any;
    percentLoad:number;
    tabletype='D';
    viewtableid='S';
    full_sync;
    countBaskandDiff:any;
    sessionid:any;
    tablestartsyncData =[{"MAXTIMESTAMP":"","TABLE_ID":200,"TABLE_NAME":"PDANEW_LAC_MASTER","TABLE_TYPE":"D","SYNC_FLAG":1},{"MAXTIMESTAMP":"","TABLE_ID":204,"TABLE_NAME":"PDANEW_LAC_FU_ACTION","TABLE_TYPE":"D","SYNC_FLAG":1},{"MAXTIMESTAMP":"","TABLE_ID":205,"TABLE_NAME":"PDANEW_LAC_DETAILS","TABLE_TYPE":"D","SYNC_FLAG":1},{"MAXTIMESTAMP":"","TABLE_ID":206,"TABLE_NAME":"PDANEW_EMI_TRANS","TABLE_TYPE":"D","SYNC_FLAG":1}];

    constructor(public navCtrl: NavController, 
                public navParams :NavParams ,
                public loadingCtrl:LoadingController,
                public restProvider: RestProvider,
                public dbProvider : DbProvider,
                 private network: Network,
                 public toastCtrl:ToastController
)
    {
            this.UserID =  this.navParams.get("UserID"); 
            this.full_sync=this.navParams.get("full_sync"); 
            console.log(this.full_sync);
             console.log(this.UserID);       
             this.displayData = []; 
             this.displayData =[];
    }  

    

    startSync(){ 
        if(this.network.type=='none')
    {

         let toast = this.toastCtrl.create({
              message: 'Please Check Internet Connection',
              duration: 3000
              });
              toast.present();

     }
     else{
            new Promise((resolve,reject) => {
            this.timerStart();
            this.loadingSpinner();
            console.log("startsync clicked");

             if(this.displayData.length == 0){
                this.restProvider.generateToken({}).then(data => {  
                this.App_Master = data;   
                
                if(data==''||data==undefined){
                  alert("cannot sync");
                  return ;
                }
                this.addtoAppTableMasterData(this.App_Master).then(res =>{

                    if(this.displayData.length == 0){ 
                            this.dbProvider.TablelistAppTableMaster().then(result => {
                                this.displayData = result;
                                this.displayData.forEach(function(v) {
                                v.ROW_COUNT = 'Pending';
                            })
                        });
                    }
                  //  console.log("sessionid updated",this.App_Master.SYNC_INFO[0].SESSION_ID);

                 this.dbProvider.updateSessionID(this.App_Master.SYNC_INFO[0].SESSION_ID, this.UserID).then((res)=>{
                      console.log("sessionid updated",this.App_Master.SYNC_INFO[0].SESSION_ID);
                    }).catch(e=>console.log(e))                  
                 //  alert(this.App_Master.SYNC_INFO[0].SESSION_ID);
                    this.callDownloadData(this.App_Master.TABLE_LIST);
                });
            });   
             }
             else
            {
            //select level nd my basket
                 this.dbProvider.SelectMyBasketndDifflvl().then(res=>{
                     console.log(res);
                     this.countBaskandDiff=res;
                 }).then(res =>{
                     if(this.full_sync=="Y"){
                    this.clearSync().then((res)=>{
                    if(this.displayData.length != 0){
                    this.displayData.forEach(function(v) {
                    v.ROW_COUNT = 'Pending';
                    v.SYNC_FLAG = 1;
                }) 
            }

            this.restProvider.generateToken({}).then(data => {  
                this.App_Master = data;                                        
                this.addtoAppTableMasterData(this.App_Master).then(res =>{
                    if(this.displayData.length == 0){ 
                            this.dbProvider.TablelistAppTableMaster().then(result => {
                                this.displayData=result;
                                this.displayData.forEach(function(v) {
                                v.ROW_COUNT = 'Pending';
                            })
                        });
                    }
                      console.log("sessionid updated",this.App_Master.SYNC_INFO[0].SESSION_ID);
                      console.log(this.UserID);
                    this.dbProvider.updateSessionID(this.App_Master.SYNC_INFO[0].SESSION_ID, this.UserID).then((res)=>{
                      console.log("sessionid updated",this.App_Master.SYNC_INFO[0].SESSION_ID);
                    }).catch(e=>console.log(e))
                    this.sessionid = this.App_Master.SYNC_INFO[0].SESSION_ID;
                    this.callDownloadData(this.App_Master.TABLE_LIST);
                });
            });   
        }) 
       }
       else{
            this.clearSync_filter().then((res)=>{
                    if(this.displayData.length != 0){
                    this.displayData.forEach(function(v) {
                    v.ROW_COUNT = 'Pending';
                    v.SYNC_FLAG = 1;
                }) 
            }

            this.restProvider.generateToken({}).then(data => {  
                this.App_Master = data;                                        
                this.addtoAppTableMasterData(this.App_Master).then(res =>{
                    console.log(this.displayData);
                    if(this.displayData.length == 0){ 
                            this.displayData.forEach(function(v) {
                                v.ROW_COUNT = 'Pending';
                            })
                    }
                    this.dbProvider.updateSessionID(this.App_Master.SYNC_INFO[0].SESSION_ID, this.UserID);  
                   console.log("sessionid updated",this.App_Master.SYNC_INFO[0].SESSION_ID);
                     this.sessionid = this.App_Master.SYNC_INFO[0].SESSION_ID;
                    this.callDownloadData(this.displayData);
                });
            });   
        }) 


       }
                
                })
        }

      })

     }
        
        
    }

    addtoAppTableMasterData(app_master){
       console.log("Inserting into App_Table_Master")
        let promises = [];
        if(app_master.TABLE_LIST==undefined){
          this.DismissSpinner();
            this.timerStop();
            alert("error while syncing");
            window["FirebasePlugin"].logEvent("syncerror", {param1:this.UserID,errflag:app_master.TABLE_LIST});
        }
        else{
           if(app_master.TABLE_LIST.length!=null){
            for (let i = 0; i < app_master.TABLE_LIST.length; i++) {
            promises.push(new Promise((resolve, reject) => {
                this.dbProvider.insertIntoAppTableMaster(app_master.TABLE_LIST[i].TABLE_ID,
                                                         app_master.TABLE_LIST[i].TABLE_NAME,
                                                         app_master.TABLE_LIST[i].TABLE_TYPE,
                                                         app_master.TABLE_LIST[i].MAXTIMESTAMP,
                                                         app_master.TABLE_LIST[i].SPECIAL_ACTION)
                .then(res => { 
                    if(this.displayData.length != 0){
                        this.displayData.findIndex(function(v){
                            if(v.TABLE_ID == app_master.TABLE_LIST[i].TABLE_ID){
                                v.LAST_SYNC_ON = res['rows']['item'](0).LAST_SYNC_ON;
                            }
                        })
                    }
                  resolve();
               })
          }).catch(e=>{
            this.DismissSpinner();
            this.timerStop();
            alert("error while syncing");
            console.log(e)
          })
            )
        }
        }
        return Promise.all(promises)
        }
    }

  callDownloadData(tableList){     
        let callDataPromises = [];
        let iCnt = 0;
        let iCntDisplayData = this.displayData.length ;
        let sLastSyncOn;
        
        for (let i in tableList){   
            sLastSyncOn = "";                       
            if (tableList[i].TABLE_TYPE === 'D'||tableList[i].TABLE_TYPE === 'S'){ 
                console.log(tableList[i].TABLE_TYPE);
                callDataPromises.push(new Promise((resolve, reject) => {                                  
                    this.displayData.findIndex(function(v){ 
                        if(v.TABLE_ID == tableList[i].TABLE_ID){
                            v.ROW_COUNT = 'Syncing';
                            sLastSyncOn = v.LAST_SYNC_ON;
                        }
                    })  
                    this.restProvider.downloadData(tableList[i],sLastSyncOn).then(downloadDtaObj => { 
                        this.displayData.findIndex(function(v){
                            if(v.TABLE_ID == tableList[i].TABLE_ID){
                                v.ROW_COUNT = 'Data Processing';
                            }
                        })              
                        this.dbProvider.executeDownloadScript(downloadDtaObj).then((res)=> {
                            console.log("executeDownloadScript");
                            this.dbProvider.updateRowCount_v1(tableList[i].TABLE_NAME).then(()=>{
                                console.log("updateRowCount_v1");
                                this.dbProvider.getTableIdDetails(tableList[i].TABLE_NAME).then(result =>{ 
                                    console.log("getDisplayData");
                                    this.displayData.findIndex(function(element){ 
                                        if (element.TABLE_ID == result[0].TABLE_ID){
                                            if(element.ROW_COUNT != "")
                                            {
                                                element.SYNC_FLAG = 0 ;
                                                element.ROW_COUNT = result[0].ROW_COUNT;                                                
                                                iCnt++;
                                            }
                                            else
                                            {
                                                element.ROW_COUNT = "-1"
                                            }
                                        }
                                    });
                                    
                                    if (this.displayData.length == iCnt){  
                                        console.log(iCnt)
                                    //update
                                      if(this.countBaskandDiff!=undefined){
                                         for(var i=0;i<this.countBaskandDiff.length;i++){
                                            this.dbProvider.UpdLevelandBasket(this.countBaskandDiff[i].lac_no,this.countBaskandDiff[i].difficulty_level,this.countBaskandDiff[i].basket,this.countBaskandDiff[i].level_remarks).then(res=>{
                                             console.log(this.countBaskandDiff[i].lac_no,this.countBaskandDiff[i].difficulty_level,this.countBaskandDiff[i].basket);
                                             console.log(res);
                                            })
                                        }
                                  }
                                       console.log("call data complete1");    
                                       window["FirebasePlugin"].logEvent("syncCompleted", {param1:this.UserID,syncflag:this.full_sync});
    
                                        this.DismissSpinner();
                                        this.timerStop();
                                    }
                                });
                            }); 
                        });            
                    });
                    resolve();
                })
                )
            } 
         
        }
        return Promise.all(callDataPromises)
    }



   CotinuetoDashboard(){ 
      this.navCtrl.push('LacDetailsPage');
   }

    clearSync_filter(){
     return new Promise ((resolve, reject) => { 
      let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
         
           this.dbProvider.clearsynctable_1().then(()=>{
              // loading.present().then(() => {  
                 //this.loadData().then(() => { 
                this.minutes = 0;
                this.seconds = 0;
                this.displayData.forEach(function(v){
                v.LAST_SYNC_ON = "";
           // })
                resolve();                          
              loading.dismiss();
            })    
        
        })
         })
       
    }   

   clearSync(){
     return new Promise ((resolve, reject) => { 
      let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
         
           this.dbProvider.clearsynctable().then(()=>{
                loading.present().then(() => {   
                this.loadData().then(() => {
                this.minutes = 0;
                this.seconds = 0;
                this.displayData.forEach(function(v){
                v.LAST_SYNC_ON = "";
            })
            resolve();                          
              loading.dismiss();
            })    
           })
             
             })})
       
    }   
  
    loadData(){
     
      return new Promise ((resolve, reject) => {
            this.dbProvider.TablelistAppTableMaster().then(result => {
                this.displayData = result;
                console.log("loadData");
                console.log(this.displayData,this.displayData.length);
                 
                if(this.displayData.length == 0){
                    debugger;
                    this.startSync();
                }
                resolve();
            })
        })
   }
   refreshData(){
     
      return new Promise ((resolve, reject) => {
            this.dbProvider.TablelistAppTableMaster_refresh().then(result=> {
                 this.displayData=this.tablestartsyncData;
                  if(this.displayData.length == 0){
                      debugger;
                    this.startSync();
                  }
                resolve();
            })
        })
   }
   

 timerStart(){
        this.seconds = 0;
        this.minutes = 0;
        this.timer = setInterval(() => {
            this.seconds ++;
            if(this.seconds == 60){
                this.minutes = this.minutes + 1;
                this.seconds = 0;
            } 
        }, 1000);       
    }

    timerStop(){
        clearInterval(this.timer);
    }   

  loadingSpinner(){
        this.loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        }); 
        this.loading.present();
    }

    DismissSpinner(){
        this.loading.dismissAll();
    }

    ngOnInit(){
        if(this.full_sync=="Y"){
             this.loadData().then(() => {
       })
         }
         else{
             this.rflag=true;
               this.refreshData().then(() => {
               console.log('inside refresh')
       })
         }
   
     
 }

  
 
}

     