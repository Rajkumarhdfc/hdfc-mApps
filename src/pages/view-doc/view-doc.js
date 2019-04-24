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
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { DbProvider } from '../../providers/db/db';
import { RestProvider } from '../../providers/rest/rest';
//import { FileTransfer } from '@ionic-native/file-transfer';
/**
 * Generated class for the ViewDocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewDocPage = /** @class */ (function () {
    function ViewDocPage(file, Platform, navCtrl, dbProvider, navParams, fileOpener, restProvider, loadingCtrl) {
        this.file = file;
        this.Platform = Platform;
        this.navCtrl = navCtrl;
        this.dbProvider = dbProvider;
        this.navParams = navParams;
        this.fileOpener = fileOpener;
        this.restProvider = restProvider;
        this.loadingCtrl = loadingCtrl;
        this.PDF_Flag = "Y";
        this.LacNo = navParams.get('item');
        this.Borrname = this.navParams.get('item2');
        this.pages = [
            {
                title: 'Property',
                component: "PropertyDetailsPage"
            },
            {
                title: 'Disbursement',
                component: "DisbursementPage"
            },
            {
                title: 'Unique',
                component: "UniqueIdPage"
            },
            {
                title: 'Trans',
                component: "TransPage"
            },
            {
                title: 'Remark',
                component: "RemarkPage"
            },
            {
                title: 'ViewDoc',
                component: "ViewDocPage"
            },
            {
                title: 'Addetails',
                component: "AddetailsPage"
            },
        ];
    }
    ViewDocPage.prototype.viewDocument = function (filename) {
        var _this = this;
        var x;
        var exm = filename.split(".");
        var ext = exm[exm.length - 1].toLowerCase();
        this.PDF_Flag = "Y";
        if (ext == "jpg" || ext == "pdf") {
            this.PDF_Flag = "N";
        }
        this.restProvider.ViewDocs(filename, this.PDF_Flag).then(function (res) {
            var loading = _this.loadingCtrl.create({
                content: 'Please wait..',
                spinner: 'crescent'
            });
            loading.present();
            console.log(res);
            x = res;
            console.log(x);
            if (x.GetPDFDocument == undefined) {
                loading.dismiss();
                alert("no data found");
            }
            else {
                loading.present();
                var resreturn = x.GetPDFDocument[0].FILEDATA;
                //console.log(resreturn);
                if (ext == "pdf" || ext == "tif") {
                    console.log(ext);
                    var fileExt_1 = 'pdf';
                    console.log(fileExt_1);
                    var writeDirectory_1 = _this.Platform.is('ios') ? _this.file.dataDirectory : _this.file.externalDataDirectory;
                    _this.file.writeFile(writeDirectory_1, 'document.pdf', _this.convertBaseb64ToBlob(resreturn, 'data:application/' + fileExt_1 + ';base64'), { replace: true })
                        .then(function () {
                        _this.fileOpener.open(writeDirectory_1 + 'document.pdf', 'application' +
                            '' +
                            '/' + fileExt_1)
                            .catch(function (error) {
                            console.log(error);
                            console.log('Error opening file');
                        });
                    })
                        .catch(function (error) {
                        console.log(error);
                        console.error('Error writing file');
                    });
                    loading.dismiss();
                }
                else {
                    loading.present();
                    var fileExt_2 = 'jpg';
                    console.log(fileExt_2);
                    var writeDirectory_2 = _this.Platform.is('ios') ? _this.file.dataDirectory : _this.file.externalDataDirectory;
                    _this.file.writeFile(writeDirectory_2, 'document.jpg', _this.convertBaseb64ToBlob(resreturn, 'data:application/' + fileExt_2 + ';base64'), { replace: true })
                        .then(function () {
                        _this.fileOpener.open(writeDirectory_2 + 'document.jpg', 'application' +
                            '' +
                            '/' + fileExt_2)
                            .catch(function (error) {
                            console.log(error);
                            console.log('Error opening file');
                        });
                    })
                        .catch(function (error) {
                        console.log(error);
                        console.error('Error writing file');
                    });
                    loading.dismiss();
                }
            }
        });
    };
    ViewDocPage.prototype.convertBaseb64ToBlob = function (b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    ViewDocPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.navCtrl.push(page.component, {
            name: page.title,
            item: this.LacNo,
            item2: this.Borrname
        });
    };
    ViewDocPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dbProvider.SelectFromViewDocs(this.LacNo).then(function (res) {
            console.log(res);
            _this.viewdocs = res;
        });
        console.log('ionViewDidLoad ViewDocPage');
    };
    ViewDocPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-view-doc',
            templateUrl: 'view-doc.html',
        }),
        __metadata("design:paramtypes", [File,
            Platform,
            NavController,
            DbProvider,
            NavParams,
            FileOpener,
            RestProvider,
            LoadingController])
    ], ViewDocPage);
    return ViewDocPage;
}());
export { ViewDocPage };
//# sourceMappingURL=view-doc.js.map