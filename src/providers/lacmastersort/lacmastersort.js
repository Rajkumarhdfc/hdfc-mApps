var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
/*
  Generated class for the LacmastersortProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LacmastersortProvider = /** @class */ (function () {
    function LacmastersortProvider(http, loadingCtrl, alertCtrl, dbProvider) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.dbProvider = dbProvider;
        this.desc = "desc";
        this.asc = "asc";
        console.log('Hello LacmastersortProvider Provider');
    }
    LacmastersortProvider.prototype.LacSort = function (allRows, alllen, totlen, crrlen, tableItemlist) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait..',
                spinner: 'crescent'
            });
            var alert = _this.alertCtrl.create();
            alert.setTitle('Sort By');
            alert.addInput({
                type: 'radio',
                label: 'Name',
                value: 'borr_name',
                checked: true,
            });
            alert.addInput({
                type: 'radio',
                label: 'Area',
                value: 'area_desc',
                checked: false
            });
            alert.addInput({
                type: 'radio',
                label: 'Months O/S',
                value: 'months_os',
                checked: false
            });
            alert.addInput({
                type: 'radio',
                label: 'Allocation R/S',
                value: 'prop_area_desc',
                checked: false
            });
            alert.addInput({
                type: 'radio',
                label: 'Level',
                value: 'difficulty_level',
                checked: false
            });
            alert.addInput({
                type: 'radio',
                label: 'Plt Comb',
                value: 'plt',
                checked: false
            });
            alert.addInput({
                type: 'radio',
                label: 'my_basket',
                value: 'my_basket',
                checked: false
            });
            alert.addInput({
                type: 'radio',
                label: 'followupflag',
                value: 'followupflag',
                checked: false
            });
            alert.addButton({
                text: 'ASC',
                handler: function (data) {
                    console.log(data);
                    _this.testRadioResult = data;
                    _this.dbProvider.LacMasterDetailsSort(_this.asc, _this.testRadioResult).then(function (res) {
                        var re2 = res;
                        loading.present().then(function () {
                            loading.dismiss();
                        });
                        resolve(res);
                    }, function (error) {
                        console.log("ERROR: ", error);
                    });
                }
            });
            alert.addButton({
                text: 'DESC',
                handler: function (data) {
                    console.log(data);
                    _this.testRadioResult = data;
                    _this.dbProvider.LacMasterDetailsSort(_this.desc, _this.testRadioResult).then(function (res) {
                        var re2 = res;
                        loading.present().then(function () {
                            loading.dismiss();
                        });
                        resolve(res);
                    }, function (error) {
                        console.log("ERROR: ", error);
                    });
                }
            });
            alert.present();
        });
    };
    LacmastersortProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            LoadingController,
            AlertController,
            DbProvider])
    ], LacmastersortProvider);
    return LacmastersortProvider;
}());
export { LacmastersortProvider };
//# sourceMappingURL=lacmastersort.js.map