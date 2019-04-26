import { Component,OnInit,ViewChild } from '@angular/core';
import { IonicPage, NavController,NavParams,Content,ViewController} from 'ionic-angular';
import { Events } from 'ionic-angular';
// import { CommnDetailsPage} from '../commn-details/commn-details';
// import { ContactsPage} from '../contacts/contacts';
// import { ContactsUpdatePage} from '../contacts-update/contacts-update';
// import { CommnOthDetailsPage} from '../commn-oth-details/commn-oth-details';
/**
 * Generated class for the CommnPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commn',
  templateUrl: 'commn.html'
})

export class CommnPage {

  commnDetailsRoot = 'CommnDetailsPage'
  contactsRoot = 'ContactsPage'
  contactsUpdateRoot = 'ContactsUpdatePage'
  commnotherdetailRoot ='CommnOthDetailsPage'
	LacNo:any;
	Borrname:any;
	paramtab1:any;
	paramtab2:any;
  redpg:any;

  Commnpages: Array < {
    title: string,
    component: any,
    comp_name:any
} > ;


  constructor(public navCtrl: NavController,
    public navParams:NavParams,
    public events:Events,
    public view:ViewController,
    ) {
        this.LacNo = navParams.get('item');
        this.Borrname=navParams.get('item2');
        this.paramtab1={lac:this.LacNo,name:this.Borrname};
      this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});




//       this.Commnpages = [{
//         title: 'CommCommnDetailsn',
//         component: CommnDetailsPage,  
//         comp_name:'CommnDetailsPage'
//     },
//     {
//       title: 'contacts',
//       component: ContactsPage,
//       comp_name:'ContactsPage'
//     },
    
//     {
//         title: 'contactsupdt',
//         component: ContactsUpdatePage,
//         comp_name:'ContactsUpdatePage'
//     },
    
//     {
//         title: 'commotherdtls',
//         component: CommnOthDetailsPage,
//          comp_name:'CCommnOthDetailsPage'
//     }
    
    
//     ];
//   }   

// openPage1(p) 
// { // --- for menu
//      this.navCtrl.push(p.component, {
//                       name: p.title,
//                       item: this.LacNo,
//                       item2: this.Borrname
//                   })
//                  .then(() => {
//                       const index = this.navCtrl.getActive().index;
//                       this.navCtrl.remove(index - 1)///removes previous page from stack
//                   });
 }

  ionViewWillEnter() {
   this.events.publish('map_page', { lac:this.LacNo,borrname:this.Borrname,current_page_name:"map_page"});
   this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});
   this.events.publish('hideHeader', { footerstatus:true,lac:this.LacNo,borrname:this.Borrname});//for hiding footer

}
// ionViewDidLoad() {
//       this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});
//   }

 // ionViewWillLeave() {
 //      this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

 //     }
      
}






 



