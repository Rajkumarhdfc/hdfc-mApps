import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { ModalController,Events,Platform } from 'ionic-angular';
import {ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { DbProvider } from '../../providers/db/db';
import { RestProvider } from '../../providers/rest/rest';
import{GetLatLongProvider} from '../../providers/get-lat-long/get-lat-long'

/**
 * Generated class for the MapviewscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var L;
declare var MapmyIndia;
declare var google;

 
@IonicPage()
@Component({
  selector: 'page-mapviewscreen',
  templateUrl: 'mapviewscreen.html',
})

export class MapviewscreenPage {
 	  map = null;
    mk:any
   	marker=[]
   	latitude:any;
   	longtitude:any;
   	connected:any;
   	disconnected:any;
   	ldap_id:any;
   	sessionid:any;
   	id:any;
   	add_type:any;
   	capcty:any;
   	address_details:any;
    address_details1:any;
   	LacNo:any;
   	index:any;
   	address_edit:any;
    address_edit1:any;
   	cust_lat="";
   	cust_long="";
    borrname:any;
    paddrssflag:boolean=false;
        

  constructor(private geolocation: Geolocation,
  	public modalCtrl: ModalController,
  	public launchNavigator: LaunchNavigator,
  	public navCtrl: NavController,
  	private network: Network,
  	public toastCtrl:ToastController,
  	public dbProvider:DbProvider,
  	public navParams:NavParams,
  	public restProvider: RestProvider,
  	public loadingCtrl:LoadingController,
  	public getlatlong:GetLatLongProvider,
    public events:Events,
    public platform:Platform)
 {

    this.latitude="";
	  this.LacNo = navParams.get('lacno');
    this.borrname = navParams.get('borname');
    console.log(this.LacNo);
   	this.address_details = this.navParams.get('address_details');
     this.address_details1 =this.navParams.get('address_details1')
    this.paddrssflag=this.navParams.get('permflag');
    console.log(this.paddrssflag);
  	console.log(this.address_details)

  if(this.paddrssflag==false || this.paddrssflag===undefined){
  this.address_edit=this.address_details.address.split("Mobile")[0];
 this.getCurrentLatlng();
  }
  else{
  this.address_edit=this.address_details.perm_address.split("Mobile")[0];
 this.getCurrentLatlng();
  }

   events.subscribe('getLocation', (data) => {
           console.log(data)
        })
   


       

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


goBack(){
  this.navCtrl.pop();
}

getCurrentLatlng(){
    this.address_edit="";
  if(this.network.type!='none')
    {
 	    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      this.latitude=resp.coords.latitude;
      this.longtitude=resp.coords.longitude;
      console.log(this.latitude,this.longtitude);
      var centre = [this.latitude,this.longtitude];
    	this.map = new MapmyIndia.Map('map', {
      	center: centre,
      	zoomControl: true,
      	hybrid: true
    });
           
    this.getuserid();
    this.getSessionId();
    this.testaddress();


        if(this.address_details.latitude==undefined || this.address_details.latitude==""){
           // this.address_edit=this.address_details.address.split("Mobile")
      //    this.getLatitudeLongitude(this.address_edit);
          
            
        }
      else
      {

         this.cust_lat=this.address_details.latitude;
         this.cust_long=this.address_details.longitude;
         this.addmarkerBy_latlong(this.cust_lat,this.cust_long);
      
       }
      

      console.log(this.address_edit);

     }).catch((error) => {
       alert(JSON.stringify(error))
       console.log('Error getting location', error);
     });
 }
 else
 {
   alert("Keep Your Internet On");
 	console.log("Keep Your Internet On")
 }


  }

UploadLatLong(){
	this.getuserid();
		var data={
	"USER_ID":this.ldap_id,
	"SESSION_ID": this.sessionid,
	"ADDRESS_TYPE":this.address_details.addresstype,
	"ADDRESS_ID":this.address_details.file_no,
	"ADDRESS_ID_VAL": "",
	"LATLONG_SOURCE":"RECOVERY_TAB",
	"LATITUDE":this.mk._latlng.lat, 
	"LONGITUDE":this.mk._latlng.lng ,
	"KEY1": "",
	"kEY1_VAL":this.address_details.comm_custno,
	"KEY2": "",
	"KEY2_VAL":"" ,
	"KEY3": "",
	"KEY3_VAL":"" ,
	"LATLONGDET":"" ,
		}
		console.log(data);
		this.restProvider.LatLngMap(data).then((res)=>{
      console.log(res);
      window["FirebasePlugin"].logEvent("lat-long-plot", {userdtls:data});

		}).catch(err=>{
      window["FirebasePlugin"].logEvent("lat-long-plot", {userdtls:data});

    })

}


addMarker_By_address(){
		this.mk = this.addMarker([19.146647,72.846313], '', "Customer location", true); /*call the add marker function*/
    this.mk.on("dragstart", function(e) {});
    this.mk.on("dragend", function(e) {
    var pt = e.target._latlng;

            // this.events.publish('getLocation', pt);//for hiding footer

    // this.latitude=e.target._latlng.lat;
    // this.longtitude=e.target._latlng.lng; /*event returns lat lng of dragged position*/
  //  this.mk.setLatLng(pt); /*set marker position to dragged position*/
    console.log(e);
    });

    this.marker.push(this.mk);
    this.map.setView(this.mk.getLatLng()); 
      // data can be a set of cooraddress_editinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
}

  loadMap(){
    var centre = [this.latitude,this.longtitude];
    this.map = new MapmyIndia.Map('map', {
      center: centre,
      zoomControl: true,
      hybrid: true
    });
    this.mk = this.addMarker([this.latitude,this.longtitude], '', "Customer location", true); /*call the add marker function*/
    this.mk.on("dragstart", function(e) {});
    this.mk.on("dragend",this.latitude,this.longtitude, function(e) {
      console.log(this.latitude);
        var pt = e.target._latlng;;
        // this.latitude=e.target._latlng.lat;
        // this.longtitude=e.target._latlng.lng; //event returns lat lng of dragged position
//this.mk.setLatLng(pt); /*set marker position to dragged position*/
        console.log(e);
    });
    this.marker.push(this.mk);
    this.map.setView(this.mk.getLatLng()); /*get the wgs locaton from marker and set the location into center*/
  }

  addMarker(position, icon, title, draggable) {
    /* position must be instance of L.LatLng that replaces current WGS position of this object. Will always return current WGS position.*/
    if (icon == '') {
        this.mk = new L.Marker(position, {
            draggable: draggable,
            title: title
        }); /*marker with a default icon and optional param draggable, title */
        this.mk.bindPopup(title);
    }
    else 
    {
        this.mk = new L.Marker(position, {
            icon: icon,
            draggable: draggable,
            title: title
        }); /*marker with a custom icon */
        this.mk.bindPopup(title);
    }
  
    this.map.addLayer(this.mk); /*add the marker to the map*/
    /* marker events:*/
    this.mk.on("click", function(e) {
       
    });
    return this.mk;
}
  
  getLatitudeLongitude(address) {
  	this.getlatlong.getLatitudeLongitude(address).then((results:any)=>{
  	var res=results;
   

   if(results.lat!=""){

       // this.cust_lat = results[0].geometry.location.lat();
        this.cust_lat = results.lat
        this.cust_long = results.lang
       console.log(this.cust_lat);
       console.log(this.cust_long);
       this.addmarkerBy_latlong(this.cust_lat,this.cust_long);
       var pt = new L.LatLng(this.cust_lat,this.cust_long);
      this.map.setView(pt); 
    }
    else{
           this.cust_lat = "";
        this.cust_long = "";
     alert('No latitude found ..');
   }
   
  	 })


  	}

mapNavigation(){

	console.log(this.latitude);
	console.log(this.cust_lat);

	if(this.longtitude != ""&& this.latitude !="" ){
   //alert('inside navigation');
  var lat_long=this.latitude+','+this.longtitude;
  if(this.cust_lat!=""&&this.cust_long!=""){
var cust_location=this.cust_lat+','+this.cust_long;
  }else{
    cust_location=this.address_edit;
  }
  
  let options: LaunchNavigatorOptions = {
    start: lat_long,
    app:this.launchNavigator.APP.GOOGLE_MAPS
  };
  this.platform.ready().then(()=>{

  this.launchNavigator.navigate(cust_location, options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  })
	}

  else{
      alert('You are at same place');

	}
 
}

saveLocation(){
    var latitude_desc="";
    var longitude_desc="";
	if(this.address_details.addresstype=="C"){
		latitude_desc='comm_latitude';
		longitude_desc='comm_longitude'
	}
	if(this.address_details.addresstype=="E"){
		latitude_desc='empl_latitude';
		longitude_desc='empl_longitude'
	}
	if(this.address_details.addresstype=="P"){
		latitude_desc='prop_latitude';
		longitude_desc='prop_longitude'
	}

this.udatecustomer(latitude_desc,longitude_desc);
if(this.network.type!='none')
    {
    let loading = this.loadingCtrl.create({
            content: 'Please wait..',
            spinner: 'crescent'
        });
    loading.present()
    this.UploadLatLong();
    alert("uploaded");
    loading.dismiss();
    }
    else{
    alert("Pls check the connection...");
    }

}


udatecustomer(latitude_desc,longitude_desc){
this.dbProvider.UpdateCustomerDetails(this.address_details.file_no,latitude_desc,longitude_desc,
  this.address_details.capacity,this.mk._latlng.lat,this.mk._latlng.lng
,this.address_details.srno)
.then((res)=>{
console.log('updated in UpdateCustomerDetails');

})
}

ionViewDidLoad()
{
	this.getuserid();
this.getSessionId();

}

testaddress(){

  if(this.paddrssflag==false){
  this.address_edit=this.address_details.address.split("Mobile")[0];
  //alert(this.address_edit);
  this.getLatitudeLongitude(this.address_edit);
  }
  else{
   this.address_edit=this.address_details.perm_address.split("Mobile")[0];
  this.getLatitudeLongitude(this.address_edit);
  // alert(this.address_edit);
  }
}
testaddress_afterC(){
  this.address_edit=this.address_details.address.split("Mobile")[0];
  this.getLatitudeLongitude(this.address_edit);

}


 mapmyindia_removeMarker() {
    var markerlength = this.marker.length;
    if (markerlength > 0) {
        for (var i = 0; i < markerlength; i++) {
            this.map.removeLayer(this.marker[i]); /* deletion of marker object from the map */
        }
    }
    delete this.marker;
    this.marker = [];
}

setLatlong(latitude,longitude){
console.log(latitude);
 this.latitude=latitude;
 this.longtitude=longitude;
}
addmarkerBy_latlong(latitude,longitude){
	this.mapmyindia_removeMarker();
	 	this.mk = this.addMarker([latitude,longitude], '', "Customer location", true); /*call the add marker function*/
    this.mk.on("dragstart", function(e) {});
    this.mk.on("dragend", function(e) {
    var pt = e.target._latlng;
               //  this.events.publish('getLocation', pt);//for hiding footer

    //  this.latitude=e.target._latlng.lat;
    // this.longtitude=e.target._latlng.lng;
    // this.setLatlong(this.latitude,this.longtitude)
 /*event returns lat lng of dragged position*/
    //this.mk.setLatLng(pt); /*set marker position to dragged position*/
    console.log(e);
    });

    this.marker.push(this.mk);
    this.map.setView(this.mk.getLatLng()); 
    
}
plot(){

this.mapmyindia_removeMarker();
  if(this.network.type!='none')
    {
    	
 	   this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      this.latitude=resp.coords.latitude;
      this.longtitude=resp.coords.longitude;
    
    this.mk = this.addMarker([this.latitude,this.longtitude], '', "Customer location",true); /*call the add marker function*/
    this.mk.on("dragstart", function(e) {});
    this.mk.on("dragend", function(e) {
      console.log(this);
    var pt = e.target._latlng;
       
      });

    this.marker.push(this.mk);
    this.map.setView(this.mk.getLatLng()); 
     }).catch((error) => {
       alert(JSON.stringify(error))
       console.log('Error getting location', error);
     });
 
 }
 else{
 	console.log("Keep Your Internet On")
 }
  
}




ionViewWillEnter() {
         this.events.publish('hideHeader', { footerstatus:false,lac:this.LacNo,borrname:this.borrname});//for hiding footer
            this.events.publish('hideheader', { headerstatus:false,navheaderstat:false});
          //  this.events.publish('map_page', { lac:this.LacNo,borrname:this.borrname,current_page_name:"map_page"});


  }

   ionViewWillLeave() {
         this.events.publish('hideHeader', { footerstatus:true,lac:this.LacNo,borrname:this.borrname});//for hiding footer
                this.events.publish('hideheader', { headerstatus:false,navheaderstat:true});
             //   this.events.publish('map_page', { lac:this.LacNo,borrname:this.borrname,current_page_name:"map_page"});


    }
 
}
