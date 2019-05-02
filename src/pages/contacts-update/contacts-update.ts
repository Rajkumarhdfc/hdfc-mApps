import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,ToastController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Subscription} from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';
/**
/**
 * Generated class for the ContactsUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts-update',
  templateUrl: 'contacts-update.html',
})
export class ContactsUpdatePage {
@ViewChild(Content) content: Content;

ContactsUpdate:FormGroup;

  data:any;
  sessionid:any;
  ldap_id:any;
  id:any;
  table_id=230;
  result;
  borr_rln:any;
connected: Subscription;
disconnected: Subscription;
resultsessn:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public dbProvider:DbProvider,private formbuilder :FormBuilder,public restProvider: RestProvider,public toastCtrl:ToastController, private network: Network) {
         this.data=this.navParams.get('lac')
          console.log(this.data);
              this.ContactsUpdate = this.formbuilder.group({'name' : ['', Validators.required],
                                                     'Relation' : ['', Validators.required],
                                                     'Address1' : ['', Validators.required],
                                                     'Address2' : [],
                                                     'TelNo' : [] ,
                                                     'offtelno' : [],
                                                     'Email' : [] , 
                                                     'Mobile1' : ['',  Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])] , 
                                                     'Mobile2' : ['',  Validators.compose([Validators.pattern("^[0-9]+$")])],  
                                                     'Fax' : [] 
   
        });  

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

resetForm() { 
    this.ContactsUpdate.reset();
} 

Fu_ContactUpdate(){
 var authobj;
 if(this.network.type!='none')
    {
 this.dbProvider.insertIntoContact_Update(this.data,this.ContactsUpdate.value.name,this.ContactsUpdate.value.Relation,this.ContactsUpdate.value.Address1,this.ContactsUpdate.value.Address2,this.ContactsUpdate.value.Mobile1,this.ContactsUpdate.value.Mobile2,this.ContactsUpdate.value.Email,this.ContactsUpdate.value.offtelno,this.ContactsUpdate.value.TelNo,this.ContactsUpdate.value.Fax,this.ldap_id)

                .then((result) => {
                this.result=result;
                console.log(this.data,this.ContactsUpdate.value.name,this.ContactsUpdate.value.Relation,this.ContactsUpdate.value.Address1,this.ContactsUpdate.value.Address2,this.ContactsUpdate.value.Mobile1,this.ContactsUpdate.value.Mobile2,this.ContactsUpdate.value.Email,this.ContactsUpdate.value.offtelno,this.ContactsUpdate.value.TelNo,this.ContactsUpdate.value.Fax,this.ldap_id)
               
                this.restProvider.generateToken({}).then((res1:any)=>{
                 this.resultsessn =res1;
                  console.log("sessionid",res1);
                }).then((res1)=>{
                  this.restProvider.uploadData(this.table_id,result,this.resultsessn.SYNC_INFO[0].SESSION_ID)
                  .then(res => { 
                             authobj=res;
                              if(authobj.UploadTable[0].RETURN_CODE==0)
                              {
                              let toast = this.toastCtrl.create({
                              message: 'uploaded successfully',
                              duration: 10000
                              });
                              toast.present(); 
                              window["FirebasePlugin"].logEvent("uploadcontactsupt", {uname:this.ldap_id,fileno:this.data.toString()});

                             this.dbProvider.Delete_Contact_Update(this.data).then((result=>{
                           }))  
                            }
                            else
                            {
                              let toast = this.toastCtrl.create({
                                message: 'upload error pls try again',
                                duration: 10000
                                });
                                toast.present(); 
                                window["FirebasePlugin"].logEvent("uploadcontactsupterror", {uname:this.ldap_id,fileno:this.data.toString()});

                            }
                              console.log(res);
                              console.log(this.table_id);
                              console.log(result);
                            })
                })

                
                              
                              }
                              ,
                    (error) => {
                                console.log("ERROR: ", error);
                 })
              }
          else
         {
         let toast = this.toastCtrl.create({
                                  message: 'data stored locally.To Upload Please turn your internet ON',
                                  duration: 10000
                                  });
                                  toast.present();

                                  this.dbProvider.insertIntoContact_Update(this.data,this.ContactsUpdate.value.name,this.ContactsUpdate.value.Relation,this.ContactsUpdate.value.Address1,this.ContactsUpdate.value.Address2,this.ContactsUpdate.value.Mobile1,this.ContactsUpdate.value.Mobile2,this.ContactsUpdate.value.Email,this.ContactsUpdate.value.offtelno,this.ContactsUpdate.value.TelNo,this.ContactsUpdate.value.Fax,this.ldap_id)
                                  .then((result) => {
                this.result=result;
                console.log(this.result);
              })
       }
      
  this.resetForm();
}


 // ionViewDidEnter() {
 //      this.connected = this.network.onConnect().subscribe(connection => {
 //            console.log(connection);
 //             console.log('network connected!');
 //            this.displayNetworkUpdate(connection.type);
 //        }, error => console.error(error));

 //        this.disconnected = this.network.onDisconnect().subscribe(connection => {
 //              console.log(connection);
 //              this.displayNetworkUpdate(connection.type);
 //          }, error => console.error(error));
 //       console.log(this.disconnected);
 //      console.log(this.network.type);

 //    }

    displayNetworkUpdate(connectionState: string){
        var authobj     
        this.toastCtrl.create({
            message: 'You are now ' + connectionState + '!',
            duration: 5000
        }).present();
        console.log(this.network.type);

      /////////////////////////////NETWORK  IF PRESENT//////////////////////////////////////
   
        if(this.network.type!='none'&&this.result!=null)
         { 
          
          this.dbProvider.SelectContact_Update(this.data).then((result=>{
            console.log(result)
                 this.restProvider.uploadData(this.table_id,this.result,this.resultsessn.SYNC_INFO[0].SESSION_ID)
                 .then(res => { 
                              console.log(res);
                              authobj=res;
                                if(authobj.UploadTable[0].RETURN_CODE=="0")
                                {
                                  let toast = this.toastCtrl.create({
                                  message: 'uploaded successfully',
                                  duration:10000
                                  });
                                  toast.present();
                                  window["FirebasePlugin"].logEvent("uploadcontactsupt", {uname:this.ldap_id,fileno:this.data.toString()});
                                  this.dbProvider.Delete_Contact_Update(this.data).then((result)=>{
                                  console.log(result);
                                })
                                }
                              else
                              {
                              let toast = this.toastCtrl.create({
                                message: 'upload error pls try again',
                                duration: 10000
                                });
                                toast.present(); 
                                console.log(this.table_id);
                              }
                  })
          })
 
        )
        }


       } 

    GetBorrRelation(){
     this.dbProvider.getBorrDetails()
            .then((result) => {
                              this.borr_rln = result;
                               console.log(result);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                     })
    }

  
    
   ionViewDidLoad(){
    this.getuserid();
    this.getSessionId();
    this.GetBorrRelation();
    console.log('ionViewDidLoad ContactsUpdatePage');
  }

}
