import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Database} from '../../providers/database';

/**
 * Generated class for the Payment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment {
public owners : any;
public massages : any;
public owner_id : any;
public user_id : any;
public customer_show : boolean;
public table_show : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,public database :Database) {
  }

  ionViewDidLoad() {
      this.owners = this.database.getDetailes('SELECT * FROM owner'); 
      
      
  }
     updateSelectedOwner(owner_id) {
        if (owner_id > 0) {
            this.owner_id = owner_id; 
            this.customer_show = true;
        }
    }
    updateSelectedUser(user_id) {
        if (user_id > 0) {
            
            this.user_id = user_id;
            this.loadPaymentList();
             
        }
    }
    loadPaymentList(){
        this.massages = this.database.getDetailes('SELECT date_time, total_massage_time, time_unit, amount FROM massage where owner_id = "'+this.owner_id+'" and user_id = "'+this.user_id +'"');
         
        this.table_show = true;
 
     }

}
