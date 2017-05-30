import {
    Component
}
from '@angular/core';
import {
    IonicPage, NavController, NavParams
}
from 'ionic-angular';

import {
    Subscription
}
from "rxjs";
import {
    TimerObservable
}
from "rxjs/observable/TimerObservable"; 
declare var cordova:any;
 
import {Database} from '../../providers/database';
import {DomSanitizer} from '@angular/platform-browser';

import * as moment from 'moment';

/**
 * Generated class for the Masagj page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@
IonicPage()@ Component({
    selector: 'page-masagj',
    template: '',
    templateUrl: 'masagj.html',
})
export class Masagj {

    public tick: any;
    public counter_show: boolean;
    public customer_show: boolean = false;
    public start: boolean;
    public finish: boolean;
    public resume: boolean;
    public pause: boolean;
    public final: boolean;

    public min: any = 0;
    public money: any = 0;
    private subscription: Subscription;
    public cuntervalue: any = 0;


    public animate: any;
    public counter_class: any;
    public final_class: any;
    public unit: any;
    public singature : any;
    public singature_flag : boolean = false;
    
    owners : any;
    owner_id : any;
    user_id : any;
    constructor(public navCtrl: NavController, public navParams: NavParams,public database : Database,  public _DomSanitizer: DomSanitizer) {
        this.start = true;
        this.pause = false;
        this.finish = false;
        this.resume = false;
        this.final = false;
        this.unit =  "min";

        this.tick = 0;
        
        //console.log(my.gdb);
    }

    ionViewDidLoad() {
        this.owners = this.database.getDetailes('SELECT * FROM owner');
        console.log(this.owners);
        //console.log(moment().format('YYYY-MM-DD HH:MM:SS.SSS'));
        //console.log('ionViewDidLoad Masagj');
    }
    startTimer() { 
        this.animate = " animated pulse infinite";
        this.start = false;
        this.pause = true;
        this.finish = true; 
        this.resume = false; 
        this.money = 5; 

        let timer = TimerObservable.create(10, 1000);

        this.subscription = timer.subscribe(t => {
            t = t + this.cuntervalue;
            this.tick = t;
            this.min = Math.trunc(t / 60);
            var _tmp = t % 60;
            if (this.min > 5 && _tmp == 0) {
                this.money = this.money + 1;
            }
        });

    }

    enableCounterView(r) {
        if (r > 0) {
            this.counter_show = true;
            this.user_id = r;
            this.final = false;
        }
    }
    updateSelectedOwner(r) {
        if (r > 0) {
            this.customer_show = true;
            this.owner_id = r;
            //this.counter_class = 'animated zoomInDown';
            this.final = false;
        }
    }

    stopTimer() {
        this.resume = true;
        this.pause = false;
        this.cuntervalue = this.tick;
        this.animate = "";
        this.subscription.unsubscribe();
    }

    endTimer() {

        this.resume = false;
        this.pause = false;
        this.animate = "";
        
        if(this.min == 0){
            this.min = this.tick;
            this.unit = "sec";
        }
        
        //this.counter_class = 'animated zoomOutUp';


        //setTimeout(() => {
            this.counter_show = false;
            this.final = true;
            //this.final_class = 'animated zoomInDown';
       // }, 1700);

        this.subscription.unsubscribe();
    }
    saveNewEvent(){
        
        var massage: any[] = [],
                session: any = {};
                session.owner_id = this.owner_id;
                session.user_id = this.user_id;
                session.date_time = moment().format('YYYY-MM-DD HH:mm'); 
                session.total_massage_time = this.min;
                session.time_unit = this.unit;
                session.amount = this.money;
                session.signature = this.singature;
                session.recieved_amount = 0;
                 
        
                massage.push(session);
                console.log(massage);
        
        //owner_id INTEGER ,user_id INTEGER,date_time DATETIME,total_massage_time INTEGER,time_unit VARCHAR(10),amount INTEGER,signature BLOB,recieved_amount INTEGER
        
        
         this.database.insert("massage",massage);
        
        
    }
    
    
    
    
    getSingature(){
        this.singature_flag = false;
        var self = this;
        cordova.plugins.signaturePlugin.getTransparentSignature(
                function(base64Image){
                    self.singature_flag = true;
                    self.singature = self._DomSanitizer.bypassSecurityTrustUrl(base64Image);
                }, 
                function(error){
                    console.log(error);
                }
        );
   }

}