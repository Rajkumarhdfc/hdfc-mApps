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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the PmiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PmiPage = /** @class */ (function () {
    function PmiPage(navCtrl, navParams, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.file_no = navParams.get('lac');
        console.log(this.file_no);
    }
    PmiPage.prototype.GetpmiAction = function () {
        var _this = this;
        this.dbProvider.GetPmiTrans(this.file_no)
            .then(function (result) {
            _this.pmi = result;
            console.log(result);
            console.log(_this.file_no);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    PmiPage.prototype.GetPmiTranstot = function () {
        var _this = this;
        this.dbProvider.GetPmiTransTotal(this.file_no)
            .then(function (result) {
            _this.tot = result;
            console.log(_this.tot);
            console.log(_this.file_no);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    PmiPage.prototype.ionViewDidLoad = function () {
        this.GetpmiAction();
        this.GetPmiTranstot();
        console.log('ionViewDidLoad PmiPage');
    };
    PmiPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pmi',
            templateUrl: 'pmi.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DbProvider])
    ], PmiPage);
    return PmiPage;
}());
export { PmiPage };
//# sourceMappingURL=pmi.js.map