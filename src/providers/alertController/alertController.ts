import { AlertController } from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()


export class confirm_Alert_Provider {
  constructor(public alertCtrl: AlertController) {
  }

  showConfirm(message,title,text_ok,text_cancel) {
    let confirm = this.alertCtrl.create({
      title:title ,
      message: message,
      buttons: [
        {
          text:text_cancel,
          handler: () => {
            console.log('Disagree clicked');
           return false;
          }
        },
        {
          text:text_ok,
          handler: () => {
            console.log('Agree clicked');
           return true;
          }
        }
      ]
    });
    confirm.present();
  }
}