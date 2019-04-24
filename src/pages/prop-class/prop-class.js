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
import { Events, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the PropClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PropClassPage = /** @class */ (function () {
    function PropClassPage(navCtrl, navParams, dbProvider, events, formbuilder, restProvider, toastCtrl, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.events = events;
        this.formbuilder = formbuilder;
        this.restProvider = restProvider;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.table_id = 229;
        this.data = this.navParams.get('lac');
        console.log(this.data);
        this.Propclass = this.formbuilder.group({ 'Classcode': ['', Validators.required],
            'SpecificValue': []
        });
    }
    PropClassPage.prototype.getuserid = function () {
        var _this = this;
        this.dbProvider.getAppMasterUserID().then(function (result) {
            _this.id = result;
            _this.ldap_id = _this.id.UserID;
            console.log(_this.ldap_id);
        });
    };
    PropClassPage.prototype.getSessionId = function () {
        var _this = this;
        this.dbProvider.getsessionid().then(function (result) {
            var sid;
            sid = result;
            _this.sessionid = sid.SessionId;
            console.log(_this.sessionid);
        });
    };
    PropClassPage.prototype.resetForm = function () {
        this.Propclass.reset();
    };
    PropClassPage.prototype.PropClassInsertData = function () {
        var _this = this;
        var authobj;
        if (this.network.type != 'none') {
            this.dbProvider.insertIntoProp_Class(this.Propclass.value.Classcode, this.data, this.Propclass.value.SpecificValue, this.ldap_id)
                .then(function (result) {
                _this.result = result;
                console.log(_this.result);
                _this.restProvider.uploadData(_this.table_id, result, _this.sessionid)
                    .then(function (res) {
                    authobj = res;
                    console.log(res);
                    if (authobj.UploadTable[0].RETURN_CODE == "0") {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 5000
                        });
                        toast.present();
                        _this.dbProvider.Delete_Class(_this.data).then((function (result) {
                        }));
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'upload error pls try again',
                            duration: 5000
                        });
                        toast.present();
                    }
                    console.log(_this.table_id);
                    console.log(result);
                });
            }, function (error) {
                console.log("ERROR: ", error);
            });
        }
        else {
            var toast = this.toastCtrl.create({
                message: 'data stored locally.To Upload Please turn your internet ON',
                duration: 5000
            });
            toast.present();
            this.dbProvider.insertIntoProp_Class(this.Propclass.value.Classcode, this.data, this.Propclass.value.SpecificValue, this.ldap_id)
                .then(function (result) {
                _this.result = result;
                console.log(_this.result);
            });
        }
        this.resetForm();
    };
    /////////////////////////////////network check//////////////////////////////
    // ionViewDidEnter() {
    //     this.connected = this.network.onConnect().subscribe(connection => {
    //           console.log(connection);
    //            console.log('network connected!');
    //           this.displayNetworkUpdate(connection.type);
    //       }, error => console.error(error));
    //       this.disconnected = this.network.onDisconnect().subscribe(connection => {
    //             console.log(connection);
    //             this.displayNetworkUpdate(connection.type);
    //         }, error => console.error(error));
    //      console.log(this.disconnected);
    //     console.log(this.network.type);
    //   }
    PropClassPage.prototype.displayNetworkUpdate = function (connectionState) {
        var _this = this;
        var authobj;
        this.toastCtrl.create({
            message: 'You are now ' + connectionState + '!',
            duration: 5000
        }).present();
        console.log(this.network.type);
        ////////////////////////NETWORK  IF PRESENT//////////////////////////////////////
        if (this.network.type != 'none' && this.result != null) {
            this.dbProvider.SelectProp_Class(this.data).then((function (result) {
                console.log(result);
                _this.restProvider.uploadData(_this.table_id, result, _this.sessionid)
                    .then(function (res) {
                    console.log(res);
                    authobj = res;
                    if (authobj.UploadTable[0].RETURN_CODE == "0") {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 5000
                        });
                        toast.present();
                        _this.dbProvider.deleteallPropClass().then(function (result) {
                            console.log(result);
                        });
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'upload error pls try again',
                            duration: 5000
                        });
                        toast.present();
                        console.log(_this.table_id);
                    }
                });
            }));
        }
    };
    // ionViewWillLeave(){
    //   this.connected.unsubscribe();
    //   this.disconnected.unsubscribe();
    // }
    PropClassPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.getuserid();
        this.getSessionId();
        console.log(this.data);
        this.dbProvider.selectPropClassCode(this.data).then(function (res) {
            var result = res;
            if (res != null && res != undefined) {
                _this.Propclass.value.Classcode = res[0].class_code;
            }
            console.log(result);
        });
        console.log('ionViewDidLoad PropClassPage');
    };
    PropClassPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-prop-class',
            templateUrl: 'prop-class.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            DbProvider,
            Events,
            FormBuilder,
            RestProvider,
            ToastController,
            Network])
    ], PropClassPage);
    return PropClassPage;
}());
export { PropClassPage };
//# sourceMappingURL=prop-class.js.map