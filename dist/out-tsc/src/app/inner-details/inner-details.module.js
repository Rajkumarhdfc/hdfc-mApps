import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InnerDetailsPage } from './inner-details.page';
var routes = [
    {
        path: '',
        component: InnerDetailsPage
    }
];
var InnerDetailsPageModule = /** @class */ (function () {
    function InnerDetailsPageModule() {
    }
    InnerDetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [InnerDetailsPage]
        })
    ], InnerDetailsPageModule);
    return InnerDetailsPageModule;
}());
export { InnerDetailsPageModule };
//# sourceMappingURL=inner-details.module.js.map