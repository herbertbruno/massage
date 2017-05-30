import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Masagj } from './masagj';

@NgModule({
  declarations: [
    Masagj,
  ],
  imports: [
    //IonicModule.forChild(Masagj),
  ],
  exports: [
    Masagj
  ]
})
export class MasagjModule {}
