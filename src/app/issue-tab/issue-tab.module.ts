import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IssueTabPageRoutingModule } from './issue-tab.router.module';
import { IssueTabPage } from './issue-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IssueTabPageRoutingModule
  ],
  declarations: [IssueTabPage]
})
export class IssueTabPageModule {}
