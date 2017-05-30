import {   Injectable }from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject}from '@ionic-native/sqlite';
import {Platform}from 'ionic-angular';


/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
    gdb: any;
platform: any;
getDataOutput: any[] = [];
constructor(public sqlite: SQLite, platform: Platform) {
    this.platform = platform;
}

initDb() {

    this.platform.ready().then(() => {
        this.sqlite.create({
                name: 'bruno.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                this.gdb = db;
                // this.dropTables();
                this.createTables();
            })
            .catch(e => console.log(e));
    });
}

dropTables() {

    this.gdb.executeSql('drop table if exists user', {})
        .then(() => {
            //console.log('user table droped');
            //this.createTables();
        })
        .catch(e => console.log(e));
    this.gdb.executeSql('drop table if exists massage', {})
        .then(() => {
            console.log('massage table droped');
            //this.createTables();
        })
        .catch(e => console.log(e));
    this.gdb.executeSql('drop table if exists owner', {})
        .then(() => {
            //console.log('owner table droped');
            //this.createTables();
        })
        .catch(e => console.log(e));
}

createTables() {
    this.gdb.executeSql('create table user(user_id INTEGER PRIMARY KEY,name VARCHAR(32),address VARCHAR(32),recieved_amount INTEGER)', {})
        .then(() => {
            //console.log('table created user');
            var userObj: any[] = [],
                _row: any = {};
            _row.name = 'Jani';
            _row.address = 'Annaianger';
            _row.cash = 0;
            userObj.push(_row);

            this.insert('user', userObj);
        })
        .catch(e => console.log(e));

    this.gdb.executeSql('create table massage(massage_id INTEGER PRIMARY KEY,owner_id INTEGER,user_id INTEGER,date_time DATETIME,total_massage_time INTEGER,time_unit VARCHAR(10),amount INTEGER,signature BLOB,recieved_amount INTEGER)', {})
        .then(() => {
            console.log('table created massage');
            //this.insert();
        })
        .catch(e => console.log(e));

    this.gdb.executeSql('create table owner(owner_id INTEGER PRIMARY KEY,name VARCHAR(32))', {})
        .then((data) => {
            console.log('table created owner', data);
            var userObj: any[] = [],
                _row: any = {},
                _row2: any = {};
            _row.name = 'Tifani';
            _row2.name = 'Shana';
            userObj.push(_row);
            userObj.push(_row2);

            this.insert('owner', userObj);
        }, (error) => {
            console.error("Unable to create table", error);

        })
        .catch(e => console.log(e));
}

insert(tableName, data) {

    if(tableName == 'user') {
        for(let user of data) {

            this.gdb.executeSql('INSERT INTO user (user_id, name, address, recieved_amount) VALUES (?,?,?,?)', [null, user.name, user.address, user.cash]).then(() => {
                console.log('Values inserted User');

            }).catch(e => console.log(e));

        }
    } else if(tableName == 'owner') {
        for(let user of data) {

            this.gdb.executeSql('INSERT INTO owner (owner_id, name) VALUES (?,?)', [null, user.name]).then(() => {
                console.log('insertted value', user.name);
            }).catch(e => console.log(e));

        }

    } else if(tableName == 'massage') {
        for(let massage of data) {

            this.gdb.executeSql('INSERT INTO massage (massage_id, owner_id, user_id, date_time, total_massage_time ,time_unit ,amount ,signature ,recieved_amount) VALUES (?,?,?,?,?,?,?,?,?)', [null, massage.owner_id, massage.user_id, massage.date_time, massage.total_massage_time, massage.time_unit, massage.amount, massage.signature, massage.recieved_amount]).then(() => {
                console.log("inserted machi");
            }).catch(e => console.log("inserted machi mastererror : ", e));

        }
    }

}

getDetailes(sqlqry): any[] {

    var ourputArray: any[] = [];
    this.gdb.executeSql(sqlqry, []).then((data) => {
        for(var i = 0; i < data.rows.length; i++) {
            ourputArray.push(data.rows.item(i));
        }

    }).catch(e => {
        console.log("error")
        console.log(e);

    });
    return ourputArray;
}
}