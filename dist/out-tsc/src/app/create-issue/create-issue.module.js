import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateIssuePage } from './create-issue.page';
var CreateIssuePageModule = /** @class */ (function () {
    function CreateIssuePageModule() {
    }
    CreateIssuePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([{ path: '', component: CreateIssuePage }])
            ],
            declarations: [CreateIssuePage]
        })
    ], CreateIssuePageModule);
    return CreateIssuePageModule;
}());
export { CreateIssuePageModule };
//# sourceMappingURL=create-issue.module.js.map