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
import { Events } from 'ionic-angular';
/**
 * Generated class for the FupPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FupPage = /** @class */ (function () {
    function FupPage(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.fuActionRoot = 'FuActionPage';
        this.legalActionRoot = 'LegalActionPage';
        this.addFollowUpRoot = 'AddFollowUpPage';
        this.propClassRoot = 'PropClassPage';
        this.LacNo = this.navParams.get('item');
        this.Borrname = this.navParams.get('item2');
        this.paramtab1 = { lac: this.LacNo, name: this.Borrname };
    }
    FupPage.prototype.ionViewWillEnter = function () {
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: true });
    };
    FupPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-fup',
            templateUrl: 'fup.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Events])
    ], FupPage);
    return FupPage;
}());
export { FupPage };
//# sourceMappingURL=fup.js.map