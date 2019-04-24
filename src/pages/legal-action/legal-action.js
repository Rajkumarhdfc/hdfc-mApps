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
 * Generated class for the LegalActionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LegalActionPage = /** @class */ (function () {
    function LegalActionPage(navCtrl, navParams, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.LacNo = navParams.get('lac');
        console.log(this.LacNo);
    }
    LegalActionPage.prototype.GetLegalAction = function () {
        var _this = this;
        this.dbProvider.GetLegalAction(this.LacNo)
            .then(function (result) {
            _this.legal = result;
            console.log(_this.legal);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    LegalActionPage.prototype.ionViewDidLoad = function () {
        this.GetLegalAction();
        console.log('ionViewDidLoad LegalActionPage');
    };
    LegalActionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-legal-action',
            templateUrl: 'legal-action.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DbProvider])
    ], LegalActionPage);
    return LegalActionPage;
}());
export { LegalActionPage };
//# sourceMappingURL=legal-action.js.map