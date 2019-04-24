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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the CommnPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommnPage = /** @class */ (function () {
    function CommnPage(navCtrl, navParams, events, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.view = view;
        this.showFooter = false;
        this.commnDetailsRoot = 'CommnDetailsPage';
        this.contactsRoot = 'ContactsPage';
        this.contactsUpdateRoot = 'ContactsUpdatePage';
        this.LacNo = navParams.get('item');
        this.Borrname = navParams.get('item2');
        this.paramtab1 = { lac: this.LacNo, name: this.Borrname };
    }
    CommnPage.prototype.ionViewWillEnter = function () {
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: true });
        this.events.publish('hideHeader', { footerstatus: true, lac: this.LacNo, borrname: this.Borrname }); //for hiding footer
    };
    CommnPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-commn',
            templateUrl: 'commn.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Events,
            ViewController])
    ], CommnPage);
    return CommnPage;
}());
export { CommnPage };
//# sourceMappingURL=commn.js.map