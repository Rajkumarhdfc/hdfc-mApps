import { NgModule } from '@angular/core';
import { FileSizePipe } from './bytestosize/bytestosize';

@NgModule({
  declarations: [
    FileSizePipe,
  ],
  imports: [

  ],
  exports: [
    FileSizePipe
  ]
})
export class PipesModule { }