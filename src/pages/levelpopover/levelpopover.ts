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
  rangeValue:number;
  selrange:number;
  difflvl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public dbProvider:DbProvider,public modalCtrl:ModalController){
   this.LacNo = navParams.get('lacno');
   this.tablelistdata=navParams.get('data1');
   this.difflvl=navParams.get('diff_level');

   if(this.difflvl=="Make Extra Effort"){
    this.selrange=2;
  }else if(this.difflvl=="Needs Attention"){
    
    this.selrange=3;

  }else if(this.difflvl=="Possible"){
   
    this.selrange=4;

  }else if(this.difflvl=="PaymentReceived"){
  
    this.selrange=5;

  }
  this.rangeValue=this.selrange;
console.log(this.rangeValue);

  

  }

close(){
    this.viewCtrl.dismiss();
  }


onChange(event){
  console.log(this.rangeValue)
  if(this.rangeValue==2){
    this.selrange=2;
    this.level="Make Extra Effort"
  }else if(this.rangeValue==3){
    this.level="Needs Attention";
    this.selrange=3;

  }else if(this.rangeValue==4){
    this.level="Possible";
    this.selrange=4;

  }else if(this.rangeValue==5){
    this.level="PaymentReceived"
    this.selrange=5;

  }
console.log(event);
//this.level=event;
this.dbProvider.LacMasterSetLevel(this.LacNo,this.level,this.rangeValue)

.then((result) => {
                  console.log(result);
                  console.log(this.level);
                  console.log(this.rangeValue);
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
   	this.dbProvider.LacMasterSetLevel(this.LacNo,this.level,this.rangeValue)

            .then((result) => {
                              console.log(result);
                              console.log(this.level);
                              console.log(this.rangeValue);

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
