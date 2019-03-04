import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IssueTabPageRoutingModule } from './issue-tab.router.module';
import { IssueTabPage } from './issue-tab.page';
var IssueTabPageModule = /** @class */ (function () {
    function IssueTabPageModule() {
    }
    IssueTabPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IssueTabPageRoutingModule
            ],
            declarations: [IssueTabPage]
        })
    ], IssueTabPageModule);
    return IssueTabPageModule;
}());
export { IssueTabPageModule };
//# sourceMappingURL=issue-tab.module.js.map