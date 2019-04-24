var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
var LacInfoPage = /** @class */ (function () {
    function LacInfoPage(navCtrl, navParams, events, dbProvider, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.dbProvider = dbProvider;
        this.modalCtrl = modalCtrl;
        this.acDetailsRoot = 'AcDetailsPage';
        this.propertyDetailsRoot = 'PropertyDetailsPage';
        this.disbursementRoot = 'DisbursementPage';
        this.uniqueIdRoot = 'UniqueIdPage';
        this.transPage = 'TransPage';
        this.remarksPage = 'RemarkPage';
        this.viewdocsPage = 'ViewDocPage';
        this.addetailsPage = 'AddetailsPage';
        this.LacNo = navParams.get('card');
        this.Borrname = navParams.get('card1');
        this.paramtab1 = { lac: this.LacNo, name: this.Borrname };
        ////hide footer///////
        this.events.publish('hideHeader', { footerstatus: true, lac: this.LacNo, borrname: this.Borrname });
        this.pages = [
            {
                title: 'Property',
                component: "PropertyDetailsPage"
            },
            {
                title: 'Disbursement',
                component: "DisbursementPage"
            },
            {
                title: 'Unique',
                component: "UniqueIdPage"
            },
            {
                title: 'Trans',
                component: "TransPage"
            },
            {
                title: 'Remark',
                component: "RemarkPage"
            },
            {
                title: 'ViewDoc',
                component: "ViewDocPage"
            },
            {
                title: 'Addetails',
                component: "AddetailsPage"
            },
        ];
    }
    LacInfoPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(page.component, {
            name: page.title,
            item: this.LacNo,
            item2: this.Borrname
        });
    };
    LacInfoPage.prototype.cardlac = function () {
        console.log(this.LacNo);
        console.log(this.paramtab1);
    };
    LacInfoPage.prototype.GetACDetails = function () {
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
    LacInfoPage.prototype.SelectLacMasterAcDetails = function () {
        var _this = this;
        this.dbProvider.SelectLacMasterAcDetails(this.LacNo)
            .then(function (res) {
            _this.lacacdtls = res;
            console.log(_this.lacacdtls);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    LacInfoPage.prototype.ngOnInit = function () {
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
    LacInfoPage.prototype.openModal = function () {
        var modal = this.modalCtrl.create('FileReminderPage', { data: this.LacNo });
        modal.present();
    };
    LacInfoPage.prototype.ionViewDidLoad = function () {
        this.cardlac();
        ///////hide footer////
        this.events.publish('hideHeader', { footerstatus: true, lac: this.LacNo, borrname: this.Borrname });
    };
    LacInfoPage.prototype.ionViewDidEnter = function () {
        this.events.publish('hideheader', { headerstatus: true, navheaderstat: true });
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], LacInfoPage.prototype, "content", void 0);
    LacInfoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-lac-info',
            templateUrl: 'lac-info.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            Events,
            DbProvider,
            ModalController])
    ], LacInfoPage);
    return LacInfoPage;
}());
export { LacInfoPage };
//# sourceMappingURL=lac-info.js.map