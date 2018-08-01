import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Pro } from '@ionic/pro';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { normalizeURL } from 'ionic-angular';


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
    var path = 'file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/04896128-2e2c-4950-a857-a220997957da/index.html';
  
    // path= path.split("//", 1)[1]
   console.log(path);
    const browser = this.iab.create(path, '_self');
  }
  
  async performManualUpdatecrm() {
    const config = {
      'appId': '040d0d97',
      'channel': 'crm'
    }
    await Pro.deploy.configure(config);
    const update = await Pro.deploy.checkForUpdate()
    if (update.available){
      await Pro.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.reloadApp();
    }
  }
  async performManualUpdateMaster() {
    const config = {
      'appId': '040d0d97',
      'channel': 'Master'
    }
    await Pro.deploy.configure(config);

    const update = await Pro.deploy.checkForUpdate()
    if (update.available){
      await Pro.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.reloadApp();
    }
  }

  getMasetrVersion(){
    const config = {
      'appId': '040d0d97',
      'channel': 'Master'
    }
    await Pro.deploy.configure(config);
    const info = await Pro.deploy.getCurrentVersion()
console.log(info);
  }
  getCRMVersion(){
    const config = {
      'appId': '040d0d97',
      'channel': 'crm'
    }
    await Pro.deploy.configure(config);
    const info = await Pro.deploy.getCurrentVersion()
console.log(info);
  }

  
 

}
