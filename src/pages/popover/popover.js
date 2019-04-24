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
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PopoverPage = /** @class */ (function () {
    function PopoverPage(navCtrl, navParams, viewCtrl, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dbProvider = dbProvider;
        this.LacNo = navParams.get('data');
        this.list = navParams.get('data1');
        console.log(this.LacNo);
        console.log(this.list);
    }
    PopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dbProvider.GetFu_actionPopoverDetails(this.LacNo, this.list)
            .then(function (result) {
            _this.list1 = result;
            console.log(_this.list1 + "" + _this.list);
        }, function (error) {
            console.log("ERROR: ", error);
        });
        console.log('ionViewDidLoad PopoverPage');
    };
    PopoverPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-popover',
            templateUrl: 'popover.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            ViewController,
            DbProvider])
    ], PopoverPage);
    return PopoverPage;
}());
export { PopoverPage };
//# sourceMappingURL=popover.js.map