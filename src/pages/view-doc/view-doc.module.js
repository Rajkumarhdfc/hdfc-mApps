var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDocPage } from './view-doc';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
var ViewDocPageModule = /** @class */ (function () {
    function ViewDocPageModule() {
    }
    ViewDocPageModule = __decorate([
        NgModule({
            declarations: [
                ViewDocPage,
            ],
            imports: [
                IonicPageModule.forChild(ViewDocPage),
            ],
            providers: [
                File,
                FileOpener,
                FilePath
            ]
        })
    ], ViewDocPageModule);
    return ViewDocPageModule;
}());
export { ViewDocPageModule };
//# sourceMappingURL=view-doc.module.js.map