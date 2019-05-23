import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController,Events} from 'ionic-angular';
import { Camera,CameraOptions} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Crop } from '@ionic-native/crop';
import { DbProvider } from '../../providers/db/db';
import { RestProvider } from '../../providers/rest/rest';
import { Base64 } from '@ionic-native/base64';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';
import { FilePath } from '@ionic-native/file-path';


/**
 * Generated class for the CapturePhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-capture-photo',
  templateUrl: 'capture-photo.html',
})
export class CapturePhotoPage {
  isClicked = [];

Filter:any;
LacNo:any;
Borrname:any;
imageURL:any;
base64Image:any;
previousurl:any=[];
cropService;
ldap_id:any;
id:any;
sessionid:any;
propno:any;
fileno:any;
srno:any;
phototype:any;
base64f:any;
connected: Subscription;
disconnected: Subscription;
imgflag:boolean=false;
imag:any;



const 
  options:CameraOptions = {
  quality: 100,
  destinationType:this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  saveToPhotoAlbum: true,
  correctOrientation:true
}
  constructor(private base64: Base64,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private crop: Crop,
    public dbProvider:DbProvider,
    public restProvider: RestProvider, 
    public loadingCtrl:LoadingController,
    private network: Network,
    public toastCtrl:ToastController,
     public events:Events) {
    // this.dbProvider.sDropTableSAVEPHOTO().then((res)=>{
    //   console.log(res);
    // })
    this.dbProvider.CreateTablePhotoSave().then((res)=>{
      console.log(res);
    })

    this.LacNo = navParams.get('item');
    this.Borrname=this.navParams.get('item2');
  }

onChange(event){
console.log(event);
this.phototype=event;

}

takePhoto(){
  if(this.previousurl.length>=1){
    this.imgflag=true;
  }
    this.camera.getPicture(this.options).
  then((imageData) => {
    console.log(imageData);
     this.imageURL = imageData
    this.crop
    .crop(imageData, {quality: 75})
    .then((newImage) => {
      this.imag=newImage;
             console.log(newImage);
          this.previousurl.push(newImage);
          this.imgflag=true;
    }, error => console.error("Error cropping image", error));
  }, function(error) {
    console.log(error);
  });
  

  }
  
getuserid(){
  this.dbProvider.getAppMasterUserID().then((result)=>{
    this.id=result;
    this.ldap_id=this.id.UserID
    console.log(this.ldap_id);
  })
}

getSessionId(){
  this.dbProvider.getsessionid().then((result)=>{
     var sid:any;
     sid=result;
      this.sessionid=sid.SessionId;
      console.log(this.sessionid);
  })
}

getLacDetails(){
  this.dbProvider.LacMasterTableDetailsPhotoUpload(this.LacNo).then((res)=>{
   console.log(res);
   this.propno=res[0].prop_no;
   this.fileno=res[0].file_no;
  })
}


encodebase64image(base,img_filename){
       let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
           loading.present()
        this.base64.encodeFile(base).then((base64File: string) => {
        base64File=base64File.split(",")[1];
        console.log(base64File); 
          this.restProvider.
          uploadphoto(this.fileno,this.ldap_id,this.propno,img_filename,this.sessionid,base64File).
          then((res)=>{
         loading.dismiss();
      //   window["FirebasePlugin"].logEvent("uploadphoto", {username:this.ldap_id,fileno:this.fileno});
            })
        }, (err) => {
            loading.dismiss();
          console.log(err);
        });
        
}



  removeImage(index){
       this.previousurl.splice(index, 1);
       console.log(index,this.previousurl);
      if(this.previousurl.length==0){
       this.imgflag = false;
      }
      else{
        this.imgflag=true;
      }
      console.log(this.imag);
    }


saveImage(item){
    var img_lac_no = this.LacNo;
    var img_srno = this.srno;
    var img_file_no = this.fileno;
    var img_user_name = this.ldap_id;
    var img_prop_no = this.propno;
    var img_photo_type = this.phototype;

if(this.network.type=='none'){

  if(img_photo_type==""){
alert('Pls select the photo type')
  }else{
    if (this.previousurl.length != 0 ) {
      for (var i = 0; i < this.previousurl.length; i++) {
          var img_filename = img_prop_no + "_" + i + Math.floor(Date.now() / 100) + ".hdfcjpg"
         // var req_img = {};
           this.dbProvider.InsertIntoPhotoUpload(this.LacNo,this.Filter,img_filename,this.previousurl[i],this.propno).then((res)=>{
            console.log(res);
             let toast = this.toastCtrl.create({
                                message: 'data stored locally.To Upload Please turn your internet ON',
                                duration: 5000
                                });
                                toast.present();

          //  console.log(this.LacNo,this.Filter,img_filename,this.previousurl[i]);
          })
      }
  }

  }
 

}
else{
    if (this.previousurl.length != 0) {
        for (var j = 0; j < this.previousurl.length; j++) {
            var img_filename1 = img_prop_no + "_" + j + Math.floor(Date.now() / 100) + ".hdfcjpg"
           // var req_img = {};
           this.encodebase64image(this.previousurl[j],img_filename1)
        }
    }
}
      
  }


  


ionViewDidLoad() {
this.phototype='PROPERTY';
this.isClicked[0]=true;
    this.getuserid();
    this.getSessionId();
    this.getLacDetails();
    console.log('ionViewDidLoad CapturePhotoPage');

  }
   ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});
}

activeClass(val,PHOTOTYPE){
 // alert(val);
  this.isClicked=[false,false,false,false];
  this.isClicked[val]=true;
  this.phototype=PHOTOTYPE;
  
}

// ionViewWillLeave() {
//     this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});
//   }
}

  