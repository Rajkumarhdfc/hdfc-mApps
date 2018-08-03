import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Pro } from '@ionic/pro';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { normalizeURL } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private iab: InAppBrowser,public loadingCtrl: LoadingController,public navCtrl: NavController) {
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


  items = [
    'Master',
    'Phone book',
    'Technical Appraisal',
    'File Approval',
    'crm'
  ];


  async itemSelected(item: string) {
    const versions = await Pro.deploy.getAvailableVersions();
    console.log("Selected Item", item);
    const app_path= this.seekChannels(versions, item);
    console.log(app_path);
    var path = 'file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/'+app_path+'/index.html';
    const browser = this.iab.create(path, '_self');
    console.log('launched successfully');
  }




  async configureDeploy() {
    const config = {
      'appId': '040d0d97',
      'channel': 'Master'
    }
    await Pro.deploy.configure(config);
  }

  async performManualUpdatecrm(channel) {

    const versions = await Pro.deploy.getAvailableVersions();
    console.log(versions);
    const prevVersion="";
    const config = {
      'appId': '040d0d97',
      'channel': channel,
      
    }
   
    await Pro.deploy.configure(config);
    
  
    if(versions.length>0){
      const  prevVersion=await this.seekChannels(versions,channel);
    }
    const update = await Pro.deploy.checkForUpdate();
    debugger;
    console.log(prevVersion);
    if (update.available && update.snapshot !=prevVersion){
      console.log('Fired for update');
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: 'Downloading  '+channel
      });
      loading.present();

    
      await Pro.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      console.log(prevVersion);
      if(prevVersion!=""){
        Pro.deploy.deleteVersionById(prevVersion);
      }
      loading.dismiss();

      //await Pro.deploy.reloadApp();
    }
    
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
  openMaster(): void {
    var path = 'file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/Master/index.html';
  
    // path= path.split("//", 1)[1]
   console.log(path);
    const browser = this.iab.create(path, '_self');
  }
  openWithInAppBrowserInternal(): void {
    var path = 'file:///data/user/0/io.ionic.starter/files/ionic_built_snapshots/crm/index.html';
  
    // path= path.split("//", 1)[1]
   console.log(path);
    const browser = this.iab.create(path, '_self');
  }
  

  async performManualUpdatPB() {
    const config = {
      'appId': '040d0d97',
      'channel': 'Phone book',
      
    }
    await Pro.deploy.configure(config);
    const update = await Pro.deploy.checkForUpdate()
    debugger;
    if (update.available){
      await Pro.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      //await Pro.deploy.reloadApp();
    }
  }
  async performManualUpdateTA() {
    const config = {
      'appId': '040d0d97',
      'channel': 'Technical Appraisal',
      
    }
    await Pro.deploy.configure(config);
    const update = await Pro.deploy.checkForUpdate()
    debugger;
    if (update.available){
      await Pro.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      //await Pro.deploy.reloadApp();
    }
  }
  async performManualUpdateFileApprovals() {
    const config = {
      'appId': '040d0d97',
      'channel': 'File Approval',
      
    }
    await Pro.deploy.configure(config);
    const update = await Pro.deploy.checkForUpdate()
    debugger;
    if (update.available){
      await Pro.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      //await Pro.deploy.reloadApp();
    }
  }

  async performManualUpdateMaster() {
    const config = {
      'appId': '040d0d97',
      'channel': 'Master',
    
    }
    const versions = await Pro.deploy.getAvailableVersions();
    console.log(versions);
    const  prevVersion=await this.seekChannels(versions,'Master');
    await Pro.deploy.configure(config);

    const update = await Pro.deploy.checkForUpdate()
    debugger;
    if (update.available && update.snapshot !=prevVersion){
      await Pro.deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Pro.deploy.extractUpdate((progress) => {
        console.log(progress);
      })
     // await Pro.deploy.reloadApp();
    }
  }

async  getMasetrVersion(){
    const config = {
      'appId': '040d0d97',
      'channel': 'Master'
    }
    await Pro.deploy.configure(config);
    const info = await Pro.deploy.getCurrentVersion()
console.log(info);
  }
  async getCRMVersion(){
    const config = {
      'appId': '040d0d97',
      'channel': 'crm'
    }
    await Pro.deploy.configure(config);
    const info = await Pro.deploy.getCurrentVersion()
console.log(info);
  }
  async checkVersions() {
    const versions = await Pro.deploy.getAvailableVersions();
    console.log(versions);
    // [
    //   {
    //     'versionId': 'versionId1',
    //     'channel': 'CHANNEL_NAME',
    //     'binaryVersion': '1.0.1'
    //   },
    //   {
    //     'versionId': 'versionId2',
    //     'channel': 'CHANNEL_NAME',
    //     'binaryVersion': '1.0.1'
    //   },
    // ]
  }

  // function seekVendor(vendors, name) {
  //   for (var i=0, l=vendors.length; i<l; i++) {
  //     if (typeof vendors[i] == "object" && vendors[i].Name === name) {
  //       return vendors[i];
  //     }
  //   }
  // }

  // async deleteVersion(versions_id) {
  // //  const versions = await Pro.deploy.getAvailableVersions();
  //   Pro.deploy.deleteVersion(versions_id);
  // }
 
 

  seekChannels(versions, channel) {
    debugger;
    for (var i=0, l=versions.length; i<l; i++) {
      if (typeof versions[i] == "object" && versions[i].channel === channel) {
        return versions[i].versionId;
      }
    }
  }
 

  async  ionViewDidEnter(){
    console.log("ionViewDidEnter");
  console.log(this.items.length);
var packList= [
  'Master',
  'Phone book',
  'Technical Appraisal',
  'File Approval',
  'Master',
  'crm'
];
  for(var i = 0; i < packList.length; i++){
    console.log(packList[i])
    // var channel_name= packList[i];
    // console.log(channel_name);
  await this.performManualUpdatecrm(packList[i])
 }

}
async deleteVersion() {
  const versions = await Pro.deploy.getAvailableVersions();
  Pro.deploy.deleteVersionById(versions[0].versionId);
}


}
