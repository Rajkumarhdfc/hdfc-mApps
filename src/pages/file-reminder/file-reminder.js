var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the FileReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FileReminderPage = /** @class */ (function () {
    function FileReminderPage(navCtrl, navParams, modalCtrl, viewCtrl, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.dbProvider = dbProvider;
        this.LacNo = navParams.get('data');
        console.log(this.LacNo);
    }
    FileReminderPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FileReminderPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dbProvider.GetFileReminder(this.LacNo)
            .then(function (result) {
            _this.file_list = result;
            console.log(_this.file_list);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    FileReminderPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FileReminderPage');
    };
    FileReminderPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-file-reminder',
            templateUrl: 'file-reminder.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController, ViewController, DbProvider])
    ], FileReminderPage);
    return FileReminderPage;
}());
export { FileReminderPage };
//# sourceMappingURL=file-reminder.js.map