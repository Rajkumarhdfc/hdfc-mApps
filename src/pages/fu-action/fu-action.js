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
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
//import { PopoverPage } from '../popover/popover';
import { Events } from 'ionic-angular';
/**
 * Generated class for the FuActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FuActionPage = /** @class */ (function () {
    function FuActionPage(navCtrl, navParams, dbProvider, modalCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.LacNo = navParams.get('lac');
        this.events.publish('lacnumber', { data: this.LacNo });
        this.Borrname = this.navParams.get('item2');
        this.paramtab1 = { lac: this.LacNo, name: this.Borrname };
        console.log(this.paramtab1);
    }
    FuActionPage.prototype.getfupaction = function () {
        var _this = this;
        this.dbProvider.GetFu_actionDetails_1(this.LacNo)
            .then(function (result) {
            _this.filterlist = result;
            _this.fu_action = _this.filterlist;
            console.log(_this.fu_action);
            console.log(result);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    FuActionPage.prototype.openPopover = function (srno) {
        var modal = this.modalCtrl.create('PopoverPage', { data: this.LacNo, data1: srno });
        modal.present();
    };
    FuActionPage.prototype.onChange = function (event) {
        console.log(event);
        console.log(this.Filter[0]);
        this.filter1 = event;
        this.FilterList();
    };
    FuActionPage.prototype.FilterList = function () {
        var _this = this;
        this.fu_action = this.filterlist.filter(function (item) {
            if (_this.Filter[0].toLowerCase() == 'o' && item.action[0].toLowerCase() != 'v' && item.action[0].toLowerCase() != 't' && item.action[0].toLowerCase() != 'i') {
                console.log(item.action[0].toLowerCase().indexOf(_this.Filter[0].toLowerCase()));
                return item.action[0].toLowerCase().indexOf(_this.Filter[0].toLowerCase()) >= -1;
            }
            if (_this.Filter[0].toLowerCase() == 'a') {
                return _this.filterlist;
            }
            return item.action[0].toLowerCase().indexOf(_this.Filter[0].toLowerCase()) > -1;
        });
    };
    FuActionPage.prototype.ionViewDidLoad = function () {
        this.getfupaction();
        console.log('ionViewDidLoad FuActionPage');
    };
    FuActionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fu-action',
            templateUrl: 'fu-action.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DbProvider, PopoverController, Events])
    ], FuActionPage);
    return FuActionPage;
}());
export { FuActionPage };
//# sourceMappingURL=fu-action.js.map