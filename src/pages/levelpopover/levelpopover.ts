import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the LevelpopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-levelpopover',
  templateUrl: 'levelpopover.html',
})

export class LevelpopoverPage {
	public level:string;
  public remarks:string;
	LacNo:any;
  tablelistdata:any;
  rangeValue: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public dbProvider:DbProvider,public modalCtrl:ModalController){
   this.LacNo = navParams.get('lacno');
   this.tablelistdata=navParams.get('data1')
   
  this.rangeValue = 1;
  

  }

close(){
    this.viewCtrl.dismiss();
  }


onChange(event){
  console.log(this.rangeValue)
  if(this.rangeValue==2){
    this.level="Make Extra Effort"
  }else if(this.rangeValue==3){
    this.level="Needs Attention";
  }else if(this.rangeValue==4){
    this.level="Possible";
  }else if(this.rangeValue==5){
    this.level="PaymentReceived"
  }
console.log(event);
//this.level=event;
this.dbProvider.LacMasterSetLevel(this.LacNo,this.level,"")

.then((result) => {
                  console.log(result);
                  console.log(this.level);
                  },
        (error) => {
                  console.log("ERROR: ", error);
     })
       this.viewCtrl.dismiss(this.level);
}


textAreaChange(event){
	console.log(event);
	this.remarks=event;
}

 submit(){
   	this.dbProvider.LacMasterSetLevel(this.LacNo,this.level,"")

            .then((result) => {
                              console.log(result);
                              console.log(this.level);
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })
                   this.viewCtrl.dismiss(this.level);
  
   }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelpopoverPage');
  }

}
