// 
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform, LoadingController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



@IonicPage()
@Component({
  selector: 'page-app-launch',
  templateUrl: 'app-launch.html',
})

export class AppLaunchPage {
   
    userData = {UserID : ""}  
    data:any;

    constructor(public navCtrl: NavController,public sqlite:SQLite,
                public navParams: NavParams, 
                public dbProvider :DbProvider,
                public loadingCtrl:LoadingController,
                public events:Events,public platform:Platform)
    {

    }

    
    setUserID(){        
        this.dbProvider.setAppMasterUserID(this.userData.UserID)
        .then(res =>{
            this.navCtrl.push('LoginPage', {UserData:this.userData.UserID});
        })
        .catch(err => console.log(err));
    }    
  
    getUserID(){       
     
        let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
        loading.present();

        this.dbProvider.sCreateTableScript().then(res=>{
          this.dbProvider.setApp_MasterData()
          .then(res =>{ 
              console.log(res);
              if (res[0].USER_ID != "" ){                                    
                 this.navCtrl.push('MenuPage', {UserID: res[0].USER_ID});  
                 //alert(res[0].USER_ID);
              } 
              else{
           
                  alert('Error '+'User Id missing ..Pls relogin')
              }
  
          })
        })

       
        loading.dismiss();

    }

    getSyncTable(){
        let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
        loading.present();
        this.dbProvider.createSyncTable();
        loading.dismiss();
        

    }

  ngOnInit(){      
     this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    // comment createUserTable ()for git upat //
    this.createUserTable()
         this.getUserID();  
    });
    }

// createUserTable() {
// this.dbProvider.CreateLoginDetailsTbl().then((res)=>{
//     console.log(res);
//     this.login();
// })
// }

createUserTable() {
this.sqlite.create({
  name: 'logindb.db',
  location: 'default'
}).then((db: SQLiteObject) => {
  db.executeSql('CREATE TABLE IF NOT EXISTS login_details (rowid INTEGER PRIMARY KEY,user_info TEXT)', null)
  .then(res => this.login())
  .catch(e => console.log(e));
  
}).catch(e => console.log(e));
}



login(){
  var user_Details=  [{"SESSION_ID":"2RNUZPLERSGKJJBNOTFA1UF11ZLY2S","USER_NAME":"PRASANNAKC","USER_ID":"PRASANNAKC","LAST_LOGIN_DT":"2019-01-31T13:47:43"}]
        var user_Details1=JSON.stringify(user_Details);
    return new Promise((resolve,reject)=>{
         this.sqlite.create({
        name: 'logindb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        
            db.executeSql('DELETE FROM login_details',null)
                 .then(() => {
                   // alert('Deleted successfully')
                    })
                    .catch(e => console.log(e));
                db.executeSql('INSERT INTO login_details (user_info) Values (?)',[user_Details1])
                    .then((res) =>  {
                      //  alert("inserted successfully");
                        this.getUserID();
                         resolve(res); 

                    }) 
                    .catch(e => console.log(e));
      }).catch(e => console.log(e));


    })
  
}


// login(){
// this.dbProvider.loginTbl().then((res)=>{
//     console.log(res);
//     this.getUserID();
// })
   
  ionViewDidLoad() {
      this.events.publish('hideHeader', { footerstatus: false,lac:'',borrname:''});
      this.events.publish('hidemenu', { menustatus: true});

    }
}    

