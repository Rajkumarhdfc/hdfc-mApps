import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TableListPage } from './table-list';

@NgModule({
  declarations: [
    TableListPage,
  ],
  imports: [
    IonicPageModule.forChild(TableListPage),
  ],
})
export class TableListPageModule {}
