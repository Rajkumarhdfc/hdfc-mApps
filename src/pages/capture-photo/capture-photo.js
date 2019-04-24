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
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { DbProvider } from '../../providers/db/db';
import { RestProvider } from '../../providers/rest/rest';
import { Base64 } from '@ionic-native/base64';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the CapturePhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CapturePhotoPage = /** @class */ (function () {
    function CapturePhotoPage(base64, navCtrl, navParams, camera, crop, dbProvider, restProvider, loadingCtrl, network, toastCtrl, events) {
        this.base64 = base64;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.crop = crop;
        this.dbProvider = dbProvider;
        this.restProvider = restProvider;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.previousurl = [];
        this.imgflag = false;
        this.options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
        // this.dbProvider.sDropTableSAVEPHOTO().then((res)=>{
        //   console.log(res);
        // })
        this.dbProvider.CreateTablePhotoSave().then(function (res) {
            console.log(res);
        });
        this.LacNo = navParams.get('item');
        this.Borrname = this.navParams.get('item2');
    }
    CapturePhotoPage.prototype.onChange = function (event) {
        console.log(event);
        this.phototype = event;
    };
    CapturePhotoPage.prototype.takePhoto = function () {
        var _this = this;
        if (this.previousurl.length >= 1) {
            this.imgflag = true;
        }
        this.camera.getPicture(this.options).
            then(function (imageData) {
            console.log(imageData);
            _this.imageURL = imageData;
            _this.crop
                .crop(imageData, { quality: 75 })
                .then(function (newImage) {
                _this.imag = newImage;
                console.log(newImage);
                _this.previousurl.push(newImage);
                _this.imgflag = true;
            }, function (error) { return console.error("Error cropping image", error); });
        }, function (error) {
            console.log(error);
        });
    };
    CapturePhotoPage.prototype.getuserid = function () {
        var _this = this;
        this.dbProvider.getAppMasterUserID().then(function (result) {
            _this.id = result;
            _this.ldap_id = _this.id.UserID;
            console.log(_this.ldap_id);
        });
    };
    CapturePhotoPage.prototype.getSessionId = function () {
        var _this = this;
        this.dbProvider.getsessionid().then(function (result) {
            var sid;
            sid = result;
            _this.sessionid = sid.SessionId;
            console.log(_this.sessionid);
        });
    };
    CapturePhotoPage.prototype.getLacDetails = function () {
        var _this = this;
        this.dbProvider.LacMasterTableDetailsPhotoUpload(this.LacNo).then(function (res) {
            console.log(res);
            _this.propno = res[0].prop_no;
            _this.fileno = res[0].file_no;
        });
    };
    CapturePhotoPage.prototype.encodebase64image = function (base, img_filename) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
        loading.present();
        this.base64.encodeFile(base).then(function (base64File) {
            base64File = base64File.split(",")[1];
            console.log(base64File);
            _this.restProvider.
                uploadphoto(_this.fileno, _this.ldap_id, _this.propno, img_filename, _this.sessionid, base64File).
                then(function (res) {
                loading.dismiss();
            });
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    };
    CapturePhotoPage.prototype.removeImage = function (index) {
        this.previousurl.splice(index, 1);
        console.log(index, this.previousurl);
        if (this.previousurl.length == 0) {
            this.imgflag = false;
        }
        else {
            this.imgflag = true;
        }
        console.log(this.imag);
    };
    CapturePhotoPage.prototype.saveImage = function (item) {
        var _this = this;
        var img_lac_no = this.LacNo;
        var img_srno = this.srno;
        var img_file_no = this.fileno;
        var img_user_name = this.ldap_id;
        var img_prop_no = this.propno;
        var img_photo_type = this.phototype;
        if (this.network.type == 'none') {
            if (this.previousurl.length != 0) {
                for (var i = 0; i < this.previousurl.length; i++) {
                    var img_filename = img_prop_no + "_" + i + Math.floor(Date.now() / 100) + ".hdfcjpg";
                    var req_img = {};
                    this.dbProvider.InsertIntoPhotoUpload(this.LacNo, this.Filter, img_filename, this.previousurl[i], this.propno).then(function (res) {
                        console.log(res);
                        var toast = _this.toastCtrl.create({
                            message: 'data stored locally.To Upload Please turn your internet ON',
                            duration: 5000
                        });
                        toast.present();
                        //  console.log(this.LacNo,this.Filter,img_filename,this.previousurl[i]);
                    });
                    // this.encodebase64image(this.previousurl[i],img_filename)
                }
            }
        }
        else {
            if (this.previousurl.length != 0) {
                for (var i = 0; i < this.previousurl.length; i++) {
                    var img_filename = img_prop_no + "_" + i + Math.floor(Date.now() / 100) + ".hdfcjpg";
                    var req_img = {};
                    this.encodebase64image(this.previousurl[i], img_filename);
                }
            }
        }
    };
    CapturePhotoPage.prototype.ionViewDidLoad = function () {
        this.getuserid();
        this.getSessionId();
        this.getLacDetails();
        // this.dbProvider.CreateTablePhotoSave().then((res)=>{
        //   console.log(res);
        // })
        console.log('ionViewDidLoad CapturePhotoPage');
    };
    CapturePhotoPage.prototype.ionViewWillEnter = function () {
        this.events.publish('hideheader', { headerstatus: false, navheaderstat: true });
    };
    CapturePhotoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-capture-photo',
            templateUrl: 'capture-photo.html',
        }),
        __metadata("design:paramtypes", [Base64,
            NavController,
            NavParams,
            Camera,
            Crop,
            DbProvider,
            RestProvider,
            LoadingController,
            Network,
            ToastController,
            Events])
    ], CapturePhotoPage);
    return CapturePhotoPage;
}());
export { CapturePhotoPage };
//# sourceMappingURL=capture-photo.js.map