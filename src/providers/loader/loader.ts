import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderProvider {
    constructor(public loadingCtrl: LoadingController) {
        console.log('Hello LoaderProvider Provider');
    }

    show(message) {
        let loader = this.loadingCtrl.create({
            content: message
        });

        loader.present();
        return loader;
    }

    hide(loader) {
        console.log('hide');
        try {
            loader.dismiss();
        } catch (e) {
            console.log(e);
        }
    }
}
