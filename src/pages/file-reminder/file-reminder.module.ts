import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileReminderPage } from './file-reminder';

@NgModule({
  declarations: [
    FileReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(FileReminderPage),
  ],
})
export class FileReminderPageModule {}
