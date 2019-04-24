import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,LoadingController} from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { RestProvider } from '../../providers/rest/rest';
//import { FileTransfer } from '@ionic-native/file-transfer';
import { DbProvider } from '../../providers/db/db';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ViewDocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-doc',
  templateUrl: 'view-doc.html',
})
export class ViewDocPage {
LacNo:any;
Borrname:any;
tabletype:any;
viewdocs:any;
filename:any;
PDF_Flag="Y";

pages: Array < {
        title: string,
        component: any,
    } > ;
  constructor(public file:File,
  public Platform:Platform,
  public navCtrl: NavController,
   public dbProvider:DbProvider,
   public navParams: NavParams,
   private fileOpener: FileOpener,
   public restProvider: RestProvider,
    public loadingCtrl:LoadingController,
     public events:Events) {

    this.LacNo = navParams.get('item');
    this.Borrname=this.navParams.get('item2');

  }

viewDocument(filename) {
  var x;
     var exm = filename.split(".");
        var ext = exm[exm.length - 1].toLowerCase();
        this.PDF_Flag="Y";
         if(ext=="jpg"||ext=="pdf"){
          this.PDF_Flag="N"
          }
          
    this.restProvider.ViewDocs(filename,this.PDF_Flag).then((res)=>{
      let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
      loading.present();  

      console.log(res);
      x=res
      console.log(x);
      if(x.GetPDFDocument==undefined){
        loading.dismiss();
                alert("no data found");
      }
      else{
        loading.present();
        var resreturn=x.GetPDFDocument[0].FILEDATA;
          if(ext=="pdf"||ext=="tif"){

          console.log(ext);
          const fileExt = 'pdf'
          console.log(fileExt);
          const writeDirectory = this.Platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
          this.file.writeFile(writeDirectory, 'document.pdf', this.convertBaseb64ToBlob(resreturn, 'data:application/' + fileExt + ';base64'), {replace: true})
            .then(() => {
                  loading.present();

                this.fileOpener.open(writeDirectory + 'document.pdf', 'application' +
                    '' +
                    '/' + fileExt).then(()=>{
                      loading.dismiss();
                    })

                    .catch((error) => {
                      loading.dismiss();
                        console.log(error);
                        console.log('Error opening file');
                    });
            })
            .catch((error) => {
                console.log(error);
                console.error('Error writing file');
            });
            loading.dismiss();
      }
      else{
        loading.present();
      const fileExt = 'jpg'
        console.log(fileExt);
        const writeDirectory = this.Platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
        this.file.writeFile(writeDirectory, 'document.jpg', this.convertBaseb64ToBlob(resreturn, 'data:application/' + fileExt + ';base64'), {replace: true})
            .then(() => {
              loading.present();
                this.fileOpener.open(writeDirectory + 'document.jpg', 'application' +
                    '' +
                    '/' + fileExt).then(()=>{
                      loading.dismiss();
                    })
                    
                    .catch((error) => {
                      loading.dismiss();
                        console.log(error);
                        console.log('Error opening file');
                    });
            })
            .catch((error) => {
                console.log(error);
                console.error('Error writing file');
            });
            loading.dismiss();


      }

      }
      
    })

 }
 convertBaseb64ToBlob(b64Data, contentType): Blob {
            contentType = contentType || '';
            const sliceSize = 512;
            b64Data = b64Data.replace(/^[^,]+,/, '');
            b64Data = b64Data.replace(/\s/g, '');
            const byteCharacters = window.atob(b64Data);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            return new Blob(byteArrays, {type: contentType});
        }





  ionViewDidLoad() {
    this.dbProvider.SelectFromViewDocs(this.LacNo).then((res)=>{
      console.log(res);
      this.viewdocs=res;
    })
    console.log('ionViewDidLoad ViewDocPage');
  }

 ionViewWillEnter() {
   this.events.publish('hideheader', { headerstatus:true,navheaderstat:true});

}


}
