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
import { DbProvider } from '../../providers/db/db';
import { IonicPage, LoadingController, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { animate, state, trigger, transition, style } from '@angular/animations';
import { LacmastersortProvider } from '../../providers/lacmastersort/lacmastersort';
/**
 * Generated class for the LacDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LacDetailsPage = /** @class */ (function () {
    function LacDetailsPage(navCtrl, navParams, dbProvider, loadingCtrl, modalCtrl, alertCtrl, lacsort, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dbProvider = dbProvider;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.lacsort = lacsort;
        this.events = events;
        this.tableItemlist = [];
        this.scroll_count = 10;
        this.desc = "desc";
        this.asc = "asc";
        this.crrlen = 0;
        this.rangelen = 10;
        this.buttonClicked = false; //Whatever you want to initialise it as
        this.dbProvider.tableItems = [];
        events.subscribe('headercolor', function (data) {
            _this.addfollowup_flag = data.hcolor;
            console.log(_this.addfollowup_flag);
        });
        this.dbProvider.LacMasterTableDetails_v1()
            .then(function (result) {
            _this.allRows = result;
            _this.alllen = _this.allRows.length;
            _this.tlen = _this.alllen;
            _this.crrlen = 0;
            _this.totlen = _this.alllen;
            var t = 0;
            for (var i = _this.crrlen; i < _this.alllen; i++) {
                _this.tableItemlist.push(_this.allRows[i]);
                _this.crrlen++;
                console.log(_this.crrlen);
                t++;
                if (t == 10) {
                    break;
                }
            }
        }, function (error) {
            console.log("ERROR: ", error);
        });
    }
    LacDetailsPage.prototype.onButtonClick = function () {
        this.buttonClicked = !this.buttonClicked;
    };
    LacDetailsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            var t = 0;
            _this.scroll_count = _this.crrlen;
            for (var i = _this.crrlen; i < _this.alllen; i++) {
                _this.tableItemlist.push(_this.allRows[i]);
                _this.crrlen++;
                console.log(_this.crrlen);
                t++;
                if (t == _this.rangelen) {
                    break;
                }
            }
            _this.scroll_count++;
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 50);
    };
    LacDetailsPage.prototype.setFilteredItems = function (searchitem) {
        var count = 0;
        console.log(this.allRows);
        if (searchitem && searchitem.length >= 3) {
            this.tableItemlist = this.allRows.filter(function (item) {
                return item.BORR_NAME.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
                    || item.PROP_AREA_DESC.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
                    || item.LAC_NO.toString().indexOf(searchitem.toString()) > -1
                    || item.FOLLOW_UP.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
                    || item.EMP_AREA.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
                    || item.PROP_NAME.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
                    || item.EMP_COMPANY_NAME.toLowerCase().indexOf(searchitem.toLowerCase()) > -1
                    || item.M_OS.toString().indexOf(searchitem.toString()) != -1;
            });
        }
        else {
            this.tableItemlist = this.allRows;
        }
        console.log(this.tableItemlist);
        this.filter_cnt = this.tableItemlist.length;
        this.scroll_count = this.filter_cnt;
        console.log(this.scroll_count);
        console.log(this.filter_cnt);
    };
    LacDetailsPage.prototype.navigate = function (card, card1, index) {
        this.last_active_lacno = {
            LAC_NO: card,
            last_index: index
        };
        this.navCtrl.push('AcDetailsPage', {
            item: card,
            item2: card1
        });
        console.log(card + "" + card1);
        this.events.publish('hideHeader', { footerstatus: true, lac: card, borrname: card1 });
        this.events.publish('hideheader', { headerstatus: true, navheaderstat: true });
    };
    LacDetailsPage.prototype.canWeLoadMoreContent = function () {
        return (this.scroll_count == this.totlen || this.filter_cnt >= 1) ? false : true;
    };
    ///////bucket ///////////////////////////////
    LacDetailsPage.prototype.navigate_my_basket = function (listItem) {
        var _this = this;
        var index = this.tableItemlist.indexOf(listItem);
        console.log(index);
        if (this.tableItemlist[index].my_basket != "") {
            this.presentConfirm(listItem, index);
        }
        else {
            var modal = this.modalCtrl.create('BucketPage', { data1: listItem.LAC_NO });
            modal.onDidDismiss(function (data) {
                if (data != undefined && listItem.LAC_NO != "") {
                    var index_1 = _this.tableItemlist.indexOf(listItem);
                    _this.tableItemlist[index_1].my_basket = data;
                    console.log(data);
                }
            });
            modal.present();
        }
    };
    LacDetailsPage.prototype.navbasket = function (listItem) {
        var _this = this;
        var modal = this.modalCtrl.create('BucketPage', { data1: listItem.LAC_NO });
        modal.onDidDismiss(function (data) {
            if (data.length != 0 && listItem.LAC_NO == "") {
                //   let index = this.tableItemlist.indexOf(listItem);
                //   this.tableItemlist[index].my_basket=data;
                //   console.log(data);
                // }else if (data!=undefined && ){
                // this.dbProvider.LacMasterTableBasketFilter(data).then((result)=>{
                //  result=data
                _this.tableItemlist = [];
                _this.allRows = data;
                _this.alllen = _this.allRows.length;
                _this.crrlen = 0;
                _this.totlen = _this.tlen;
                _this.scroll_count = _this.alllen;
                var t = 0;
                for (var i = _this.crrlen; i < _this.alllen; i++) {
                    _this.tableItemlist.push(_this.allRows[i]);
                    _this.crrlen++;
                    console.log(_this.crrlen);
                    t++;
                    if (t == 10) {
                        break;
                    }
                }
                //   }) 
            }
        });
        modal.present();
    };
    LacDetailsPage.prototype.presentConfirm = function (listItem, index) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Do you want to Discard the basket?',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                        _this.tableItemlist[index].my_basket = "";
                        _this.confirm_basket = _this.tableItemlist[index].my_basket;
                        console.log(_this.confirm_basket);
                        _this.dbProvider.LacMasterMyBasket(listItem.LAC_NO, "")
                            .then(function (result) {
                            console.log(result + "  " + _this.tableItemlist[index].my_basket);
                        }, function (error) {
                            console.log("ERROR: ", error);
                        });
                    }
                },
                {
                    text: 'Cancel',
                    handler: function () {
                        var modal = _this.modalCtrl.create('BucketPage', { data1: listItem.LAC_NO });
                        modal.onDidDismiss(function (data) {
                            if (data != undefined && listItem.LAC_NO != "") {
                                var index_2 = _this.tableItemlist.indexOf(listItem);
                                _this.tableItemlist[index_2].my_basket = data;
                                console.log(data);
                            }
                        });
                        modal.present();
                    }
                }
            ]
        });
        alert.present();
    };
    ///////--difficulty level---//////////
    LacDetailsPage.prototype.openPopover = function (listItem) {
        var _this = this;
        var modal = this.modalCtrl.create('LevelpopoverPage', { data: listItem.LAC_NO });
        modal.onDidDismiss(function (data) {
            var index = _this.tableItemlist.indexOf(listItem);
            _this.tableItemlist[index].difficulty_level = data;
            console.log(data);
        });
        modal.present();
    };
    LacDetailsPage.prototype.getColor = function (followupflag) {
        switch (followupflag) {
            case "true":
                return "blue";
            case "false":
                return "red";
        }
    };
    LacDetailsPage.prototype.getColorbasket = function (basketflag) {
        if (basketflag == undefined || basketflag == "") {
            return "red";
        }
        else {
            return "#109a10";
        }
    };
    // 
    LacDetailsPage.prototype.showRadio = function () {
        var _this = this;
        this.lacsort.LacSort(this.allRows, this.alllen, this.crrlen, this.totlen, this.tableItemlist)
            .then(function (result) {
            console.log(result);
            _this.tableItemlist = [];
            _this.allRows = result;
            _this.alllen = _this.allRows.length;
            _this.crrlen = 0;
            _this.totlen = _this.alllen;
            var t = 0;
            for (var i = _this.crrlen; i < _this.alllen; i++) {
                _this.tableItemlist.push(_this.allRows[i]);
                _this.crrlen++;
                console.log(_this.crrlen);
                t++;
                if (t == 10) {
                    break;
                }
            }
        });
    };
    LacDetailsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad LacDetailsPage');
        this.dbProvider.SelectLacMasterPltSum().then(function (res) {
            _this.plttot = (res[0].plt) / 10000000;
            console.log(_this.plttot);
        });
    };
    LacDetailsPage.prototype.GlobalBucket = function () {
        var listItem = { LAC_NO: "" };
        this.navbasket(listItem);
    };
    LacDetailsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.events.publish('hidemenu', { menustatus: true }); ///for hiding menu
        this.events.publish('hideHeader', { footerstatus: false, lac: "", borrname: "" }); //for hiding footer
        if (this.last_active_lacno != undefined) {
            this.dbProvider.getFollowuoFlag(this.last_active_lacno.LAC_NO).then(function (res) {
                _this.tableItemlist[_this.last_active_lacno.last_index].followupflag = res[0].followupflag;
                console.log(res);
            });
        }
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: false });
    };
    LacDetailsPage.prototype.ionViewWillLeave = function () {
        this.events.publish('hidemenu', { menustatus: false });
    };
    LacDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-lac-details',
            templateUrl: 'lac-details.html',
            animations: [
                trigger("showHello", [
                    state("true", style({
                        "opacity": 1,
                        "display": 'block',
                        "width": '65vw',
                        "border-radius": '3px',
                    })),
                    state("false", style({
                        "opacity": 0,
                        "display": 'none',
                        "width": '0vw',
                    })),
                    transition("1 => 0", animate("1s ease")),
                    transition("0 => 1", animate("1s ease"))
                ])
            ]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            DbProvider,
            LoadingController,
            ModalController,
            AlertController,
            LacmastersortProvider,
            Events])
    ], LacDetailsPage);
    return LacDetailsPage;
}());
export { LacDetailsPage };
//# sourceMappingURL=lac-details.js.map