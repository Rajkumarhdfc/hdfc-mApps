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
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Events } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DbProvider } from '../../providers/db/db';
import { Network } from '@ionic-native/network';
import { Base64 } from '@ionic-native/base64';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, base64, navParams, alertCtrl, loadingCtrl, restProvider, dbProvider, toastCtrl, network, events) {
        this.navCtrl = navCtrl;
        this.base64 = base64;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.restProvider = restProvider;
        this.dbProvider = dbProvider;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.events = events;
        this.todo = { userID: "", password: "" };
        this.table_type = 'D';
        this.table_id_prop_class = 229;
        this.table_id_contact_upd = 230;
        this.table_id_add_follow_upd = 209;
        this.userData = this.navParams.get('UserID');
        console.log(this.userData);
        this.todo.userID = this.userData;
    }
    MenuPage.prototype.navigate_continue = function () {
        this.navCtrl.push('LacDetailsPage', { UserID: this.todo.userID });
    };
    MenuPage.prototype.navigate_reminders = function () {
        this.navCtrl.push('RemindersPage');
    };
    MenuPage.prototype.navigate_reportissue = function () {
        this.navCtrl.push("ReportIssuePage");
    };
    MenuPage.prototype.navigate_Sync = function () {
        console.log(this.todo.userID);
        this.navCtrl.push('TableListPage', { UserID: this.todo.userID, full_sync: 'Y' });
    };
    MenuPage.prototype.clearlevel = function () {
        this.dbProvider.ClearLevelUpdate().then(function (res) {
            console.log('level cleared');
            alert('Level cleared');
        });
    };
    MenuPage.prototype.presentConfirm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Do you want to view your reminders?',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        _this.navCtrl.push('RemindersPage');
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        _this.navCtrl.push('LacDetailsPage', { UserID: _this.todo.userID });
                    }
                }
            ]
        });
        alert.present();
    };
    /////////////////////////////////////Refresh////////////////////////////////////////////////////////////////////
    MenuPage.prototype.refreshData = function () {
        this.navCtrl.push('TableListPage', { UserID: this.todo.userID, full_sync: 'N' });
    };
    MenuPage.prototype.getuserid = function () {
        var _this = this;
        this.dbProvider.getAppMasterUserID().then(function (result) {
            _this.id = result;
            _this.ldap_id = _this.id.UserID;
            console.log(_this.ldap_id);
        });
    };
    MenuPage.prototype.getSessionId = function () {
        var _this = this;
        this.dbProvider.getsessionid().then(function (result) {
            var sid;
            sid = result;
            _this.sessionid = sid.SessionId;
            console.log(_this.sessionid);
        });
    };
    MenuPage.prototype.SelectAllPropclass = function () {
        var _this = this;
        this.dbProvider.selectallPropClass().then(function (res) {
            console.log(res);
            _this.totprop = res.length;
            if (res.length != 0) {
                _this.restProvider.uploadData(_this.table_id_prop_class, res, _this.sessionid)
                    .then(function (response) {
                    console.log(response);
                    _this.authobj = response;
                    if (_this.authobj.UploadTable[0].RETURN_CODE == "0") {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 2500
                        });
                        toast.present();
                        _this.dbProvider.deleteallPropClass().then(function (result) {
                            _this.dbProvider.GlobalUpload().then(function (result) {
                                console.log(result);
                                var count = result[0].totalcount;
                                /////////////////update upload count/////////////////////////
                                _this.upload_count = count;
                                console.log(_this.upload_count);
                            });
                            console.log(result);
                        });
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'upload error pls try again',
                            duration: 2500
                        });
                        toast.present();
                    }
                });
            }
        });
    };
    MenuPage.prototype.SelectAllFuAction = function () {
        var _this = this;
        this.dbProvider.selectallnew_fu_action().then(function (res) {
            console.log(res);
            if (res.length != 0) {
                _this.restProvider.uploadData(_this.table_id_add_follow_upd, res, _this.sessionid)
                    .then(function (response) {
                    console.log(response);
                    _this.authobj = response;
                    if (_this.authobj.UploadTable[0].RETURN_CODE == "0") {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 2500
                        });
                        toast.present();
                        _this.dbProvider.deleteallnew_fu_action().then(function (result) {
                            _this.dbProvider.GlobalUpload().then(function (result) {
                                console.log(result);
                                var count = result[0].totalcount;
                                /////////////////update upload count/////////////////////////
                                _this.upload_count = count;
                                console.log(_this.upload_count);
                            });
                            console.log(result);
                        });
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'upload error pls try again',
                            duration: 5000
                        });
                        toast.present();
                    }
                });
            }
        });
    };
    MenuPage.prototype.SelectAllContactUpd = function () {
        var _this = this;
        this.dbProvider.selectallContact_Update().then(function (res) {
            console.log(res);
            if (res.length != 0) {
                _this.restProvider.uploadData(_this.table_id_contact_upd, res, _this.sessionid)
                    .then(function (response) {
                    console.log(response);
                    _this.authobj = response;
                    if (_this.authobj.UploadTable[0].RETURN_CODE == "0") {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 2500
                        });
                        toast.present();
                        _this.dbProvider.deleteallContact_Update().then(function (result) {
                            _this.dbProvider.GlobalUpload().then(function (result) {
                                console.log(result);
                                var count = result[0].totalcount;
                                /////////////////update upload count/////////////////////////
                                _this.upload_count = count;
                                console.log(_this.upload_count);
                            });
                            console.log(result);
                        });
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'upload error pls try again',
                            duration: 5000
                        });
                        toast.present();
                    }
                });
            }
        });
    };
    MenuPage.prototype.globalupload = function () {
        var _this = this;
        if (this.network.type == "none") {
            var toast = this.toastCtrl.create({
                message: 'Check Internet Connection',
                duration: 2500
            });
            toast.present();
        }
        else {
            this.dbProvider.SelectLevelUpd().then(function (res) {
                _this.difflevel = res;
                console.log(_this.difflevel);
                if (_this.difflevel.length != 0) {
                    for (var i = 0; i < _this.difflevel.length; i++) {
                        _this.restProvider.Level_Upd(_this.difflevel[i].LAC_NO, _this.difflevel[i].LEVEL1, _this.difflevel[i].REMARK).then(function (res) {
                            console.log(res);
                        });
                    }
                }
            });
            if (this.upload_count == 0) {
                console.log("all the records alreay uploaded");
                //alert("all records uploaded");
            }
            else {
                this.SelectAllPropclass();
                this.SelectAllFuAction();
                this.SelectAllContactUpd();
                //  let toast = this.toastCtrl.create({
                //                              message: 'Uploaded Successfully',
                //                              duration: 2500
                //                              });
                //                              toast.present(); 
            }
        }
    };
    MenuPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // this.SelectAllPropclass();
        // this.SelectAllContactUpd();
        // this.SelectAllFuAction();
        this.dbProvider.GlobalUpload().then(function (result) {
            console.log(result);
            var count = result[0].totalcount;
            /////////////////update upload count/////////////////////////
            _this.upload_count = count;
            console.log(_this.upload_count);
        });
        this.getSessionId();
        console.log('ionViewDidLoad MenuPage');
    };
    MenuPage.prototype.ionViewWillLeave = function () {
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: false });
    };
    MenuPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.dbProvider.GlobalUpload().then(function (result) {
            console.log(result);
            var count = result[0].totalcount;
            /////////////////update upload count/////////////////////////
            _this.upload_count = count;
            console.log(_this.upload_count);
        });
        this.dbProvider.PhotoUploadcount().then(function (result) {
            console.log(result);
            var countphoto = result[0].photoupcnt;
            /////////////////update upload count/////////////////////////
            _this.photoupldcount = countphoto;
            console.log(_this.photoupldcount);
        });
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: false });
    };
    MenuPage.prototype.globaluploadPhoto = function () {
        var _this = this;
        if (this.network.type == "none") {
            var toast = this.toastCtrl.create({
                message: 'Check Internet Connection',
                duration: 2500
            });
            toast.present();
        }
        else {
            this.dbProvider.selectPhotoUpload().then(function (res) {
                for (var i = 0; i < res.length; i++) {
                    _this.encodebase64image(res[i].LAC_NO, res[i].PhotoType, res[i].Path, res[i].Photourl, res[i].prop_no, i + 1, res.length);
                }
            });
        }
    };
    MenuPage.prototype.encodebase64image = function (lacno, phototype, file_name, fileurl, propno, index, resp_length) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
        loading.present();
        this.base64.encodeFile(fileurl).then(function (base64File) {
            base64File = base64File.split(",")[1];
            console.log(base64File);
            _this.restProvider.
                uploadphoto(lacno, _this.ldap_id, propno, file_name, _this.sessionid, base64File).
                then(function (res) {
                console.log(res);
                if (res.UploadDocument[0].RETURN_CODE == 0) {
                    console.log(index);
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: 'Error in upload',
                        duration: 2500
                    });
                }
                loading.dismiss();
                _this.dbProvider.DeleteTablePhotoUpld().then(function (res) {
                    if (index == resp_length) {
                        alert('Uploaded successfully');
                    }
                    console.log("deleted photos", res);
                    _this.photoupldcount = 0;
                });
            });
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    };
    MenuPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-menu',
            templateUrl: 'menu.html',
        }),
        __metadata("design:paramtypes", [NavController, Base64,
            NavParams,
            AlertController,
            LoadingController,
            RestProvider,
            DbProvider,
            ToastController,
            Network,
            Events])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.js.map