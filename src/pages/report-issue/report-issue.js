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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { RestProvider } from '../../providers/rest/rest';
import { FormBuilder, Validators } from '@angular/forms';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the ReportIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReportIssuePage = /** @class */ (function () {
    function ReportIssuePage(navCtrl, navParams, restProvider, formbuilder, dbProvider, toastCtrl, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.formbuilder = formbuilder;
        this.dbProvider = dbProvider;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.Reportissue = this.formbuilder.group({ 'Remarks': ['', Validators.required],
            'Mobile': ['', Validators.required],
            'Email': []
        });
    }
    ReportIssuePage.prototype.getuserid = function () {
        var _this = this;
        this.dbProvider.getAppMasterUserID().then(function (result) {
            _this.id = result;
            _this.ldap_id = _this.id.UserID;
            console.log(_this.ldap_id);
        });
    };
    ReportIssuePage.prototype.GetReportIssueDetails = function () {
        var _this = this;
        if (this.network.type == 'none') {
            var toast = this.toastCtrl.create({
                message: 'You are offline',
                duration: 4000
            });
            toast.present();
        }
        else {
            this.restProvider.RemarksUpload(this.ldap_id, this.Reportissue.controls.Remarks.value, this.Reportissue.controls.Mobile.value).then(function (res) {
                console.log(res);
            })
                .then(function (res) {
                var toast = _this.toastCtrl.create({
                    message: 'data saved successfully',
                    duration: 3000
                });
                toast.present();
            });
            this.Reportissue.reset();
        }
        console.log(this.Reportissue.controls.Remarks.value, this.Reportissue.controls.Mobile.value);
    };
    ReportIssuePage.prototype.ionViewDidLoad = function () {
        this.getuserid();
        console.log('ionViewDidLoad ReportIssuePage');
    };
    ReportIssuePage.prototype.ionViewDidEnter = function () {
        if (this.network.type == 'none') {
            var toast = this.toastCtrl.create({
                message: 'You are offline',
                duration: 4000
            });
            toast.present();
        }
    };
    ReportIssuePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-report-issue',
            templateUrl: 'report-issue.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            RestProvider,
            FormBuilder,
            DbProvider,
            ToastController,
            Network])
    ], ReportIssuePage);
    return ReportIssuePage;
}());
export { ReportIssuePage };
//# sourceMappingURL=report-issue.js.map