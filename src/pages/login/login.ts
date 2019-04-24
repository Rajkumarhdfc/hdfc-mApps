import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
   userData :any;
   todo = { userID : "" , password : ""  };
   authJsonObj : any;
   loading:any;  
   
    constructor(public navCtrl: NavController, 
    			public navParams: NavParams, 
    			public http: HttpClient, 
    			public restProvider: RestProvider,
    			public toastCtrl: ToastController, 
    			public alertCtrl: AlertController,
    			public dbProvider : DbProvider,
    			public loadingCtrl:LoadingController,
    			public events:Events)
    {
	    this.userData = "PRASANNAB"//this.navParams.get('UserData');
		this.todo.userID = this.userData;	
    	this.events.publish('userid', this.userData);
    }

    dropTable(){	
		this.dbProvider.sDropTable();
	   	this.navCtrl.push('AppLaunchPage');
    }
 
    setApp_MasterData(){
		this.dbProvider.updateApp_MasterData(this.todo.password, 
											 this.authJsonObj.AUTH[0].CURVERSION, 
											 this.authJsonObj.AUTH[0].CURSUBVERSIONNO,
											 this.todo.userID)
    }

    loginUser(){
	    this.restProvider.authUser(this.todo).then(data => {
	    	this.authJsonObj = data;   
	    	console.log(this.authJsonObj);  
	 		if(this.authJsonObj.AUTH[0].RETURN_CD == "0"){

		 	    this.setApp_MasterData();
		 	    
				let toast = this.toastCtrl.create({
			   		message: 'You have successfully logged in',
			    	duration: 3000
				});
				toast.present(); 
				this.navCtrl.push('MenuPage', {UserID: this.todo.userID});     
		 	}
		 	else{
				let toast = this.toastCtrl.create({
				   message: 'Invalid User',
				   duration: 3000
				});
				toast.present();  
				this.navCtrl.pop();
			}  
	    });
    }    

    changeUser() {
	    let confirm = this.alertCtrl.create({
			title: 'Alert',
		 	message: 'Do you want to change user?',
		 	buttons: [
		   		{ 
		   			text: 'Yes',
			 		handler: () => {console.log('Yes clicked');
									this.dropTable();
									}
		   		},
		   		{ 
		   			text: 'No',
			 		handler: () => {
			 						console.log('No clicked');
			 						}
		   		}
		 	]
	   	});
	   	confirm.present();
	}

 	ionViewWillEnter() {
        this.events.publish('hidemenu', { menustatus:false });
        this.events.publish('hideheader', { headerstatus:false,navheaderstat:false});

       
 	 }
  	ionViewWillLeave() {
     this.events.publish('hidemenu', { menustatus:false });
   }
    ionViewDidLoad() {
    	 this.events.publish('hidemenu', { menustatus:false });
    	this.events.publish('hideHeader', { footerstatus: false,lac:'',borrname:''});
	    console.log('ionViewDidLoad LoginPage');   
   	}

}
