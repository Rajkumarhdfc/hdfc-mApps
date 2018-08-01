import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pro } from '@ionic/pro';

import { InAppBrowser } from '@ionic-native/in-app-browser';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private iab: InAppBrowser,public navCtrl: NavController) {
  console.log('Changed for crm branch');

  
   this.configureDeploy(); // to configure

   const info =  Pro.deploy.getConfiguration() // // to get details 
   console.log(info);
   
  //  console.error('testing');
  //Pro.monitoring.exception(new Error('error'))
   // FGXSFXGSDXY
   // Pro.monitoring.log('EDG'+" : "+'Now it is changed', { level: 'error' });

    // Pro.monitoring.call(() => {
    //   throw new Error('rAJKUMAR'+'error');
    // })

  }
  async configureDeploy() {
    const config = {
      'appId': '040d0d97',
      'channel': 'Master'
    }
    await Pro.deploy.configure(config);
  }
  
  async performAutomaticUpdate() {
    try {
      const currentVersion = Pro.deploy.getCurrentVersion();
      const resp = await Pro.deploy.sync({updateMethod: 'auto'});
      console.log(currentVersion);
      console.log(resp);
      // if (currentVersion.versionId !== resp.versionId){
      //   // We found an update, and are in process of redirecting you since you put auto!
      // }else{
      //   // No update available
      // }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:
       Pro.monitoring.exception(err);
    }
  }
  openWithInAppBrowser(): void {
    const browser = this.iab.create('https://google.com', '_blank');
  }
  openWithInAppBrowserInternal(): void {
    var path = 'file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/cc65eb75-5c2e-4b14-88af-3264424bbd11/manifest.json';
  
    path= path.split("//", 1)[1]
   console.log(path);
    const browser = this.iab.create(path, '_blank');
  }
  
  
 

}
