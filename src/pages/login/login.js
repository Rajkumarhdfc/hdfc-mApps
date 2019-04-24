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
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, http, restProvider, toastCtrl, alertCtrl, dbProvider, loadingCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.restProvider = restProvider;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.dbProvider = dbProvider;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.todo = { userID: "", password: "" };
        this.userData = this.navParams.get('UserData');
        this.todo.userID = this.userData;
        this.events.publish('userid', this.userData);
    }
    LoginPage.prototype.dropTable = function () {
        this.dbProvider.sDropTable();
        this.navCtrl.push('AppLaunchPage');
    };
    LoginPage.prototype.setApp_MasterData = function () {
        this.dbProvider.updateApp_MasterData(this.todo.password, this.authJsonObj.AUTH[0].CURVERSION, this.authJsonObj.AUTH[0].CURSUBVERSIONNO, this.todo.userID);
    };
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        this.restProvider.authUser(this.todo).then(function (data) {
            _this.authJsonObj = data;
            console.log(_this.authJsonObj);
            if (_this.authJsonObj.AUTH[0].RETURN_CD == "0") {
                _this.setApp_MasterData();
                var toast = _this.toastCtrl.create({
                    message: 'You have successfully logged in',
                    duration: 3000
                });
                toast.present();
                _this.navCtrl.push('MenuPage', { UserID: _this.todo.userID });
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Invalid User',
                    duration: 3000
                });
                toast.present();
                _this.navCtrl.pop();
            }
        });
    };
    LoginPage.prototype.changeUser = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Alert',
            message: 'Do you want to change user?',
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        console.log('Yes clicked');
                        _this.dropTable();
                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        console.log('No clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        this.events.publish('hidemenu', { menustatus: false });
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: false });
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.events.publish('hidemenu', { menustatus: false });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        this.events.publish('hidemenu', { menustatus: false });
        this.events.publish('hideHeader', { footerstatus: false, lac: '', borrname: '' });
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage = __decorate([
        Injectable(),
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            HttpClient,
            RestProvider,
            ToastController,
            AlertController,
            DbProvider,
            LoadingController,
            Events])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map