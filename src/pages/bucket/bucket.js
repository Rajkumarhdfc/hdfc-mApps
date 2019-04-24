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
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
/**
 * Generated class for the BucketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BucketPage = /** @class */ (function () {
    function BucketPage(navCtrl, events, navParams, viewCtrl, dbProvider, modalCtrl, menuCtrl, formbuilder) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dbProvider = dbProvider;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.formbuilder = formbuilder;
        this.addr = 'MyBasket';
        this.bucketflag = true;
        this.creatflag = false;
        this.LacNo = this.navParams.get('data1');
        this.bucketform = this.formbuilder.group({ 'Basket': [],
        });
    }
    BucketPage.prototype.AreaChange = function (event) {
        console.log(event);
        this.Basket = event;
    };
    /////////////////////////create basket//////////////////////////////////////
    BucketPage.prototype.CreateBasketName = function () {
        this.creatflag = true;
        console.log(this.creatflag);
    };
    BucketPage.prototype.save = function () {
        var _this = this;
        if (this.LacNo == "") {
            this.InsertBasket();
        }
        else {
            this.dbProvider.LacMasterMyBasket(this.LacNo, this.Basket)
                .then(function (result) {
                console.log(result + "  " + _this.LacNo);
            }, function (error) {
                console.log("ERROR: ", error);
            });
            this.viewCtrl.dismiss(this.Basket);
            if (this.Basket == null) {
                this.bucketflag = false;
                this.events.publish('bucketflag', { fflag: this.bucketflag });
            }
        }
        //this.bucketform.reset();
    };
    ///////view basket/////////////////////////////////////////
    BucketPage.prototype.ViewBasket = function () {
        var _this = this;
        this.dbProvider.LacMasterSelectMyBasket()
            .then(function (result) {
            console.log(result);
            _this.mybasketlist = result;
            console.log(_this.mybasketlist);
        }, function (error) {
            console.log("ERROR: ", error);
        });
    };
    ///////insert bucket data into lac master//////
    BucketPage.prototype.InsertBasket = function () {
        var _this = this;
        if (this.Basket == undefined) {
            this.close();
        }
        else {
            this.dbProvider.LacMasterInsertMyBasket(this.Basket)
                .then(function (result) {
                console.log(result + "  " + _this.Basket);
                if (_this.LacNo == "") {
                    _this.ViewBasket();
                }
                else {
                    _this.viewCtrl.dismiss(_this.Basket);
                }
            }, function (error) {
                console.log("ERROR: ", error);
            });
        }
    };
    BucketPage.prototype.UpdateBasketChip = function (basket) {
        var _this = this;
        if (this.LacNo == "") {
            // this.InsertBasket();
            this.dbProvider.LacMasterTableBasketFilter(basket).then(function (result) {
                console.log(result);
                _this.viewCtrl.dismiss(result);
            });
        }
        else {
            console.log(basket);
            this.dbProvider.LacMasterMyBasket(this.LacNo, basket)
                .then(function (result) {
                console.log(result + "  " + basket);
            }, function (error) {
                console.log("ERROR: ", error);
            });
            this.viewCtrl.dismiss(basket);
        }
    };
    BucketPage.prototype.delete = function (chip) {
        this.Basket = "";
        if (this.LacNo != "") {
            this.UpdateBasketChip(this.Basket);
        }
        chip.remove();
    };
    BucketPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    BucketPage.prototype.ionViewDidLoad = function () {
        this.ViewBasket();
        console.log('ionViewDidLoad BucketPage');
    };
    BucketPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-bucket',
            templateUrl: 'bucket.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Events,
            NavParams,
            ViewController,
            DbProvider,
            ModalController,
            MenuController,
            FormBuilder])
    ], BucketPage);
    return BucketPage;
}());
export { BucketPage };
//# sourceMappingURL=bucket.js.map