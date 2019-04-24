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
 * Generated class for the FActPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FActPage = /** @class */ (function () {
    function FActPage(navCtrl, navParams, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.LacNo = navParams.get('lac');
        this.Borrname = this.navParams.get('item2');
        this.paramtab1 = { lac: this.LacNo, name: this.Borrname };
        console.log(this.paramtab1);
    }
    FActPage.prototype.GetFuAct = function () {
        var _this = this;
        this.dbProvider.GetFuActdetails(this.LacNo)
            .then(function (result) {
            _this.fuactdetails = result;
            console.log(_this.fuactdetails);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    FActPage.prototype.ionViewDidLoad = function () {
        this.GetFuAct();
        console.log('ionViewDidLoad FActPage');
    };
    FActPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-f-act',
            templateUrl: 'f-act.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DbProvider])
    ], FActPage);
    return FActPage;
}());
export { FActPage };
//# sourceMappingURL=f-act.js.map