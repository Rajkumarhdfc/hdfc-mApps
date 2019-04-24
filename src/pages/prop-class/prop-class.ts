import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events,ToastController} from 'ionic-angular';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Subscription} from 'rxjs/Subscription';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the PropClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prop-class',
  templateUrl: 'prop-class.html',
})
export class PropClassPage {
Propclass:FormGroup;
data:any;
ldap_id:any;
table_id=229;
id:any;
sessionid:any;
result:any;
connected: Subscription;
disconnected: Subscription;
saveflag:boolean=false;
resultsessn:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dbProvider:DbProvider,
    public events:Events,
    private formbuilder:FormBuilder, 
    public restProvider: RestProvider,
    public toastCtrl:ToastController,
    private network: Network) 
  {
        this.data=this.navParams.get('lac')
        console.log(this.data);
        this.Propclass = this.formbuilder.group({'Classcode' : ['', Validators.required],
                                            'SpecificValue' : []
        });

      this.dbProvider.selectPropClassCode(this.data).then((result1:any)=>{
       console.log(result1);
        if(result1!=""&&result1!=undefined) {
        this.Propclass.value.Classcode=result1[0].class_code;
        }
      })
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
//    alert(this.sessionid);
    console.log(this.sessionid);
  })
}

resetForm() { 
  this.Propclass.reset();
} 

PropClassInsertData(){
   var authobj
  if(this.network.type!='none')
    {
    this.dbProvider.insertIntoProp_Class(this.Propclass.value.Classcode,this.data,this.Propclass.value.SpecificValue,this.ldap_id)
            .then((result) => {
                this.result=result;
                console.log(this.result);
                this.restProvider.generateToken({}).then((res1:any)=>{
                 this.resultsessn =res1;
                  console.log("sessionid",res1);
                }).then((res1)=>{
                     this.restProvider.uploadData(this.table_id,result,this.resultsessn.SYNC_INFO[0].SESSION_ID)
                  .then(res => {  
                 //   alert(this.resultsessn.SYNC_INFO[0].SESSION_ID);
                    authobj=res;
                     console.log(res);
                      if(authobj.UploadTable[0].RETURN_CODE=="0")
                        {
                          let toast = this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 5000
                            });
                            toast.present(); 
                            this.saveflag=true;
                         this.dbProvider.Delete_Class(this.data).then((result=>{
                         }))  

                            }
                      else
                        {
                          let toast = this.toastCtrl.create({
                            message: 'upload error pls try again',
                            duration: 5000
                            });
                            toast.present(); 
                        }
                            console.log(this.table_id);
                            console.log(result);
                        })


                    }
                )
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
                                  duration: 5000
                                  });
                                  toast.present();

         this.dbProvider.insertIntoProp_Class(this.Propclass.value.Classcode,this.data,this.Propclass.value.SpecificValue,this.ldap_id)
            .then((result) => {
                this.result=result;
                console.log(this.result);
                this.saveflag=true;
              })
       }
         
     this.resetForm();
           
}
 
   

     /////////////////////////////////network check//////////////////////////////
  // ionViewDidEnter() {
  //     this.connected = this.network.onConnect().subscribe(connection => {
  //           console.log(connection);
  //            console.log('network connected!');
  //           this.displayNetworkUpdate(connection.type);
  //       }, error => console.error(error));

  //       this.disconnected = this.network.onDisconnect().subscribe(connection => {
  //             console.log(connection);
  //             this.displayNetworkUpdate(connection.type);
  //         }, error => console.error(error));
  //      console.log(this.disconnected);
  //     console.log(this.network.type);

  //   }

    displayNetworkUpdate(connectionState: string){
        var authobj     
        this.toastCtrl.create({
            message: 'You are now ' + connectionState + '!',
            duration: 5000
        }).present();
        console.log(this.network.type);

      ////////////////////////NETWORK  IF PRESENT//////////////////////////////////////
   
        if(this.network.type!='none'&&this.result!=null)
         { 
          
          this.dbProvider.SelectProp_Class(this.data).then((result=>{
            console.log(result)
                 this.restProvider.uploadData(this.table_id,result,this.resultsessn.SYNC_INFO[0].SESSION_ID)
                 .then(res => { 
                              console.log(res);
                              authobj=res;
                                if(authobj.UploadTable[0].RETURN_CODE=="0")
                                {
                                  let toast = this.toastCtrl.create({
                                  message: 'uploaded successfully',
                                  duration: 5000
                                  });
                                  this.saveflag=true;
                                  toast.present();
                                  this.dbProvider.deleteallPropClass().then((result)=>{
                                  console.log(result);
                                })
                                }
                              else
                              {
                              let toast = this.toastCtrl.create({
                                message: 'upload error pls try again',
                                duration: 5000
                                });
                                toast.present(); 
                                console.log(this.table_id);
                              }
                  })
          })
 
        )
        }

       } 

  ionViewDidLoad() {
    this.getuserid();
    this.getSessionId();
    console.log('ionViewDidLoad PropClassPage');
  }

}
