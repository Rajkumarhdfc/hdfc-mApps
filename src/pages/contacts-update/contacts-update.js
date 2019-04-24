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
import { IonicPage, NavController, NavParams, Content, ToastController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
/**
/**
 * Generated class for the ContactsUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ContactsUpdatePage = /** @class */ (function () {
    function ContactsUpdatePage(navCtrl, navParams, dbProvider, formbuilder, restProvider, toastCtrl, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.formbuilder = formbuilder;
        this.restProvider = restProvider;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.table_id = 230;
        this.data = this.navParams.get('lac');
        console.log(this.data);
        this.ContactsUpdate = this.formbuilder.group({ 'name': ['', Validators.required],
            'Relation': ['', Validators.required],
            'Address1': ['', Validators.required],
            'Address2': [],
            'TelNo': [],
            'offtelno': [],
            'Email': [],
            'Mobile1': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
            'Mobile2': ['', Validators.compose([Validators.pattern("^[0-9]+$")])],
            'Fax': []
        });
    }
    ContactsUpdatePage.prototype.getuserid = function () {
        var _this = this;
        this.dbProvider.getAppMasterUserID().then(function (result) {
            _this.id = result;
            _this.ldap_id = _this.id.UserID;
            console.log(_this.ldap_id);
        });
    };
    ContactsUpdatePage.prototype.getSessionId = function () {
        var _this = this;
        this.dbProvider.getsessionid().then(function (result) {
            var sid;
            sid = result;
            _this.sessionid = sid.SessionId;
            console.log(_this.sessionid);
        });
    };
    ContactsUpdatePage.prototype.resetForm = function () {
        this.ContactsUpdate.reset();
    };
    ContactsUpdatePage.prototype.Fu_ContactUpdate = function () {
        var _this = this;
        var authobj;
        if (this.network.type != 'none') {
            this.dbProvider.insertIntoContact_Update(this.data, this.ContactsUpdate.value.name, this.ContactsUpdate.value.Relation, this.ContactsUpdate.value.Address1, this.ContactsUpdate.value.Address2, this.ContactsUpdate.value.Mobile1, this.ContactsUpdate.value.Mobile2, this.ContactsUpdate.value.Email, this.ContactsUpdate.value.offtelno, this.ContactsUpdate.value.TelNo, this.ContactsUpdate.value.Fax, this.ldap_id)
                .then(function (result) {
                _this.result = result;
                console.log(_this.data, _this.ContactsUpdate.value.name, _this.ContactsUpdate.value.Relation, _this.ContactsUpdate.value.Address1, _this.ContactsUpdate.value.Address2, _this.ContactsUpdate.value.Mobile1, _this.ContactsUpdate.value.Mobile2, _this.ContactsUpdate.value.Email, _this.ContactsUpdate.value.offtelno, _this.ContactsUpdate.value.TelNo, _this.ContactsUpdate.value.Fax, _this.ldap_id);
                _this.restProvider.uploadData(_this.table_id, result, _this.sessionid)
                    .then(function (res) {
                    authobj = res;
                    if (authobj.UploadTable[0].RETURN_CODE == 0) {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 5000
                        });
                        toast.present();
                        _this.dbProvider.Delete_Contact_Update(_this.data).then((function (result) {
                        }));
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'upload error pls try again',
                            duration: 5000
                        });
                        toast.present();
                    }
                    console.log(res);
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
            this.dbProvider.insertIntoContact_Update(this.data, this.ContactsUpdate.value.name, this.ContactsUpdate.value.Relation, this.ContactsUpdate.value.Address1, this.ContactsUpdate.value.Address2, this.ContactsUpdate.value.Mobile1, this.ContactsUpdate.value.Mobile2, this.ContactsUpdate.value.Email, this.ContactsUpdate.value.offtelno, this.ContactsUpdate.value.TelNo, this.ContactsUpdate.value.Fax, this.ldap_id)
                .then(function (result) {
                _this.result = result;
                console.log(_this.result);
            });
        }
        this.resetForm();
    };
    // ionViewDidEnter() {
    //      this.connected = this.network.onConnect().subscribe(connection => {
    //            console.log(connection);
    //             console.log('network connected!');
    //            this.displayNetworkUpdate(connection.type);
    //        }, error => console.error(error));
    //        this.disconnected = this.network.onDisconnect().subscribe(connection => {
    //              console.log(connection);
    //              this.displayNetworkUpdate(connection.type);
    //          }, error => console.error(error));
    //       console.log(this.disconnected);
    //      console.log(this.network.type);
    //    }
    ContactsUpdatePage.prototype.displayNetworkUpdate = function (connectionState) {
        var _this = this;
        var authobj;
        this.toastCtrl.create({
            message: 'You are now ' + connectionState + '!',
            duration: 5000
        }).present();
        console.log(this.network.type);
        /////////////////////////////NETWORK  IF PRESENT//////////////////////////////////////
        if (this.network.type != 'none' && this.result != null) {
            this.dbProvider.SelectContact_Update(this.data).then((function (result) {
                console.log(result);
                _this.restProvider.uploadData(_this.table_id, _this.result, _this.sessionid)
                    .then(function (res) {
                    console.log(res);
                    authobj = res;
                    if (authobj.UploadTable[0].RETURN_CODE == "0") {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 5000
                        });
                        toast.present();
                        _this.dbProvider.Delete_Contact_Update(_this.data).then(function (result) {
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
    ContactsUpdatePage.prototype.GetBorrRelation = function () {
        var _this = this;
        this.dbProvider.getBorrDetails()
            .then(function (result) {
            _this.borr_rln = result;
            console.log(result);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    ContactsUpdatePage.prototype.ionViewDidLoad = function () {
        this.getuserid();
        this.getSessionId();
        this.GetBorrRelation();
        console.log('ionViewDidLoad ContactsUpdatePage');
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ContactsUpdatePage.prototype, "content", void 0);
    ContactsUpdatePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-contacts-update',
            templateUrl: 'contacts-update.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, DbProvider, FormBuilder, RestProvider, ToastController, Network])
    ], ContactsUpdatePage);
    return ContactsUpdatePage;
}());
export { ContactsUpdatePage };
//# sourceMappingURL=contacts-update.js.map