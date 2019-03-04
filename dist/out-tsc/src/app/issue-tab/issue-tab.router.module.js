import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IssueTabPage } from '../issue-tab/issue-tab.page';
var routes = [
    {
        path: 'tabs',
        component: IssueTabPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: '../create-issue/create-issue.module#CreateIssuePageModule'
                    }
                ]
            }
        ]
    }
];
var IssueTabPageRoutingModule = /** @class */ (function () {
    function IssueTabPageRoutingModule() {
    }
    IssueTabPageRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], IssueTabPageRoutingModule);
    return IssueTabPageRoutingModule;
}());
export { IssueTabPageRoutingModule };
//# sourceMappingURL=issue-tab.router.module.js.map