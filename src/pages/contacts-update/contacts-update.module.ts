import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsUpdatePage } from './contacts-update';

@NgModule({
  declarations: [
    ContactsUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsUpdatePage),
  ],
})
export class ContactsUpdatePageModule {}
