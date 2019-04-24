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
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the LevelpopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LevelpopoverPage = /** @class */ (function () {
    function LevelpopoverPage(navCtrl, navParams, viewCtrl, dbProvider, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dbProvider = dbProvider;
        this.modalCtrl = modalCtrl;
        this.LacNo = navParams.get('data');
        this.tablelistdata = navParams.get('data1');
    }
    LevelpopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    LevelpopoverPage.prototype.onChange = function (event) {
        console.log(event + "  " + this.LacNo);
        this.level = event;
    };
    LevelpopoverPage.prototype.textAreaChange = function (event) {
        console.log(event);
        this.remarks = event;
    };
    LevelpopoverPage.prototype.submit = function () {
        var _this = this;
        this.dbProvider.LacMasterSetLevel(this.LacNo, this.level, this.remarks)
            .then(function (result) {
            console.log(result);
            console.log(_this.level);
        }, function (error) {
            console.log("ERROR: ", error);
        });
        this.viewCtrl.dismiss(this.level);
    };
    LevelpopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LevelpopoverPage');
    };
    LevelpopoverPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-levelpopover',
            templateUrl: 'levelpopover.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, DbProvider, ModalController])
    ], LevelpopoverPage);
    return LevelpopoverPage;
}());
export { LevelpopoverPage };
//# sourceMappingURL=levelpopover.js.map