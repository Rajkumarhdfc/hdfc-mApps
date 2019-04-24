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
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';
var AppLaunchPage = /** @class */ (function () {
    function AppLaunchPage(navCtrl, navParams, dbProvider, events, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.events = events;
        this.platform = platform;
        this.userData = { UserID: "" };
    }
    AppLaunchPage.prototype.setUserID = function () {
        var _this = this;
        this.dbProvider.setAppMasterUserID(this.userData.UserID)
            .then(function (res) {
            _this.navCtrl.push('LoginPage', { UserData: _this.userData.UserID });
        })
            .catch(function (err) { return console.log(err); });
    };
    AppLaunchPage.prototype.getUserID = function () {
        var _this = this;
        this.dbProvider.sCreateTableScript();
        this.dbProvider.sSelectApp_MasterScript()
            .then(function (res) {
            if (res['rows'].length > 0) {
                _this.navCtrl.push('LoginPage', { UserData: res['rows']['item'](0)['UserID'] });
            }
        });
    };
    AppLaunchPage.prototype.getSyncTable = function () {
        this.dbProvider.createSyncTable();
    };
    AppLaunchPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.getUserID();
        });
    };
    AppLaunchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.publish('hideHeader', { footerstatus: false, lac: '', borrname: '' });
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.getSyncTable();
        });
    };
    AppLaunchPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-app-launch',
            templateUrl: 'app-launch.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DbProvider,
            Events, Platform])
    ], AppLaunchPage);
    return AppLaunchPage;
}());
export { AppLaunchPage };
//# sourceMappingURL=app-launch.js.map