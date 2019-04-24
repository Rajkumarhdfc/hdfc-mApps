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
 * Generated class for the DisbursementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DisbursementPage = /** @class */ (function () {
    function DisbursementPage(navCtrl, navParams, dbProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        //this.LacNo = navParams.get('lac');
        this.LacNo = navParams.get('item');
        this.name = navParams.get('item2');
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
    DisbursementPage.prototype.GetBuilderInfo = function () {
        var _this = this;
        this.dbProvider.GetBuilderDetails(this.LacNo)
            .then(function (result) {
            _this.Data = result;
            console.log(_this.Data);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    DisbursementPage.prototype.Getdisbamt = function () {
        var _this = this;
        this.dbProvider.GetDisbAmtDetails(this.LacNo)
            .then(function (result) {
            _this.amt = result;
            console.log(_this.amt);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    DisbursementPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(page.component, {
            name: page.title,
            item: this.LacNo,
            item2: this.name
        });
    };
    DisbursementPage.prototype.ngOnInit = function () {
        var _this = this;
        this.dbProvider.GetDisbDetails(this.LacNo)
            .then(function (result) {
            _this.Datalist = result;
            console.log(_this.Datalist);
            console.log(_this.LacNo);
        }, function (error) {
            console.log("ERROR: ", error);
        });
        this.GetBuilderInfo();
        this.Getdisbamt();
    };
    DisbursementPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DisbursementPage');
    };
    DisbursementPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-disbursement',
            templateUrl: 'disbursement.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DbProvider])
    ], DisbursementPage);
    return DisbursementPage;
}());
export { DisbursementPage };
//# sourceMappingURL=disbursement.js.map