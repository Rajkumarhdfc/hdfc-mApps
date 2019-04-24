import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { LacDetailsPage } from '../lac-details/lac-details';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the BucketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bucket',
  templateUrl: 'bucket.html',
})
export class BucketPage {
addr = 'MyBasket';
LacNo: any;
Basket:any ;
mybasketlist;
chip:string;
bucketflag:boolean=true;
creatflag:boolean=false;
bucketform:any;
  constructor(public navCtrl: NavController,
   public events:Events,
   public navParams: NavParams,
    public viewCtrl:ViewController,
    public dbProvider:DbProvider,
    public modalCtrl:ModalController,
    public menuCtrl: MenuController,
    private formbuilder :FormBuilder,
    public alertCtrl: AlertController,
    ) 
  {
    this.LacNo=this.navParams.get('data1');
    this.bucketform = this.formbuilder.group({'Basket' : [],
        });  
  }


 AreaChange(event) {
	console.log(event);
	this.Basket=event;
  }
/////////////////////////create basket//////////////////////////////////////
CreateBasketName(){
  this.creatflag=true;
  console.log(this.creatflag);
}



save(){
	  if(this.LacNo==""){
	  	this.InsertBasket();
      this.Basket="";

	  }
	  else
	  {
   			this.dbProvider.LacMasterMyBasket(this.LacNo,this.Basket)
            	.then((result) => {
                              console.log(result+"  "+this.LacNo);
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })
  			     	this.viewCtrl.dismiss(this.Basket);
                      if(this.Basket==null){
                         this.bucketflag=false;
                         this.events.publish('bucketflag', {fflag:this.bucketflag});
                      }
              
        }
        //this.bucketform.reset();

}

///////view basket/////////////////////////////////////////
ViewBasket(){
   	this.dbProvider.LacMasterSelectMyBasket()

            .then((result) => {

                              console.log(result);
                              this.mybasketlist=result;
                              console.log(this.mybasketlist);
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })
}
///////insert bucket data into lac master//////
 InsertBasket(){

if(this.Basket==undefined){
  this.close();
}
else
{
      this.dbProvider.LacMasterInsertMyBasket(this.Basket)
            .then((result) => {
                              console.log(result+"  "+this.Basket);

                              if(this.LacNo==""){
                                this.ViewBasket();
                              }
                              else{
                                 this.viewCtrl.dismiss(this.Basket);
                              }
                            
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                })

}
        }

UpdateBasketChip(basket){
	 
    if(this.LacNo==""){
    // this.InsertBasket();
      var res;
       this.dbProvider.LacMasterTableBasketFilter(basket).then((result)=>{
         console.log(result)
         res=result;
         this.viewCtrl.dismiss(res);

    }) 

    }
else{
  console.log(basket);
    this.dbProvider.LacMasterMyBasket(this.LacNo,basket)

            .then((result) => {
                              console.log(result+"  "+basket);
                              },
                    (error) => {
                              console.log("ERROR: ", error);
                 })
             this.viewCtrl.dismiss(basket);
              }

}

 delete(chip: Element,basketname:any) {
 this.Basket="";
   if(this.LacNo!="")
   {
    this.UpdateBasketChip(this.Basket);
    chip.remove();
    alert("deleted")
   }
   else{
    chip.remove();
    this.dbProvider.update_global_buck(basketname,this.Basket).then(res=>{
      this.ViewBasket();
      console.log(res);
      console.log(basketname);
    })
  
   
   }
  
  //  else{
  //   chip.remove();
  //  }
  
   //this.Basket=""
//this.viewCtrl.dismiss();
  }

close(){
//  this.ViewBasket();

// this.dbProvider.LacMasterTableDetails_v1().then(res=>{
//   console.log(res);
//   this.viewCtrl.dismiss(res);
// }).catch(err=>{
//   console.log(err);
// })
this.viewCtrl.dismiss();
 
  	}

ionViewDidLoad() {
  	this.ViewBasket();
    console.log('ionViewDidLoad BucketPage');
  }


  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'CREATE BASKET',
      message: "Enter the name of basket",
      inputs: [
        {
          name: 'basketName',
          placeholder: 'Basket Name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          },
          cssClass: 'alertCancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.Basket=data.basketName;
            if(this.Basket.length>15){
              alert("Basket name cannot be more than 15 characters");
            }
            else{
              this.save();
          //  this.InsertBasket()
          //  this.ViewBasket();
            console.log('Saved clicked');
            console.log(data.basketName);
            }
            
          },
          cssClass: 'alertSave'
        }
      ]
    });
    prompt.present();
  }

}
