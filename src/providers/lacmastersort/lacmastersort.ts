import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController,AlertController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/*
  Generated class for the LacmastersortProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LacmastersortProvider {
testRadioResult:any;
desc:string ="desc";
asc:string ="asc";

  constructor(public http: HttpClient,
  	public loadingCtrl:LoadingController,
    public alertCtrl: AlertController,
    public dbProvider : DbProvider
) 
  {
    console.log('Hello LacmastersortProvider Provider');
  }

  LacSort(allRows,alllen,totlen,crrlen,tableItemlist){
  return new Promise((resolve,reject) => {

  	 let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
                     
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort By');

    alert.addInput({
      type: 'radio',
      label: 'Name',
      value: 'borr_name',
      checked: true,
    });

     alert.addInput({
      type: 'radio',
      label: 'Area',
      value: 'area_desc',
      checked: false
    });

      alert.addInput({
      type: 'radio',
      label: 'Months O/S',
      value: 'months_os',
      checked: false
    });

      alert.addInput({
      type: 'radio',
      label: 'Allocation/RFV',
      value: 'prop_area_desc',
      checked: false
    });
       alert.addInput({
      type: 'radio',
      label: 'Level',
      value: 'difficulty_level',
      checked: false
    });
      alert.addInput({
      type: 'radio',
      label: 'Plt Comb',
      value: 'plt',
      checked: false
    });
      alert.addInput({
      type: 'radio',
      label: 'My Basket',
      value: 'my_basket',
      checked: false
    });
       alert.addInput({
      type: 'radio',
      label: 'Followup Done',
      value: 'followupflag',
      checked: false
    });
          alert.addInput({
      type: 'radio',
      label: 'Max Action Date',
      value: 'max_action_date',
      checked: false
    });
     alert.addInput({
      type: 'radio',
      label: 'Company Arrangement',
      value: 'company_arrangement',
      checked: false
    });
    alert.addButton({
      text: 'ASC',
      handler: (data:string) => {
         console.log(data);
         this.testRadioResult = data;
           this.dbProvider.LacMasterDetailsSort(this.asc,this.testRadioResult).then((res) => {
             let re2=res
                       loading.present().then(() => {  

                                loading.dismiss();
                                })  
                               resolve(res);
                               
  
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })
      }
    });
    alert.addButton({
      text: 'DESC',
      handler: (data:string) => {
        console.log(data);
         this.testRadioResult = data;
           this.dbProvider.LacMasterDetailsSort(this.desc,this.testRadioResult).then((res) => {
             let re2=res
                       loading.present().then(() => {  
                               	loading.dismiss();
                               })
                                resolve(res);
                               
                              }

                              ,
                    (error) => {
                              console.log("ERROR: ", error);
                 })

      }
    });
    alert.present();
   })


  }

}
