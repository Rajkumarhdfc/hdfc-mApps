import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { RestProvider } from '../../providers/rest/rest';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the ReportIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-report-issue',
  templateUrl: 'report-issue.html',
})
export class ReportIssuePage {
id:any;
ldap_id:any;

Reportissue:FormGroup;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public restProvider: RestProvider,
  private formbuilder:FormBuilder, 
  public dbProvider:DbProvider,
  public toastCtrl:ToastController,
  private network: Network,
) 
  {
    this.Reportissue = this.formbuilder.group({'Remarks' : ['', Validators.required],
                                            'Mobile' : ['', Validators.required],
                                            'Email':[]
        }); 
  }

getuserid(){
  this.dbProvider.getAppMasterUserID().then((result)=>{
    this.id=result;
    this.ldap_id=this.id.UserID
    console.log(this.ldap_id);
  })
}
  GetReportIssueDetails(){

      if(this.network.type=='none')
        { 
          let toast = this.toastCtrl.create({
                                  message: 'You are offline',
                                  duration:4000
                                  });
                                  toast.present();

        }
        else
        {
            this.restProvider.RemarksUpload(this.ldap_id,this.Reportissue.controls.Remarks.value,this.Reportissue.controls.Mobile.value).then((res)=>{
            console.log(res);
            })
            .then((res)=>{
             let toast = this.toastCtrl.create({
                                  message: 'data saved successfully',
                                  duration:3000
                                  });
                                  toast.present();
            })
            this.Reportissue.reset();
        }
  	    console.log(this.Reportissue.controls.Remarks.value,this.Reportissue.controls.Mobile.value);
  }

  ionViewDidLoad() {
  	this.getuserid();
    console.log('ionViewDidLoad ReportIssuePage');
  }

 ionViewDidEnter() {
  if(this.network.type=='none')
        { 
          let toast = this.toastCtrl.create({
                                  message: 'You are offline',
                                  duration:4000
                                  });
                                  toast.present();

        }
 }

}
