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
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { Network } from '@ionic-native/network';
import { Events } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Content } from 'ionic-angular';
/**
 * Generated class for the AddFollowUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddFollowUpPage = /** @class */ (function () {
    function AddFollowUpPage(navCtrl, navParams, dbProvider, modalCtrl, formbuilder, restProvider, toastCtrl, network, events, datePipe, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.modalCtrl = modalCtrl;
        this.formbuilder = formbuilder;
        this.restProvider = restProvider;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.events = events;
        this.datePipe = datePipe;
        this.loadingCtrl = loadingCtrl;
        this.showList = false;
        this.showList1 = false;
        this.showList2 = false;
        this.showList3 = false;
        this.showList4 = false;
        this.showList5 = false;
        this.network_flag = 0;
        this.table_id = 209;
        this.gflag = false;
        this.cross = [];
        this.crossflag = false;
        this.today_date = new Date();
        this.error = { isError: false, errorMessage: '' };
        this.error1 = { isError: false, errorMessage: '' };
        this.tdate = this.datePipe.transform(this.today_date, "yyyy-MM-dd");
        this.version_no = 3;
        this.saveflag = false;
        this.data = this.navParams.get('lac');
        this.addfollowup = this.formbuilder.group({ 'action': ['', Validators.required],
            'areacode': ['', Validators.required],
            'ActionDate': ['', Validators.required],
            'response': ['', Validators.required],
            'ObsCd': ['', Validators.required],
            'NextActionDate': ['', Validators.required],
            'ActionToBe': ['', Validators.required],
            'AmtSpent': ['', Validators.compose([Validators.pattern("^[0-9]{1,6}$")])],
            'AmtCharg': ['', Validators.compose([Validators.pattern("^[0-9]{1,6}$")])],
            'CiType': [],
            'Remark': ['', Validators.required],
            'ActionType': ['', Validators.required],
            'RiskEvent': ['', Validators.required],
        });
        this.addfollowup.controls.ActionType.setValue('P');
    }
    AddFollowUpPage.prototype.Getfuaction_ci_type = function () {
        var _this = this;
        this.dbProvider.fuaction_ci_type()
            .then(function (result) {
            _this.citype = result;
            console.log(result);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    AddFollowUpPage.prototype.Getfuaction_risk_event = function () {
        var _this = this;
        this.dbProvider.fuaction_risk_event()
            .then(function (result) {
            _this.riskevent = result;
            console.log(result);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    AddFollowUpPage.prototype.getItems1 = function (index, event) {
        var _this = this;
        // Reset items back to all of the items
        this.crosslinkindex = index;
        // console.log(this.addfollowup.controls.action.value);
        this.name = 'ACTION_CD';
        // this.crosslinkactn=this.cross;
        console.log(this.cross);
        var val = event.target.value;
        // this.selected=val;
        console.log(val);
        this.value = event.target.value;
        console.log(name + "" + val);
        //set val to the value of the searchbar
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && val.length > 1) {
            this.dbProvider.f_action_search(this.name, val)
                .then(function (result) {
                console.log(name + " " + val);
                _this.list = result;
                console.log(_this.list);
            }, function (error) {
                console.log("ERROR: ", error);
            });
            // Show the results
            this.showList5 = true;
        }
        else {
            // hide the results when the query is empty
            this.showList5 = false;
            this.list = null;
        }
    };
    AddFollowUpPage.prototype.getAmtChrg = function (index, event) {
        this.crosslinks[index].amount_cr_cl = event.target.value;
        ;
    };
    AddFollowUpPage.prototype.getItems_all = function (name, event, listid) {
        var _this = this;
        var val = event.target.value;
        if (val && val.trim() != '' && val.length >= 2) {
            console.log(val.length);
            this.dbProvider.f_action_searchareacode(name, val)
                .then(function (result) {
                console.log(name + " " + val);
                _this.list1 = result;
                console.log(_this.list1);
            }, function (error) {
                console.log("ERROR: ", error);
            });
            this['showList' + listid] = true;
        }
        else {
            this['showList' + listid] = false;
        }
    };
    /////////////////////////////////////////////////////////
    //////on select of specific value from list//////////////
    ////////////////////////////////////////////////////////
    AddFollowUpPage.prototype.optionscross = function (val, desc) {
        this.crosslinkactn = desc;
        this.crosslinks[this.crosslinkindex].action_cl = desc;
        this.crosslinks[this.crosslinkindex].action_cl_val = val;
        this.actioncross = val;
        this.showList5 = false;
        console.log(this.crosslinkactn);
        console.log(this.crosslinkactn, this.action);
    };
    AddFollowUpPage.prototype.setValue_All = function (val, desc, listid, desc_to, value_To, nextElement) {
        this['showList' + listid] = false;
        this.list1 = [];
        var key = desc_to;
        var obj = {};
        obj[key] = desc;
        console.log(obj[key]);
        this.addfollowup.patchValue(obj);
        this[value_To] = val;
        console.log(val, desc, listid, desc_to, value_To);
        // nextElement.setFocus();
        this.content.scrollTo(0, nextElement);
    };
    AddFollowUpPage.prototype.getuserid = function () {
        var _this = this;
        this.dbProvider.getAppMasterUserID().then(function (result) {
            _this.id = result;
            _this.ldap_id = _this.id.UserID;
            console.log(_this.ldap_id);
        });
    };
    AddFollowUpPage.prototype.getSessionId = function () {
        var _this = this;
        this.dbProvider.getsessionid().then(function (result) {
            var sid;
            sid = result;
            _this.sessionid = sid.SessionId;
            console.log(_this.sessionid);
        });
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    AddFollowUpPage.prototype.Fu_ActionInsertData = function () {
        var _this = this;
        console.log(this.addfollowup.value.ActionType);
        var authobj;
        if (this.network.type != 'none') {
            this.dbProvider.insertIntonew_fu_action(this.data, this.addfollowup.value.ActionType, this.addfollowup.value.RiskEvent, this.areacode, this.addfollowup.value.AmtSpent, this.action, this.response, this.acntobe, this.obscd, this.addfollowup.value.NextActionDate, this.addfollowup.value.CiType, this.addfollowup.value.AmtCharg, this.addfollowup.value.Remark, this.addfollowup.value.ActionDate, this.ldap_id, this.version_no)
                .then(function (result) {
                _this.gflag = true;
                _this.result = result;
                var loading = _this.loadingCtrl.create({
                    content: 'Please wait..',
                    spinner: 'crescent'
                });
                loading.present();
                _this.restProvider.uploadData(_this.table_id, result, _this.sessionid)
                    .then(function (res) {
                    console.log(_this.table_id);
                    console.log(res);
                    authobj = res;
                    if (authobj.UploadTable[0].RETURN_CODE == 0) {
                        var toast = _this.toastCtrl.create({
                            message: 'uploaded successfully',
                            duration: 5000
                        });
                        _this.events.publish('headercolor', { hcolor: _this.gflag, lacno: _this.data });
                        toast.present();
                        _this.saveflag = true;
                        _this.dbProvider.Delete_new_fu_action(_this.data).then((function (result) {
                        }));
                        loading.dismiss();
                        _this.dbProvider.updatefollowupflag(_this.gflag, _this.data).then(function () {
                            console.log("followup flag updated");
                            console.log(_this.gflag);
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
            this.dbProvider.insertIntonew_fu_action(this.data, this.addfollowup.value.ActionType, this.addfollowup.value.RiskEvent, this.areacode, this.addfollowup.value.AmtSpent, this.action, this.response, this.acntobe, this.obscd, this.addfollowup.value.NextActionDate, this.addfollowup.value.CiType, this.addfollowup.value.AmtCharg, this.addfollowup.value.Remark, this.addfollowup.value.ActionDate, this.ldap_id, this.version_no)
                .then(function (result) {
                _this.result = result;
                console.log(_this.result);
                _this.saveflag = true;
            });
        }
    };
    AddFollowUpPage.prototype.clUpload = function (lac_no_cl, actioncross, AmtChargcrosslink) {
        var _this = this;
        var authobj1;
        this.dbProvider.insertIntonew_fu_action(lac_no_cl, this.addfollowup.value.ActionType, this.addfollowup.value.RiskEvent, this.areacode, this.addfollowup.value.AmtSpent, actioncross, this.response, this.acntobe, this.obscd, this.addfollowup.value.NextActionDate, this.addfollowup.value.CiType, AmtChargcrosslink, this.addfollowup.value.Remark, this.addfollowup.value.ActionDate, this.ldap_id, this.version_no)
            .then(function (result) {
            _this.gflag = true;
            _this.result = result;
            var loading = _this.loadingCtrl.create({
                content: 'Please wait..',
                spinner: 'crescent'
            });
            loading.present();
            _this.restProvider.uploadData(_this.table_id, result, _this.sessionid)
                .then(function (res) {
                console.log(_this.table_id);
                console.log(res);
                authobj1 = res;
                if (authobj1.UploadTable[0].RETURN_CODE == 0) {
                    var toast = _this.toastCtrl.create({
                        message: 'uploaded successfully',
                        duration: 5000
                    });
                    console.log(_this.gflag);
                    _this.events.publish('headercolor', { hcolor: _this.gflag, lacno: _this.data });
                    console.log(_this.gflag);
                    toast.present();
                    _this.dbProvider.Delete_new_fu_action(lac_no_cl).then((function (result) {
                    }));
                    loading.dismiss();
                    _this.dbProvider.updatefollowupflag(_this.gflag, _this.data).then(function () {
                        console.log("followup flag updated");
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
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////actioncross
    AddFollowUpPage.prototype.Fu_ActionInsertDataCrosslinks = function () {
        var _this = this;
        var authobj1;
        console.log(this.crosslinks);
        for (var i = 0; i < this.crosslinks.length; i++) {
            var lac_no_cl = this.crosslinks[i].lac_no1;
            this.actioncross = this.crosslinks[i].action_cl_val;
            console.log(this.actioncross);
            console.log();
            this.AmtChargcrosslink = this.crosslinks[i].amount_cr_cl;
            console.log(this.actioncross, this.AmtChargcrosslink);
            if (this.actioncross == "" || this.actioncross == undefined) {
                alert('Pls select action type in cross link');
                return false;
            }
            else {
                if (this.network.type != 'none') {
                    this.clUpload(lac_no_cl, this.actioncross, this.AmtChargcrosslink);
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: 'data stored locally.To Upload Please turn your internet ON',
                        duration: 5000
                    });
                    toast.present();
                    this.dbProvider.insertIntonew_fu_action(lac_no_cl, this.addfollowup.value.ActionType, this.addfollowup.value.RiskEvent, this.areacode, this.addfollowup.value.AmtSpent, this.actioncross, this.response, this.acntobe, this.obscd, this.addfollowup.value.NextActionDate, this.addfollowup.value.CiType, this.AmtChargcrosslink, this.addfollowup.value.Remark, this.addfollowup.value.ActionDate, this.ldap_id, this.version_no)
                        .then(function (result) {
                        _this.result = result;
                        console.log(_this.result);
                    });
                }
            }
        }
    };
    AddFollowUpPage.prototype.resetForm = function () {
        this.addfollowup.reset();
    };
    // displayNetworkUpdate(connectionState: string){
    //     var authobj     
    //     // this.toastCtrl.create({
    //     //     message: 'You are now ' + connectionState + '!',
    //     //     duration: 3000
    //     // }).present();
    //     console.log(this.network.type);
    //   /////////////////////////////NETWORK  IF PRESENT//////////////////////////////////////
    //     if(this.network.type!='none')
    //     { 
    //    this.dbProvider.selectallnew_fu_action()
    //   .then((resp=>{
    //             console.log(resp);
    //             this.selected_Array=resp;
    //               if(this.selected_Array.length!=0){
    //                 this.restProvider.uploadData(this.table_id,this.selected_Array,this.sessionid)
    //                .then(res => { 
    //                           console.log(res);
    //                           authobj=res;
    //                             if(authobj.UploadTable[0].RETURN_CODE=="0")
    //                             {
    //                               let toast = this.toastCtrl.create({
    //                               message: 'uploaded successfully',
    //                               duration: 3000
    //                               });
    //                               toast.present();
    //                               this.dbProvider.deleteallnew_fu_action().then((result)=>{
    //                               console.log(result);
    //                             })
    //                                this.dbProvider.updatefollowupflag(this.gflag,this.data).then(()=>{
    //                               console.log("followup flag updated");
    //                               console.log(this.gflag);
    //                             })
    //                             }
    //                           else
    //                           {
    //                           let toast = this.toastCtrl.create({
    //                             message: 'all records uploaded already',
    //                             duration: 3000
    //                             });
    //                             toast.present(); 
    //                           }
    //               })
    //             }
    //       })
    //     )
    //     }
    //    } 
    AddFollowUpPage.prototype.getcrossDetails = function () {
        var _this = this;
        this.dbProvider.SelectCrossLinkDetails(this.data).then(function (result) {
            _this.crosslinks = result;
            if (_this.crosslinks.length > 0) {
                _this.crossflag = true;
            }
            console.log(_this.crosslinks);
        });
    };
    ////////////////////////date/////////////////////////////////////////////////////
    AddFollowUpPage.prototype.compareTwoDate1 = function () {
        console.log(this.tdate);
        if (this.addfollowup.value.ActionDate > this.tdate) {
            this.error = { isError: true, errorMessage: "Action date cannot be future date" };
            console.log("End ActionDate can't be a future date");
        }
        else {
            this.content.scrollTo(0, 300);
            this.error = { isError: false, errorMessage: " " };
        }
    };
    AddFollowUpPage.prototype.compareTwoDate2 = function () {
        if (this.addfollowup.value.NextActionDate < this.tdate) {
            this.error1 = { isError: true, errorMessage: "Next action date should be future date" };
            console.log("End NextDate can't be a past date");
        }
        else {
            this.content.scrollTo(0, 580);
            this.error1 = { isError: false, errorMessage: " " };
        }
    };
    ////////////////////////////////////////////////////////////////////////////
    // ionViewWillLeave(){
    //   this.connected.unsubscribe();
    //   this.disconnected.unsubscribe();
    // }
    AddFollowUpPage.prototype.ionViewDidLoad = function () {
        this.getcrossDetails();
        this.getSessionId();
        this.getuserid();
        this.Getfuaction_ci_type();
        this.Getfuaction_risk_event();
        console.log('ionViewDidLoad AddFollowUpPage');
    };
    __decorate([
        ViewChild('scroll'),
        __metadata("design:type", Object)
    ], AddFollowUpPage.prototype, "scroll", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], AddFollowUpPage.prototype, "content", void 0);
    AddFollowUpPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-add-follow-up',
            templateUrl: 'add-follow-up.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DbProvider,
            ModalController,
            FormBuilder,
            RestProvider,
            ToastController,
            Network,
            Events,
            DatePipe,
            LoadingController])
    ], AddFollowUpPage);
    return AddFollowUpPage;
}());
export { AddFollowUpPage };
//# sourceMappingURL=add-follow-up.js.map