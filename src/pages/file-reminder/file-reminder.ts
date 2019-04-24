import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';


/**
 * Generated class for the FileReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-file-reminder',
  templateUrl: 'file-reminder.html',
})
export class FileReminderPage {
LacNo:any;
file_list:any;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public modalCtrl: ModalController, public viewCtrl:ViewController,public dbProvider:DbProvider) {
   this.LacNo = navParams.get('data');
   console.log(this.LacNo);

  }

dismiss() {
    this.viewCtrl.dismiss();
  }

ngOnInit(){
      this.dbProvider.GetFileReminder(this.LacNo)
          	.then((result) => {
                              this.file_list = result;
                           		console.log(this.file_list);
                           		console.log(this.LacNo);
                             },
                    (error) => {
                                console.log("ERROR: ", error);
                 })

 	}

ionViewDidLoad() {
    console.log('ionViewDidLoad FileReminderPage');
  }

}
