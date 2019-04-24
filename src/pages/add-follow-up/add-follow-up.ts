import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController,LoadingController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Subscription} from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';
import { Events } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Content } from 'ionic-angular';


/**
 * Generated class for the AddFollowUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-follow-up',
  templateUrl: 'add-follow-up.html',
})
export class AddFollowUpPage {
    @ViewChild('scroll') scroll: any;

addfollowup:FormGroup;
  showList: boolean = false;
  showList1: boolean = false;
  showList2: boolean = false;
  showList3: boolean = false;
  showList4: boolean = false;
  showList5: boolean = false;
  items: string[];
  public network_flag:any=0
  value:any;
  name:any;
  list:any;
  list1:any;
  data:any;
 citype;
 riskevent;
  ldap_id:any;
  id:any;
  sessionid:any;
  table_id=209;
  result:any;
  action:any;
  areacode:any;
  response:any;
  obscd:any;
  acntobe:any;
  gflag:boolean=false;
  crosslinkactn;
  cross=[];  
  actioncross:any;
  selected_Array:any;
  AmtChargcrosslink:any;
  crosslinkindex:any;
  myrows=6;
  crossflag:boolean=false;
 today_date = new Date();
error:any={isError:false,errorMessage:''};
error1:any={isError:false,errorMessage:''};
tdate=this.datePipe.transform(this.today_date,"yyyy-MM-dd");
version_no:any=3;
crosslinks:any;
saveflag:boolean=false;
connected: Subscription;
disconnected: Subscription;
resultsessn:any;
today:any
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dbProvider:DbProvider,
    public modalCtrl:ModalController,
    private formbuilder :FormBuilder,
    public restProvider: RestProvider,
    public toastCtrl:ToastController,
    private network: Network,
    public events:Events,
    private datePipe: DatePipe,
    public loadingCtrl:LoadingController) {
     this.data=this.navParams.get('lac')
    this.addfollowup = this.formbuilder.group({'action' : ['', Validators.required],
                                                     'areacode' :  [''],
                                                     'ActionDate': ['', Validators.required],
                                                     'response' : ['', Validators.required],
                                                     'ObsCd' :  ['', Validators.required],
                                                     'NextActionDate' : ['', Validators.required],
                                                      'ActionToBe' : ['', Validators.required] , 
                                                      'AmtSpent' : ['',  Validators.compose([Validators.pattern("^[0-9]{1,6}$")])] , 
                                                      'AmtCharg' : ['',  Validators.compose([Validators.pattern("^[0-9]{1,6}$")])],  
                                                      'CiType' : [] , 
                                                      'Remark': ['', Validators.required],
                                                      'ActionType': ['', Validators.required],
                                                      'RiskEvent': ['', Validators.required],
                                                     
        });  
    this.addfollowup.controls.ActionType.setValue('P');
    this.today ="2020"//new Date().getFullYear() + 1;
  }

  Getfuaction_ci_type(){
     this.dbProvider.fuaction_ci_type()

            .then((result) => {
                              this.citype = result;
                               console.log(result);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
  }


  Getfuaction_risk_event(){
       this.dbProvider.fuaction_risk_event()
       .then((result) => {
                              this.riskevent = result;
                               console.log(result);
                              },
                    (error) =>{
                               console.log("ERROR: ", error);
                 })
  }


getItems1(index,event) {
    // Reset items back to all of the items
    this.crosslinkindex=index;
   // console.log(this.addfollowup.controls.action.value);
    this.name='ACTION_CD';
   // this.crosslinkactn=this.cross;
    console.log(this.cross);
     let val = event.target.value;
    // this.selected=val;
     console.log(val);
     this.value=event.target.value;
   
  console.log(name+""+val);
    //set val to the value of the searchbar
   
    // if the value is an empty string don't filter the items
    if (val && val.trim() != ''&&val.length>1) {
  
        this.dbProvider.f_action_search(this.name,val)

            .then((result) => {
              console.log(name+" "+val);
                              this.list = result;
                               console.log(this.list);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
 
      // Show the results
      this.showList5 = true;
      
  }

    else {
      
      // hide the results when the query is empty
        this.showList5 = false;
       this.list=null;
    }
  }



 getAmtChrg(index,event){
       
         this.crosslinks[index].amount_cr_cl=event.target.value;;
 }


getItems_all(name,event,listid) {
   let val = event.target.value;
    if (val && val.trim() != ''&& val.length>=2) {
    console.log(val.length);
        this.dbProvider.f_action_searchareacode(name,val)

            .then((result) => {
              console.log(name+" "+val);
                            this.list1 = result;
                              console.log(this.list1);


                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })

           this['showList'+listid]=true;
     }
    else 
    {
      this['showList'+listid]=false;
    }
  }
 


 /////////////////////////////////////////////////////////
//////on select of specific value from list//////////////
////////////////////////////////////////////////////////


optionscross(val,desc){
  this.crosslinkactn=desc;
  this.crosslinks[this.crosslinkindex].action_cl=desc;
  this.crosslinks[this.crosslinkindex].action_cl_val=val;
  this.actioncross=val;
  this.showList5=false;
  console.log(this.crosslinkactn);
  console.log(this.crosslinkactn,this.action);
}
 setValue_All(val,desc,listid,desc_to,value_To,nextElement){

 this['showList'+listid]=false;

 this.list1=[];

var key = desc_to;
var obj = {};
obj[key] =desc
console.log(obj[key]);
 this.addfollowup.patchValue(obj);
 this[value_To]=val
 console.log(val,desc,listid,desc_to,value_To);
    // nextElement.setFocus();
 //   this.content.scrollTo(0, nextElement)



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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Fu_ActionInsertData(){
  console.log(this.addfollowup.value.ActionType);
  var authobj
   if(this.network.type!='none')
    {
     this.dbProvider.insertIntonew_fu_action(this.data,
       this.addfollowup.value.ActionType,
       this.addfollowup.value.RiskEvent,
       this.areacode,
       this.addfollowup.value.AmtSpent,
       this.action,
       this.response,
       this.acntobe,
       this.obscd,
       this.addfollowup.value.NextActionDate,
       this.addfollowup.value.CiType,
       this.addfollowup.value.AmtCharg,
       this.addfollowup.value.Remark,
       this.addfollowup.value.ActionDate,
       this.ldap_id,
       this.version_no)
            .then((result) => {
                                  this.gflag=true;
                                  this.result=result;
                                   let loading = this.loadingCtrl.create({
                                    content: 'Please wait..',
                                      spinner: 'crescent'
                                    });
                                  loading.present(); 
                                this.restProvider.generateToken({}).then((res1:any)=>{
                                this.resultsessn =res1;
                              console.log("sessionid",res1);
                          }).then((res1)=>{
                              this.restProvider.uploadData(this.table_id,result,this.resultsessn.SYNC_INFO[0].SESSION_ID)
                                  .then(res => { 
                                   console.log(this.table_id);
                                   console.log(res);
                                   authobj=res;
                                   if(authobj.UploadTable[0].RETURN_CODE==0)
                                   {
                                   let toast = this.toastCtrl.create({
                                   message: 'uploaded successfully',
                                   duration: 5000
                                   
                                   });
                                   this.events.publish('headercolor', {hcolor:this.gflag,lacno:this.data});
                                   toast.present(); 
                                   this.saveflag=true;
                                   this.dbProvider.Delete_new_fu_action(this.data).then((result=>{
                                  }))
                                  loading.dismiss();
                                  this.dbProvider.updatefollowupflag(this.gflag,this.data).then(()=>{
                                  console.log("followup flag updated");
                                  console.log(this.gflag);
                                })
                                 }
                                 else
                                 {
                                   let toast = this.toastCtrl.create({
                                     message: 'upload error pls try again',
                                     duration: 5000
                                     });
                                     toast.present(); 
                                 }
     
                                 })
                })
                                  
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                                
                 })
          }
        else
       {
         let toast = this.toastCtrl.create({
                                  message: 'data stored locally.To Upload Please turn your internet ON',
                                  duration: 5000
                                  });
                                  toast.present();

 this.dbProvider.insertIntonew_fu_action(this.data,
       this.addfollowup.value.ActionType,
       this.addfollowup.value.RiskEvent,
       this.areacode,
       this.addfollowup.value.AmtSpent,
       this.action,
       this.response,
       this.acntobe,
       this.obscd,
       this.addfollowup.value.NextActionDate,
       this.addfollowup.value.CiType,
       this.addfollowup.value.AmtCharg,
       this.addfollowup.value.Remark,
       this.addfollowup.value.ActionDate,
       this.ldap_id,
       this.version_no)

            .then((result) => {
                this.result=result;
                console.log(this.result);
                this.saveflag=true;

              })
       }
}



clUpload(lac_no_cl,actioncross,AmtChargcrosslink){
   var authobj1;
     this.dbProvider.insertIntonew_fu_action(lac_no_cl,
       this.addfollowup.value.ActionType,
       this.addfollowup.value.RiskEvent,
       this.areacode,
       this.addfollowup.value.AmtSpent,
       actioncross,
       this.response,
       this.acntobe,
       this.obscd,
       this.addfollowup.value.NextActionDate,
       this.addfollowup.value.CiType,
       AmtChargcrosslink,
       this.addfollowup.value.Remark,
       this.addfollowup.value.ActionDate,
       this.ldap_id,
       this.version_no)
            .then((result) => {
                           this.gflag=true;
                          
                            this.result=result;
                             let loading = this.loadingCtrl.create({
                                    content: 'Please wait..',
                                      spinner: 'crescent'
                                    });
                                  loading.present(); 

                                   this.restProvider.generateToken({}).then((res1:any)=>{
                                this.resultsessn =res1;
                              console.log("sessionid",res1);
                          }).then((res1)=>{
                              this.restProvider.uploadData(this.table_id,result,this.resultsessn.SYNC_INFO[0].SESSION_ID)
                             .then(res => { 
                              console.log(this.table_id);
                              console.log(res);
                              authobj1=res;
                              if(authobj1.UploadTable[0].RETURN_CODE==0)
                              {
                              let toast = this.toastCtrl.create({
                              message: 'uploaded successfully',
                              duration: 5000
                              });
                             
                              console.log(this.gflag);
                              this.events.publish('headercolor', {hcolor:this.gflag,lacno:this.data});
                              console.log(this.gflag);
                              toast.present(); 
                              this.dbProvider.Delete_new_fu_action(lac_no_cl).then((result=>{
                             }))
                              loading.dismiss();
                              this.dbProvider.updatefollowupflag(this.gflag,this.data).then(()=>{
                                  console.log("followup flag updated");
                                })
                               
                            }
                            else
                            {
                              let toast = this.toastCtrl.create({
                                message: 'upload error pls try again',
                                duration: 5000
                                });
                                toast.present(); 
                            }

                            })
                          }) 
                           
                               
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                                
                 })
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////actioncross
Fu_ActionInsertDataCrosslinks(){
  var authobj1
  console.log(this.crosslinks);

for(var i=0;i<this.crosslinks.length;i++){
  var lac_no_cl=this.crosslinks[i].lac_no1;
  this.actioncross=this.crosslinks[i].action_cl_val;
  console.log(this.actioncross);
  console.log()
  this.AmtChargcrosslink=this.crosslinks[i].amount_cr_cl;
  console.log(this.actioncross,this.AmtChargcrosslink);

  if(this.actioncross==""||this.actioncross==undefined)
  {
  alert('Pls select action type in cross link');
  return false;
  }
  else
  {
  if(this.network.type!='none')
    {

      this.clUpload(lac_no_cl,this.actioncross,this.AmtChargcrosslink);

     }
  else
    {
      let toast = this.toastCtrl.create({
                                  message: 'data stored locally.To Upload Please turn your internet ON',
                                  duration: 5000
                                  });
                                  toast.present();

       this.dbProvider.insertIntonew_fu_action(lac_no_cl,this.addfollowup.value.ActionType,
       this.addfollowup.value.RiskEvent,
        this.areacode, this.addfollowup.value.AmtSpent,
        this.actioncross,this.response,
        this.acntobe,
        this.obscd,
        this.addfollowup.value.NextActionDate,    
        this.addfollowup.value.CiType,
        this.AmtChargcrosslink,
        this.addfollowup.value.Remark,
        this.addfollowup.value.ActionDate,
        this.ldap_id,
        this.version_no)
            .then((result) => {
                this.result=result;
                console.log(this.result);
              })
    }

}

}
}

resetForm() { 
    this.addfollowup.reset();
} 
getcrossDetails(){
   this.dbProvider.SelectCrossLinkDetails(this.data).then((result)=>{
    this.crosslinks=result;
    if(this.crosslinks.length>0){
     this.crossflag=true; 
  }
    console.log(this.crosslinks);
  })
}

////////////////////////date/////////////////////////////////////////////////////

compareTwoDate1(){
  console.log(this.tdate);

  if(this.addfollowup.value.ActionDate > this.tdate){
     this.error={isError:true,errorMessage:"Action date cannot be future date"};
     console.log("End ActionDate can't be a future date");
   }
   else{
   //   this.content.scrollTo(0, 300)
    this.error={isError:false,errorMessage:" "}; 
   }
   
  }
  compareTwoDate2(){
   if(this.addfollowup.value.NextActionDate < this.tdate){
     this.error1={isError:true,errorMessage:"Next action date should be future date"};
     console.log("End NextDate can't be a past date");
   }
   else{
   //   this.content.scrollTo(0, 580)
     this.error1={isError:false,errorMessage:" "};
   }
   
  }

////////////////////////////////////////////////////////////////////////////

  ionViewDidLoad() {
   

    this.getcrossDetails();
    this.getSessionId();
    this.getuserid();
    this.Getfuaction_ci_type();
    this.Getfuaction_risk_event();
    console.log('ionViewDidLoad AddFollowUpPage');
  }
  getMaxDATE(){
    return new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString();


  }
  

}
