import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController ,ViewController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
//import { PopoverPage } from '../popover/popover';
import { Events } from 'ionic-angular';

/**
 * Generated class for the FuActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fu-action',
  templateUrl: 'fu-action.html',
})

export class FuActionPage {
	LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;
  fu_action:any;
  Filter:any;
  filterlist:any;
  filter1:any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public dbProvider:DbProvider,
   public modalCtrl:PopoverController,
   public events:Events) {
    
    this.LacNo = navParams.get('lac');
    this.events.publish('lacnumber', {data:this.LacNo});
  	this.Borrname=this.navParams.get('item2');
 	  this.paramtab1={lac:this.LacNo,name:this.Borrname};
    console.log(this.paramtab1);
  }

getfupaction(){
	this.dbProvider.GetFu_actionDetails_1(this.LacNo)

            .then((result) => {
                              this.filterlist = result;
                              this.fu_action =this.filterlist;
                               console.log(this.fu_action);
                               console.log(result);
                               console.log(this.LacNo);
                              },
                    (error) => {
                                console.log("ERROR: ", error);
                 })
}

public openPopover(srno){
    let modal = this.modalCtrl.create('PopoverPage',{data: this.LacNo,data1:srno}
        );
    modal.present();
  } 


onChange(event){
console.log(event);
console.log(this.Filter[0]);
this.filter1=event;
this.FilterList();
}

FilterList(){
   this.fu_action=this.filterlist.filter((item) => {
        if(this.Filter[0].toLowerCase()=='o'&& item.action[0].toLowerCase()!='v'&&item.action[0].toLowerCase()!='t'&&item.action[0].toLowerCase()!='i'){
           console.log(item.action[0].toLowerCase().indexOf(this.Filter[0].toLowerCase()));
           return item.action[0].toLowerCase().indexOf(this.Filter[0].toLowerCase()) >= -1
        }
        if(this.Filter[0].toLowerCase()=='a'){
          return this.filterlist;
        }
          return item.action[0].toLowerCase().indexOf(this.Filter[0].toLowerCase()) > -1
            });
}

 ionViewDidLoad() {
    this.getfupaction();
    console.log('ionViewDidLoad FuActionPage');
  }

}
