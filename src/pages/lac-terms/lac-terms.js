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
 * Generated class for the LacTermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LacTermsPage = /** @class */ (function () {
    function LacTermsPage(navCtrl, navParams, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.LacNo = navParams.get('lac');
        this.Borrname = this.navParams.get('item2');
        this.paramtab1 = { lac: this.LacNo, name: this.Borrname };
        console.log(this.paramtab1);
    }
    LacTermsPage.prototype.GetLacTermDetails = function () {
        var _this = this;
        this.dbProvider.GetLacTerms(this.LacNo)
            .then(function (result) {
            _this.LacTerms = result;
            console.log(_this.LacTerms);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    LacTermsPage.prototype.ionViewDidLoad = function () {
        this.GetLacTermDetails();
        console.log('ionViewDidLoad LacTermsPage');
    };
    LacTermsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-lac-terms',
            templateUrl: 'lac-terms.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DbProvider])
    ], LacTermsPage);
    return LacTermsPage;
}());
export { LacTermsPage };
//# sourceMappingURL=lac-terms.js.map