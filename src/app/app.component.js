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
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { TableListPage } from '../pages/table-list/table-list';
//import { CommnPage } from '../pages/commn/commn';
//import { FupPage } from '../pages/fup/fup';
// import { TransPage } from '../pages/trans/trans';
//import { MenuPage } from '../pages/menu/menu';
//import { LacDetailsPage } from '../pages/lac-details/lac-details';
import { Events } from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, events) {
        var _this = this;
        this.events = events;
        this.rootPage = 'AppLaunchPage';
        this.footerIsHidden = false;
        this.isOnline = navigator.onLine;
        this.menustatus = true;
        this.footerstatus = false;
        events.subscribe('hideHeader', function (data) {
            _this.footerstatus = data.footerstatus;
            _this.lac = data.lac;
            _this.borrname = data.borrname;
            console.log(_this.lac);
        });
        events.subscribe('hidemenu', function (data) {
            _this.menustatus = data.menustatus;
            console.log(_this.menustatus);
        });
        // an example of ngFor and navigation
        this.pages = [{
                title: 'Home',
                component: 'MenuPage'
            },
            {
                title: 'Dashboard',
                component: 'LacDetailsPage'
            },
            {
                title: 'Reminders',
                component: 'RemindersPage'
            }
        ];
        ////footer navigation///////////////
        this.footerpages = [{
                title: 'Commn',
                component: "CommnPage"
            },
            {
                title: 'Fup',
                component: "FupPage"
            },
            {
                title: 'Trans',
                component: "TransPage"
            },
            {
                title: 'Alerts',
                component: "AlertsPage"
            },
            {
                title: 'Remark',
                component: "RemarkPage"
            },
            {
                title: 'Take Photo',
                component: "CapturePhotoPage"
            },
            {
                title: 'LacDetails',
                component: "LacPage"
            },
            {
                title: 'ViewDoc',
                component: "ViewDocPage"
            },
            {
                title: 'Ad Details',
                component: "AddetailsPage"
            },
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component, {
            name: page.title
        });
        console.log(this.footerpagetitle);
    };
    MyApp.prototype.openFooterPage = function (p) {
        var _this = this;
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.events.publish('titlepass', {
            pgtitle: p.title
        });
        var x = this.nav.getActive();
        if (this.nav.getPrevious().name != "LacDetailsPage") {
            this.nav.push(p.component, {
                name: p.title,
                item: this.lac,
                item2: this.borrname
            }).then(function () {
                var index = _this.nav.getActive().index;
                _this.nav.remove(index - 1);
            });
        }
        else {
            this.nav.push(p.component, {
                name: p.title,
                item: this.lac,
                item2: this.borrname
            }).then(function () {
                _this.nav.push(p.component, {
                    name: p.title,
                    item: _this.lac,
                    item2: _this.borrname
                }).then(function () {
                    var index = _this.nav.getActive().index;
                    _this.nav.remove(index - 1);
                });
            });
        }
        console.log(this.lac + " " + this.borrname);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, Events])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map