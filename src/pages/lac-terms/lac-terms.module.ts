import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LacTermsPage } from './lac-terms';

@NgModule({
  declarations: [
    LacTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(LacTermsPage),
  ],
})
export class LacTermsPageModule {}
