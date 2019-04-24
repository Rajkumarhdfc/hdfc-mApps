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
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
//import { LacDetailsPage } from '../lac-details/lac-details';
//import { FileReminderPage } from '../file-reminder/file-reminder';
/**
 * Generated class for the AcDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AcDetailsPage = /** @class */ (function () {
    function AcDetailsPage(navCtrl, navParams, dbProvider, modalCtrl, events) {
        // this.LacNo = navParams.get('lac');
        // this.name=navParams.get('name');
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.LacNo = navParams.get('item');
        this.name = navParams.get('item2');
        console.log(this.LacNo + "  " + this.name);
    }
    AcDetailsPage.prototype.GetACDetails = function () {
        var _this = this;
        this.dbProvider.GetACDetails(this.LacNo)
            .then(function (result) {
            _this.acdetails = result;
            console.log(_this.acdetails);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    AcDetailsPage.prototype.SelectLacMasterAcDetails = function () {
        var _this = this;
        this.dbProvider.SelectLacMasterAcDetails(this.LacNo)
            .then(function (res) {
            _this.lacacdtls = res;
            console.log(_this.lacacdtls);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    AcDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dbProvider.LacMasterTableInfo(this.LacNo)
            .then(function (result) {
            _this.itemlist = result;
            console.log(_this.itemlist);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
        this.GetACDetails();
        this.SelectLacMasterAcDetails();
    };
    AcDetailsPage.prototype.openModal = function () {
        var modal = this.modalCtrl.create('FileReminderPage', { data: this.LacNo });
        modal.present();
    };
    AcDetailsPage.prototype.ionViewDidLoad = function () {
        ///////hide footer////
        // this.events.publish('hideHeader', { footerstatus: true,lac:this.LacNo,borrname:this.name});
    };
    AcDetailsPage.prototype.ionViewDidEnter = function () {
        //   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});
    };
    AcDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ac-details',
            templateUrl: 'ac-details.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DbProvider,
            ModalController,
            Events])
    ], AcDetailsPage);
    return AcDetailsPage;
}());
export { AcDetailsPage };
//# sourceMappingURL=ac-details.js.map