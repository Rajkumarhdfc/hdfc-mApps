import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { MapviewscreenPage} from '../mapviewscreen/mapviewscreen';

/**
 * Generated class for the CommnDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commn-details',
  templateUrl: 'commn-details.html',
})
export class CommnDetailsPage {
LacNo:any;
commndetails:any;
common:any;
guarantor=[];
action:any;
latitude:any;
longtitude:any;
addr: string = "Borrower";
customeraddrs:any;
borrower=[];
coborrower=[];
borname:any;
permaddress:any;
permaddressflag:boolean=false;

constructor(private geolocation: Geolocation,
  public launchNavigator: LaunchNavigator,
  public navCtrl: NavController, 
  public navParams: NavParams,
  public dbProvider:DbProvider,
   public events:Events){
  	this.LacNo = navParams.get('lac');
  	console.log(this.LacNo);
    this.borname =navParams.get('name');

  }

  RedirectToMap(item,index){
    this.navCtrl.push(MapviewscreenPage,{"address_details":item,lacno:this.LacNo,borname:this.borname,permflag:this.permaddressflag});
  }

   RedirectToMap1(item,index){
     this.permaddressflag=true;
     console.log(item);
    this.navCtrl.push(MapviewscreenPage,{"address_details":item,lacno:this.LacNo,borname:this.borname,permflag:this.permaddressflag});
  }

  testhtml(input){
    if(input!=null){
    input = input.replace(/\n/g,'<br/>' + '<div class="mt5"> </div>');
    return input;
    }

  }

  testtype(input){
    if(input!=null){
      //input = input.replace(/\n/g,'<br/>' + '<div class="mt5"> </div>');

     input=input.split(' ')[0]
      return input;
      //console.log(input);
      }
      console.log(input);
  }
  getColor(lat,long) {
    if(lat=="" || long==""){
          return "#668598";
    }
    else{
      return "green";
    }
  }
  
  getPermaddress(){
    this.dbProvider.getPermanentaddress(this.LacNo).then((res)=>{
      console.log(res);
      this.permaddress=res;
    })
  }

  ionViewDidLoad() {
    this.getPermaddress();
    this.dbProvider.GetCustomerAddress(this.LacNo).then((res)=>{
      console.log(res);
      this.customeraddrs=res;

      console.log(this.customeraddrs,this.customeraddrs.length);
      for(var i=0;i<this.customeraddrs.length;i++){
        if(this.customeraddrs[i].capacity=='B'){
            this.borrower.push(this.customeraddrs[i]);
            
            console.log(this.customeraddrs[i]);
            console.log(this.borrower)
        }
        else if(this.customeraddrs[i].capacity=='C'){
            this.coborrower.push(this.customeraddrs[i]);
             console.log(this.coborrower)
        }
        else
         {
           this.guarantor.push(this.customeraddrs[i]);
            console.log(this.guarantor)
         }
      }
    })
    console.log('ionViewDidLoad CommnDetailsPage');
  }




  }
