import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LacDetails_ListPage } from './lac-details - list';
import { TooltipsModule } from 'ionic-tooltips';

@NgModule({
  declarations: [
    LacDetails_ListPage,
  ],
  imports: [
    IonicPageModule.forChild(LacDetails_ListPage),
    TooltipsModule.forRoot()
  ],
})
export class LacDetails_ListPageModule {}
