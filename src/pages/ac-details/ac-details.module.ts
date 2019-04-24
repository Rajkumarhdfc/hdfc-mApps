import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcDetailsPage} from './ac-details';

@NgModule({
  declarations: [
AcDetailsPage,
  ],
  imports: [
  IonicPageModule.forChild(AcDetailsPage),
  ],
})
export class AcDetailsPageModule {}
