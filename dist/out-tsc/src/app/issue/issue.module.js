import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IssuePage } from './issue.page';
var routes = [
    {
        path: '',
        component: IssuePage
    }
];
var IssuePageModule = /** @class */ (function () {
    function IssuePageModule() {
    }
    IssuePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [IssuePage]
        })
    ], IssuePageModule);
    return IssuePageModule;
}());
export { IssuePageModule };
//# sourceMappingURL=issue.module.js.map