import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginMpinPage } from './login-mpin';

@NgModule({
  declarations: [
    LoginMpinPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginMpinPage),
  ],
})
export class LoginMpinPageModule {}
