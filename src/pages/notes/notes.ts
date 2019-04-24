import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, normalizeURL, Content,NavParams,Events } from 'ionic-angular';
import { File, IWriteOptions } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
   import {  ElementRef, AfterViewInit } from '@angular/core';

const STORAGE_KEY = 'IMAGE_LIST';
/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
 @ViewChild('imageCanvas') canvas: any;
 @ViewChild('myId') myId: ElementRef;
 @ViewChild('myDiv') myDiv: ElementRef;

 private context: CanvasRenderingContext2D;
 private element: HTMLImageElement;
  src: string;
  imgWidth: number
  imgHeight: number
  image_src:any;
  canvasElement: any;
  saveX: number;
  saveY: number;
  storedImages=[] ;
	LacNo:any;
	name:any;
	notesname = [];
	notesoflac:any;
  NAME;
  BLOB:any;
  OPTIONS:any;
  resultres:any;
  dispflag:boolean=false;
  saveflg:boolean=false;
  newimgname:any;
  // Make Canvas sticky at the top stuff
  @ViewChild(Content) content: Content;
  @ViewChild('fixedContainer') fixedContainer: any;
  // Color Stuff
  selectedColor = '#9e2956';
 
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];

  constructor(public navCtrl: NavController,
   public navParams: NavParams, 
   private file: File,
   private storage: Storage,
    public renderer: Renderer,
    private plt: Platform,
     public events: Events,
) {

     if(this.resultres==true){
      this.dispflag=true;
      console.log(this.dispflag);
    }

 	this.LacNo = navParams.get('item');
  this.NAME=this.LacNo + '.png';
	this.name=navParams.get('item2');
    this.storage.ready().then(() => {
      this.storage.get(STORAGE_KEY).then(data => {
        if (data != undefined) {
          this.storedImages = data;
        }
      });
    });
  }

  selectColor(color) {
  this.selectedColor = color;
}
 
startDrawing(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
  this.saveX = ev.touches[0].pageX - canvasPosition.x;
  this.saveY = ev.touches[0].pageY - canvasPosition.y;
}
 
moved(ev) {
  var canvasPosition = this.canvasElement.getBoundingClientRect();
  let ctx = this.canvasElement.getContext('2d');
  let currentX = ev.touches[0].pageX - canvasPosition.x;
  let currentY = ev.touches[0].pageY - canvasPosition.y;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = this.selectedColor;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(this.saveX, this.saveY);
  ctx.lineTo(currentX, currentY);
  ctx.closePath();
  ctx.stroke();
  this.saveX = currentX;
  this.saveY = currentY;
}
 
 removeCanvas(){
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '  ';
    this.canvasElement.height = 700;
 }
 
// saveCanvasImage() {
//   let imglac; 
//   var dataUrl = this.canvasElement.toDataURL();
//   let ctx = this.canvasElement.getContext('2d');
//  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
//   let name = this.LacNo + '.png';
//   this.NAME=name;
//    //=name.split('.')[0];
//    // if(this.LacNo==imglac){
//    // 	this.storedImages.findIndex(this.checkLac);
//    // 	console.log(this.storedImages.findIndex(this.checkLac));
//    // }
//   //this.notesname.push(this.storedImages[i].img.split('.')[0]);
//   //console.log(this.notesname,name);
//   let path = this.file.dataDirectory;
//   let options: IWriteOptions = { replace: true };
//   this.OPTIONS=options;
//   var data = dataUrl.split(',')[1];
//   let blob = this.b64toBlob(data, 'image/png');
//   this.BLOB=blob;
//   //this.WriteFile(path,name,blob,options);
  
//   this.file.checkFile(path,name).then(res=>{
//     this.resultres=res;
//     console.log(res);
//   })
//   .then(()=>{
//     if(this.resultres==true){
//        this.file.removeFile(path,name).then(res=>{
//        console.log(res);
//         let oldpath=this.getImagePath(name);
//         console.log(oldpath);
//       }).then(res=>{
//       this.file.writeFile(path, name, blob, options).then(res => {
//       console.log(res,this.image_src);
//       //this.storeImage(name);
//   }, err => {
//     console.log('error: ', err);
//   });
//  })    
//  }
//  else{
//    this.WriteFile(path,name,blob,options);
//  }
//   })
  
// } 


saveCnvsImage() {
 var img;
this.saveflg=true;
//this.dispflag=true;
  var dataUrl = this.canvasElement.toDataURL();
  let ctx = this.canvasElement.getContext('2d');
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  let name = this.LacNo + '.png';
  let name1 =this.LacNo + 'old'+'.png';

  let path = this.file.dataDirectory;
  let options: IWriteOptions = { replace: true };
  var data = dataUrl.split(',')[1];
  let blob = this.b64toBlob(data, 'image/png');
   if(this.dispflag==true){
     // dispflag is check file 
      this.file.removeFile(path,name).then(data=>{
       console.log(data);
       this.file.writeExistingFile(path, name, blob).then(res => {
       console.log(this.file.writeExistingFile(path, name, blob));
        this.newimgname=name;
       alert("saved")
       this.dispflag=false;
        img=this.getImagePath(name);
        console.log(img);
     }, err => {
    console.log('error: ', err);
  });

        // data.fileRemoved.getMetadata(function (metadata) {
        //                     let name = data.fileRemoved.name;
        //                     let size = metadata.size ;
        //                     let fullPath = data.fileRemoved.fullPath;
        //                     console.log('Deleted file: ', name, size, fullPath) ;
        //                     console.log('Name: ' + name + ' / Size: ' + size) ;
        //                 }) 

      })
 }
 else{
     this.file.writeFile(path, name, blob, options).then(res => {
      console.log(res,name,path);
        img=this.getImagePath(name);
         console.log(img);
       alert("saved")
       this.dispflag=false;
     }, err => {
    console.log('error: ', err);
  });


 }
  console.log(this.dispflag);
}


// storeImage1(imageName) {
//     let storedpics:any;
//     console.log(imageName);
//     let saveObj= {"hgiyu":"58487"};
//     console.log(typeof(this.storedImages));
//     storedpics.push(saveObj);
//     console.log(storedpics);
//   this.storage.set(STORAGE_KEY, this.storedImages).then(() => {
//     setTimeout(() =>  {
//       this.content.scrollToBottom();
//     }, 500);
//   });
//   console.log(this.storedImages);
// }
 

// RemoveFile(PATH,NAME){
//   console.log(PATH,NAME);
// this.file.removeFile(PATH,NAME).then(res=>{
//      console.log(res);

//    })
// }
// CheckFile(PATH,NAME){
//   console.log(PATH,NAME);
// this.file.checkFile(PATH,NAME).then(res=>{
//     this.resultres=res;
//     console.log(res);
//   })
// }
// WriteFile(PATH,NAME,BLOB,OPTIONS){
//  this.file.writeFile(PATH, NAME, BLOB, OPTIONS).then(res => {
//     console.log(res);
//     this.storeImage(NAME);
//   }, err => {
//     console.log('error: ', err);
//   });
// }



b64toBlob(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
 
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
 
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
 
    byteArrays.push(byteArray);
  }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

   ionViewDidEnter() {
    // https://github.com/ionic-team/ionic/issues/9071#issuecomment-362920591
    // Get the height of the fixed item
    let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
    let scroll = this.content.getScrollElement();
    // Add preexisting scroll margin to fixed container size
    itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
    scroll.style.marginTop = itemHeight + 'px';
     this.events.publish('hideheader', { headerstatus:false,navheaderstat:false});
   // this.canvasElement.src=this.storedImages;
  //   for(var i=0;i<this.storedImages.length;i++){
  //    	this.notesname.push(this.storedImages[i].img.split('.')[0]);
  //    	console.log(this.notesname);
  //    	if(this.notesname[i]==this.LacNo){
		// this.notesoflac=this.notesname[i];
		// console.log(this.notesoflac);
  //    	}
  //    }

  }

 ngOnInit(){
//this.image_src="";
     // let name1 =this.LacNo + 'old'+'.png';
     //  console.log(name1);
     //  if(name1!=""&&this.image_src!=""){
     //    this.dispflag=true;
     //        this.file.removeFile(this.file.dataDirectory, name1).then(res => {
     //          if(this.saveflg==true&&this.newimgname!=""){
     //            this.image_src=this.getImagePath(this.newimgname);
     //            console.log(this.image_src);
     //          }
     //          console.log(this.file.dataDirectory, name1,res);
     //      }, err => {
     //      console.log('remove err; ' ,err);
     //      });
     //  }
     //  else{
     //     this.dispflag=false;
     //  }
     this.file.checkFile(this.file.dataDirectory,name).then(res=>{
     this.resultres=res;
    if(this.resultres==true){
      this.dispflag=true;

    }else{
      this.dispflag=false;
    }
    console.log(res,name);
  })
 }

loadImage(){
   let ctx = this.canvasElement.getContext('2d');
    ctx.drawImage(this.myId.nativeElement, 10, 10);
    this.dispflag=false
}

  ionViewDidLoad() {
  //    this.file.checkFile(this.file.dataDirectory,name).then(res=>{
  //    this.resultres=res;
  //   if(this.resultres==true){
  //     this.dispflag=true;
  //   }
  //   console.log(res);
  // })
    // Set the Canvas Element and its size
   // this.getFile();
     console.log(this.dispflag);
     var imgname = this.LacNo + 'old'+'.png';
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '  ';
    this.canvasElement.height = 500;
    this.image_src="";
    //this.canvasElement.src="https://www.google.com/search?q=New+Year%27s+Eve&oi=ddle&ct=new-years-eve-2018-4995722058399744&hl=en&kgmid=/m/01pl3y&source=doodle-ntp"
    //this.canvasElement.src=this.storedImages;
    console.log(this.getImagePath(imgname));
    this.image_src=this.getImagePath(imgname);
    console.log(this.image_src);
  }

//   storeImage(imageName) {
//   let index;
//   let saveObj = { img: imageName };
//   console.log(saveObj);
//   this.image_src=this.storedImages[0];
//   this.storedImages.push(saveObj);
//   //this.storedImages=saveObj;
//   this.storage.set(STORAGE_KEY, this.storedImages).then(() => {
//     setTimeout(() =>  {
//       this.content.scrollToBottom();
//     }, 500);
//   });
//   console.log(this.image_src);
// }
 
removeImageAtIndex(index) {
  let removed = this.storedImages.splice(index, 1);
  this.file.removeFile(this.file.dataDirectory, removed[0].img).then(res => {
  }, err => {
    console.log('remove err; ' ,err);
  });
  this.storage.set(STORAGE_KEY, this.storedImages);
}
 
getImagePath(imageName) {
  let path = this.file.dataDirectory + imageName;
  path = normalizeURL(path);
  return path;
}


ionViewWillEnter() {

}


getFile(){
       var imgname = this.LacNo + '.png';
   this.file.resolveDirectoryUrl(this.file.dataDirectory).then(res=> {
     console.log(res)
      this.file.getFile(res,imgname,{ create: true }).then(res => {
      console.log(res)

  }, err => {
    console.log(' err; ' ,err);
  });
  }, err => {
    console.log('remove err; ' ,err);
  });

}

getallFiles(){
  this.file.listDir(this.file.cacheDirectory,'').then((result)=>{
    console.log(result);
    for(let file of result){
          console.log(file);
        if(file.isFile == true){

            // this.file.removeFile(this.file.cacheDirectory, file.name) ;
            console.log(file);
                file.getMetadata(function (metadata) {
                    let name = file.name ;
                    let size = metadata.size ;
                    console.log('Name: ' + name + ' / Size: ' + size) ;
                //    sizes += size ;
                    }) ;
                
        }
    }
}) ;

 }
}
