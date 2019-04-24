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
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the CommnDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommnDetailsPage = /** @class */ (function () {
    function CommnDetailsPage(geolocation, launchNavigator, navCtrl, navParams, dbProvider, events) {
        this.geolocation = geolocation;
        this.launchNavigator = launchNavigator;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.events = events;
        this.guarantor = [];
        this.addr = "Borrower";
        this.borrower = [];
        this.coborrower = [];
        this.LacNo = navParams.get('lac');
        console.log(this.LacNo);
        this.borname = navParams.get('name');
    }
    CommnDetailsPage.prototype.RedirectToMap = function (item, index) {
        this.navCtrl.push('MapviewscreenPage', { "address_details": item, lacno: this.LacNo, borname: this.borname });
    };
    CommnDetailsPage.prototype.testhtml = function (input) {
        //console.log(input);
        input = input.replace(/\n/g, '<br/>');
        //console.log(input);
        return input;
    };
    CommnDetailsPage.prototype.getColor = function (lat, long) {
        if (lat == "" || long == "") {
            return "#668598";
        }
        else {
            return "green";
        }
    };
    CommnDetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dbProvider.GetCustomerAddress(this.LacNo).then(function (res) {
            console.log(res);
            _this.customeraddrs = res;
            console.log(_this.customeraddrs, _this.customeraddrs.length);
            for (var i = 0; i < _this.customeraddrs.length; i++) {
                if (_this.customeraddrs[i].capacity == 'B') {
                    _this.borrower.push(_this.customeraddrs[i]);
                    console.log(_this.customeraddrs[i]);
                    console.log(_this.borrower);
                }
                else if (_this.customeraddrs[i].capacity == 'C') {
                    _this.coborrower.push(_this.customeraddrs[i]);
                    console.log(_this.coborrower);
                }
                else {
                    _this.guarantor.push(_this.customeraddrs[i]);
                    console.log(_this.guarantor);
                }
            }
        });
        console.log('ionViewDidLoad CommnDetailsPage');
    };
    CommnDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-commn-details',
            templateUrl: 'commn-details.html',
        }),
        __metadata("design:paramtypes", [Geolocation,
            LaunchNavigator,
            NavController,
            NavParams,
            DbProvider,
            Events])
    ], CommnDetailsPage);
    return CommnDetailsPage;
}());
export { CommnDetailsPage };
//# sourceMappingURL=commn-details.js.map