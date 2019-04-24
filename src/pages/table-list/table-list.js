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
import { RestProvider } from '../../providers/rest/rest';
import { DbProvider } from '../../providers/db/db';
import { LoadingController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
var TableListPage = /** @class */ (function () {
    function TableListPage(navCtrl, navParams, loadingCtrl, restProvider, dbProvider, network, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.restProvider = restProvider;
        this.dbProvider = dbProvider;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.tabletype = 'D';
        this.viewtableid = 'S';
        this.UserID = this.navParams.get("UserID");
        this.full_sync = this.navParams.get("full_sync");
        console.log(this.UserID);
        this.displayData = [];
    }
    TableListPage.prototype.startSync = function () {
        var _this = this;
        if (this.network.type == 'none') {
            var toast = this.toastCtrl.create({
                message: 'Please Check Internet Connection',
                duration: 3000
            });
            toast.present();
        }
        else {
            new Promise(function (resolve, reject) {
                _this.timerStart();
                _this.loadingSpinner();
                console.log("startsync clicked");
                _this.clearSync().then(function (res) {
                    if (_this.displayData.length != 0) {
                        _this.displayData.forEach(function (v) {
                            v.ROW_COUNT = 'Pending';
                            v.SYNC_FLAG = 1;
                        });
                    }
                    _this.restProvider.generateToken({}).then(function (data) {
                        _this.App_Master = data;
                        _this.addtoAppTableMasterData(_this.App_Master).then(function (res) {
                            if (_this.displayData.length == 0) {
                                _this.dbProvider.TablelistAppTableMaster().then(function (result) {
                                    _this.displayData = result;
                                    _this.displayData.forEach(function (v) {
                                        v.ROW_COUNT = 'Pending';
                                    });
                                });
                            }
                            _this.dbProvider.updateSessionID(_this.App_Master.SYNC_INFO[0].SESSION_ID, _this.UserID);
                            _this.callDownloadData(_this.App_Master.TABLE_LIST);
                        });
                    });
                });
            });
        }
    };
    TableListPage.prototype.addtoAppTableMasterData = function (app_master) {
        var _this = this;
        console.log("Inserting into App_Table_Master");
        var promises = [];
        if (app_master.TABLE_LIST.length != null) {
            var _loop_1 = function (i) {
                promises.push(new Promise(function (resolve, reject) {
                    _this.dbProvider.insertIntoAppTableMaster(app_master.TABLE_LIST[i].TABLE_ID, app_master.TABLE_LIST[i].TABLE_NAME, app_master.TABLE_LIST[i].TABLE_TYPE, app_master.TABLE_LIST[i].MAXTIMESTAMP, app_master.TABLE_LIST[i].SPECIAL_ACTION)
                        .then(function (res) {
                        if (_this.displayData.length != 0) {
                            _this.displayData.findIndex(function (v) {
                                if (v.TABLE_ID == app_master.TABLE_LIST[i].TABLE_ID) {
                                    v.LAST_SYNC_ON = res['rows']['item'](0).LAST_SYNC_ON;
                                }
                            });
                        }
                        resolve();
                    });
                }));
            };
            for (var i = 0; i < app_master.TABLE_LIST.length; i++) {
                _loop_1(i);
            }
        }
        return Promise.all(promises);
    };
    TableListPage.prototype.callDownloadData = function (tableList) {
        var _this = this;
        var callDataPromises = [];
        var iCnt = 0;
        var iCntDisplayData = this.displayData.length;
        var sLastSyncOn;
        var _loop_2 = function (i) {
            sLastSyncOn = "";
            if (tableList[i].TABLE_TYPE === 'D' || tableList[i].TABLE_TYPE === 'S') {
                console.log(tableList[i].TABLE_TYPE);
                callDataPromises.push(new Promise(function (resolve, reject) {
                    _this.displayData.findIndex(function (v) {
                        if (v.TABLE_ID == tableList[i].TABLE_ID) {
                            v.ROW_COUNT = 'Syncing';
                            sLastSyncOn = v.LAST_SYNC_ON;
                        }
                    });
                    _this.restProvider.downloadData(tableList[i], sLastSyncOn).then(function (downloadDtaObj) {
                        _this.displayData.findIndex(function (v) {
                            if (v.TABLE_ID == tableList[i].TABLE_ID) {
                                v.ROW_COUNT = 'Data Processing';
                            }
                        });
                        _this.dbProvider.executeDownloadScript(downloadDtaObj).then(function (res) {
                            console.log("executeDownloadScript");
                            _this.dbProvider.updateRowCount_v1(tableList[i].TABLE_NAME).then(function () {
                                console.log("updateRowCount_v1");
                                _this.dbProvider.getTableIdDetails(tableList[i].TABLE_NAME).then(function (result) {
                                    console.log("getDisplayData");
                                    _this.displayData.findIndex(function (element) {
                                        if (element.TABLE_ID == result[0].TABLE_ID) {
                                            if (element.ROW_COUNT != "") {
                                                element.SYNC_FLAG = 0;
                                                element.ROW_COUNT = result[0].ROW_COUNT;
                                                iCnt++;
                                            }
                                            else {
                                                element.ROW_COUNT = "-1";
                                            }
                                        }
                                    });
                                    if (_this.displayData.length == iCnt) {
                                        console.log("call data complete1");
                                        _this.DismissSpinner();
                                        _this.timerStop();
                                    }
                                });
                            });
                        });
                    });
                    resolve();
                }));
            }
        };
        for (var i in tableList) {
            _loop_2(i);
        }
        return Promise.all(callDataPromises);
    };
    TableListPage.prototype.lac_master_details = function () {
        this.navCtrl.push('LacDetailsPage');
    };
    TableListPage.prototype.clearSync = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait..',
                spinner: 'crescent'
            });
            _this.dbProvider.SelectSyncLacMaster().then(function (res) {
                console.log(res);
            });
            _this.dbProvider.clearsynctable().then(function () {
                loading.present().then(function () {
                    _this.loadData().then(function () {
                        _this.minutes = 0;
                        _this.seconds = 0;
                        _this.displayData.forEach(function (v) {
                            v.LAST_SYNC_ON = "";
                        });
                        resolve();
                        loading.dismiss();
                    });
                });
            });
        });
    };
    TableListPage.prototype.loadData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbProvider.TablelistAppTableMaster().then(function (result) {
                _this.displayData = result;
                console.log("loadData");
                console.log(_this.displayData);
                if (_this.displayData.length == 0) {
                    _this.startSync();
                }
                resolve();
            });
        });
    };
    TableListPage.prototype.refreshData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbProvider.TablelistAppTableMaster().then(function (result) {
                var tablestartsyncData = [{ "MAXTIMESTAMP": "", "TABLE_ID": 200, "TABLE_NAME": "PDANEW_LAC_MASTER", "TABLE_TYPE": "D" }, { "MAXTIMESTAMP": "", "TABLE_ID": 204, "TABLE_NAME": "PDANEW_LAC_FU_ACTION", "TABLE_TYPE": "D" }, { "MAXTIMESTAMP": "", "TABLE_ID": 205, "TABLE_NAME": "PDANEW_LAC_DETAILS", "TABLE_TYPE": "D" }, { "MAXTIMESTAMP": "", "TABLE_ID": 206, "TABLE_NAME": "PDANEW_EMI_TRANS", "TABLE_TYPE": "D" }];
                _this.displayData = tablestartsyncData;
                console.log("loadData");
                console.log(_this.displayData);
                if (_this.displayData.length == 0) {
                    _this.startSync();
                }
                resolve();
            });
        });
    };
    TableListPage.prototype.timerStart = function () {
        var _this = this;
        this.seconds = 0;
        this.minutes = 0;
        this.timer = setInterval(function () {
            _this.seconds++;
            if (_this.seconds == 60) {
                _this.minutes = _this.minutes + 1;
                _this.seconds = 0;
            }
        }, 1000);
    };
    TableListPage.prototype.timerStop = function () {
        clearInterval(this.timer);
    };
    TableListPage.prototype.loadingSpinner = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
        this.loading.present();
    };
    TableListPage.prototype.DismissSpinner = function () {
        this.loading.dismissAll();
    };
    TableListPage.prototype.ngOnInit = function () {
        if (this.full_sync == "Y") {
            this.loadData().then(function () {
            });
        }
        else {
            this.refreshData().then(function () {
                console.log('inside refresh');
            });
        }
    };
    TableListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-table-list',
            templateUrl: 'table-list.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            RestProvider,
            DbProvider,
            Network,
            ToastController])
    ], TableListPage);
    return TableListPage;
}());
export { TableListPage };
//# sourceMappingURL=table-list.js.map