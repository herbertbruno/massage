import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Masagj } from '../masagj/masagj';
import { Payment } from '../payment/payment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  loadPage(page){
    var navOptions = {
      animation: 'ios-transition'
 };
      console.log(page);
      var _page : any;
        switch(page) { 
           case 'new': { 
              _page = Masagj;
              break; 
           } 
           case 'payment': { 
              _page = Payment; 
              break; 
           } 
           default: { 
              _page = Payment; 
              break; 
           } 
        } 
 this.navCtrl.push(_page, null, navOptions);
 //this.navCtrl.push(Masagj, null, navOptions);
    
  }

}
