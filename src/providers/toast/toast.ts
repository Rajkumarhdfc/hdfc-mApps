import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

    constructor(private toastCtrl: ToastController) {
        console.log('Hello ToastProvider Provider');
    }

    show(message: string, callback?: any) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'middle'
        });

        if (!callback) {
            callback = () => {
                console.log('Dismissed toast');
            }
        }

        toast.onDidDismiss(callback);

        toast.present();
    }
}

