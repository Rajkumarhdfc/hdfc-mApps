import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ListMasterPage } from './list-master';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [
    ListMasterPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ListMasterPage)
   
  ],

  exports: [
    ListMasterPage
  ]
})

export class ListMasterPageModule { }

