import { NgModule } from '@angular/core';
//import { IonicModule } from 'ionic-angular';
import { Payment } from './payment';

@NgModule({
  declarations: [
    Payment,
  ],
  imports: [
    //IonicModule.forChild(Payment),
  ],
  exports: [
    Payment
  ]
})
export class PaymentModule {}
