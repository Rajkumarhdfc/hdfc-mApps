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
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { LacInfoPage } from '../lac-info/lac-info';
/**
 * Generated class for the RemindersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RemindersPage = /** @class */ (function () {
    function RemindersPage(navCtrl, navParams, dbProvider, loadingCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.reminders = [];
        this.crrlen = 0;
        this.rangelen = 15;
        this.scroll_count = 0;
        this.dbProvider.GetReminders()
            .then(function (result) {
            _this.remids = result;
            _this.alllen = _this.remids.length;
            console.log(_this.alllen);
            _this.crrlen = 0;
            _this.totlen = _this.alllen;
            var t = 0;
            for (var i = _this.crrlen; i < _this.alllen; i++) {
                _this.reminders.push(_this.remids[i]);
                _this.crrlen++;
                console.log(_this.crrlen);
                t++;
                if (t == 10) {
                    break;
                }
            }
            console.log(_this.reminders);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    }
    RemindersPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            var t = 0;
            _this.scroll_count = _this.crrlen;
            for (var i = _this.crrlen; i < _this.alllen; i++) {
                _this.reminders.push(_this.remids[i]);
                _this.crrlen++;
                console.log(_this.crrlen);
                t++;
                if (t == _this.rangelen) {
                    break;
                }
            }
            _this.scroll_count++;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 50);
    };
    RemindersPage.prototype.canWeLoadMoreContent = function () {
        return (this.scroll_count === this.totlen) ? false : true;
    };
    RemindersPage.prototype.navigateACDetails = function (lacno, borrname) {
        this.navCtrl.push(LacInfoPage, { card: lacno, card1: borrname });
        console.log("navigated");
    };
    RemindersPage.prototype.ionViewWillEnter = function () {
        this.events.publish('hidemenu', { menustatus: true });
        this.events.publish('hideHeader', { footerstatus: false, lac: "", borrname: "" });
    };
    RemindersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RemindersPage');
    };
    RemindersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-reminders',
            templateUrl: 'reminders.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DbProvider,
            LoadingController,
            Events])
    ], RemindersPage);
    return RemindersPage;
}());
export { RemindersPage };
//# sourceMappingURL=reminders.js.map