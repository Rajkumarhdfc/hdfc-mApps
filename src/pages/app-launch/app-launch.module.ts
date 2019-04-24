import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppLaunchPage } from './app-launch';

@NgModule({
  declarations: [
    AppLaunchPage,
  ],
  imports: [
    IonicPageModule.forChild(AppLaunchPage),
  ],
})
export class AppLaunchPageModule {}
