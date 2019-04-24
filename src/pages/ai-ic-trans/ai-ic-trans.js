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
 * Generated class for the AiIcTransPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AiIcTransPage = /** @class */ (function () {
    function AiIcTransPage(navCtrl, navParams, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.file_no = navParams.get('lac');
        console.log(this.file_no);
    }
    AiIcTransPage.prototype.GetAiTrans = function () {
        var _this = this;
        this.dbProvider.GetAITrans(this.file_no)
            .then(function (result) {
            _this.ai = result;
            console.log(_this.ai);
            console.log(_this.file_no);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    AiIcTransPage.prototype.GetAiTranstot = function () {
        var _this = this;
        this.dbProvider.GetAITransTotal(this.file_no)
            .then(function (result) {
            _this.tot = result;
            console.log(_this.tot);
            console.log(_this.file_no);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    AiIcTransPage.prototype.ionViewDidLoad = function () {
        this.GetAiTrans();
        this.GetAiTranstot();
        console.log('ionViewDidLoad AiIcTransPage');
    };
    AiIcTransPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ai-ic-trans',
            templateUrl: 'ai-ic-trans.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DbProvider])
    ], AiIcTransPage);
    return AiIcTransPage;
}());
export { AiIcTransPage };
//# sourceMappingURL=ai-ic-trans.js.map