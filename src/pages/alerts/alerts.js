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
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the AlertsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AlertsPage = /** @class */ (function () {
    function AlertsPage(navCtrl, navParams, dbProvider, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.events = events;
        this.LacNo = navParams.get('item');
        this.Borrname = navParams.get('item2');
    }
    AlertsPage.prototype.GetTabAlerts = function () {
        var _this = this;
        this.dbProvider.GetTabAlerts(this.LacNo)
            .then(function (result) {
            _this.lac = result;
            _this.alertflg = result.length;
            console.log(_this.lac);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    AlertsPage.prototype.ionViewDidLoad = function () {
        this.GetTabAlerts();
        console.log('ionViewDidLoad AlertsPage');
    };
    AlertsPage.prototype.ionViewWillEnter = function () {
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: true });
    };
    AlertsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-alerts',
            templateUrl: 'alerts.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DbProvider,
            Events])
    ], AlertsPage);
    return AlertsPage;
}());
export { AlertsPage };
//# sourceMappingURL=alerts.js.map