var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ModalController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { DbProvider } from '../../providers/db/db';
import { RestProvider } from '../../providers/rest/rest';
import { GetLatLongProvider } from '../../providers/get-lat-long/get-lat-long';
var MapviewscreenPage = /** @class */ (function () {
    function MapviewscreenPage(geolocation, modalCtrl, launchNavigator, navCtrl, network, toastCtrl, dbProvider, navParams, restProvider, loadingCtrl, getlatlong, events) {
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.launchNavigator = launchNavigator;
        this.navCtrl = navCtrl;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.dbProvider = dbProvider;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.loadingCtrl = loadingCtrl;
        this.getlatlong = getlatlong;
        this.events = events;
        this.map = null;
        this.marker = [];
        this.cust_lat = "";
        this.cust_long = "";
        this.latitude = "";
        this.LacNo = navParams.get('lacno');
        this.borrname = navParams.get('borname');
        console.log(this.LacNo);
        this.address_details = this.navParams.get('address_details');
        console.log(this.address_details);
        this.getCurrentLatlng();
    }
    MapviewscreenPage.prototype.getuserid = function () {
        var _this = this;
        this.dbProvider.getAppMasterUserID().then(function (result) {
            _this.id = result;
            _this.ldap_id = _this.id.UserID;
            console.log(_this.ldap_id);
        });
    };
    MapviewscreenPage.prototype.getSessionId = function () {
        var _this = this;
        this.dbProvider.getsessionid().then(function (result) {
            var sid;
            sid = result;
            _this.sessionid = sid.SessionId;
            console.log(_this.sessionid);
        });
    };
    MapviewscreenPage.prototype.getCurrentLatlng = function () {
        var _this = this;
        if (this.network.type != 'none') {
            this.geolocation.getCurrentPosition().then(function (resp) {
                console.log(resp);
                _this.latitude = resp.coords.latitude;
                _this.longtitude = resp.coords.longitude;
                console.log(_this.latitude, _this.longtitude);
                var centre = [_this.latitude, _this.longtitude];
                _this.map = new MapmyIndia.Map('map', {
                    center: centre,
                    zoomControl: true,
                    hybrid: true
                });
                if (_this.address_details.latitude == undefined || _this.address_details.latitude == "") {
                    // this.address_edit=this.address_details.address.split("Mobile")
                    _this.address_edit = _this.address_details.address.split("Mobile")[0];
                    //this.address_details.address;
                    //this.address_details.address;
                    console.log(_this.address_edit);
                    _this.getLatitudeLongitude(_this.address_details.address);
                }
                else {
                    _this.cust_lat = _this.address_details.latitude;
                    _this.cust_long = _this.address_details.longitude;
                    _this.addmarkerBy_latlong(_this.cust_lat, _this.cust_long);
                }
                _this.address_edit = _this.address_details.address.split("Mobile")[0];
            }).catch(function (error) {
                alert(JSON.stringify(error));
                console.log('Error getting location', error);
            });
        }
        else {
            console.log("Keep Your Internet On");
        }
    };
    MapviewscreenPage.prototype.UploadLatLong = function () {
        this.getuserid();
        var data = {
            "USER_ID": this.ldap_id,
            "SESSION_ID": this.sessionid,
            "ADDRESS_TYPE": this.address_details.addresstype,
            "ADDRESS_ID": this.address_details.file_no,
            "ADDRESS_ID_VAL": "",
            "LATLONG_SOURCE": "RECOVERY_TAB",
            "LATITUDE": this.latitude,
            "LONGITUDE": this.longtitude,
            "KEY1": "",
            "kEY1_VAL": this.address_details.comm_custno,
            "KEY2": "",
            "KEY2_VAL": "",
            "KEY3": "",
            "KEY3_VAL": "",
            "LATLONGDET": "",
        };
        console.log(data);
        this.restProvider.LatLngMap(data).then(function (res) {
            console.log(res);
        });
    };
    MapviewscreenPage.prototype.addMarker_By_address = function () {
        var mk = this.addMarker([19.146647, 72.846313], '', "Customer location", false); /*call the add marker function*/
        mk.on("dragstart", function (e) { });
        mk.on("dragend", function (e) {
            var pt = e.target._latlng;
            this.latitude = e.target._latlng.lat;
            this.longtitude = e.target._latlng.lng; /*event returns lat lng of dragged position*/
            mk.setLatLng(pt); /*set marker position to dragged position*/
            console.log(e);
        });
        this.marker.push(mk);
        this.map.setView(mk.getLatLng());
        // data can be a set of cooraddress_editinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
    };
    MapviewscreenPage.prototype.loadMap = function () {
        var centre = [this.latitude, this.longtitude];
        this.map = new MapmyIndia.Map('map', {
            center: centre,
            zoomControl: true,
            hybrid: true
        });
        var mk = this.addMarker([this.latitude, this.longtitude], '', "Customer location", false); /*call the add marker function*/
        mk.on("dragstart", function (e) { });
        mk.on("dragend", function (e) {
            var pt = e.target._latlng;
            this.latitude = e.target._latlng.lat;
            this.longtitude = e.target._latlng.lng; //event returns lat lng of dragged position
            mk.setLatLng(pt); /*set marker position to dragged position*/
            console.log(e);
        });
        this.marker.push(mk);
        this.map.setView(mk.getLatLng()); /*get the wgs locaton from marker and set the location into center*/
    };
    MapviewscreenPage.prototype.addMarker = function (position, icon, title, draggable) {
        /* position must be instance of L.LatLng that replaces current WGS position of this object. Will always return current WGS position.*/
        if (icon == '') {
            var mk = new L.Marker(position, {
                draggable: draggable,
                title: title
            }); /*marker with a default icon and optional param draggable, title */
            mk.bindPopup(title);
        }
        else {
            var mk = new L.Marker(position, {
                icon: icon,
                draggable: draggable,
                title: title
            }); /*marker with a custom icon */
            mk.bindPopup(title);
        }
        this.map.addLayer(mk); /*add the marker to the map*/
        /* marker events:*/
        mk.on("click", function (e) {
        });
        return mk;
    };
    MapviewscreenPage.prototype.getLatitudeLongitude = function (address) {
        var _this = this;
        this.getlatlong.getLatitudeLongitude(address).then(function (results) {
            var res = results;
            console.log(results[0].geometry.location.lat());
            _this.cust_lat = results[0].geometry.location.lat();
            _this.cust_long = results[0].geometry.location.lng();
            console.log(_this.cust_lat);
            console.log(_this.cust_long);
            _this.addmarkerBy_latlong(_this.cust_lat, _this.cust_long);
        });
    };
    MapviewscreenPage.prototype.mapNavigation = function () {
        console.log(this.latitude);
        console.log(this.cust_lat);
        if (this.latitude != this.cust_lat && this.cust_lat != "" && this.latitude != "") {
            alert('inside navigation');
            var lat_long = this.latitude + ',' + this.longtitude;
            var cust_location = this.cust_lat + ',' + this.cust_long;
            var options = {
                start: lat_long,
                app: this.launchNavigator.APP.GOOGLE_MAPS
            };
            this.launchNavigator.navigate(cust_location, options)
                .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
        }
        else {
            alert('You are at same place');
        }
    };
    MapviewscreenPage.prototype.saveLocation = function () {
        var latitude_desc = "";
        var longitude_desc = "";
        if (this.address_details.addresstype == "C") {
            latitude_desc = 'comm_latitude';
            longitude_desc = 'comm_longitude';
        }
        if (this.address_details.addresstype == "E") {
            latitude_desc = 'empl_latitude';
            longitude_desc = 'empl_longitude';
        }
        if (this.address_details.addresstype == "P") {
            latitude_desc = 'prop_latitude';
            longitude_desc = 'prop_longitude';
        }
        this.udatecustomer(latitude_desc, longitude_desc);
        if (this.network.type != 'none') {
            var loading = this.loadingCtrl.create({
                content: 'Please wait..',
                spinner: 'crescent'
            });
            loading.present();
            this.UploadLatLong();
            alert("uploaded");
            loading.dismiss();
        }
        else {
            alert("Pls check the connection...");
        }
    };
    MapviewscreenPage.prototype.udatecustomer = function (latitude_desc, longitude_desc) {
        this.dbProvider.UpdateCustomerDetails(this.address_details.file_no, latitude_desc, longitude_desc, this.address_details.capacity, this.latitude, this.longtitude, this.address_details.srno)
            .then(function (res) {
            console.log('updated in UpdateCustomerDetails');
        });
    };
    MapviewscreenPage.prototype.ionViewDidLoad = function () {
        this.getuserid();
        this.getSessionId();
        // setTimeout(()=>{    //<<<---    using ()=> syntax
        //      if(this.address_details.latitude==undefined || this.address_details.latitude==""){
        //           // this.address_edit=this.address_details.address.split("Mobile")
        //            this.address_edit=this.address_details.address.split("Mobile")[0];
        //            //this.address_details.address;
        //            //this.address_details.address;
        //            console.log(this.address_edit);
        //             this.getLatitudeLongitude(this.address_details.address);
        // 		 	}
        //      else
        //      {
        // 		     this.cust_lat=this.address_details.latitude;
        //         this.cust_long=this.address_details.longitude;
        //         this.addmarkerBy_latlong(this.cust_lat,this.cust_long);
        // 	    }
        //      this.address_edit=this.address_details.address.split("Mobile")[0];
        // 	       //this.address_edit=this.address_details.address.split("Mobile")
        // }, 4000);
    };
    MapviewscreenPage.prototype.testaddress = function () {
        this.getLatitudeLongitude(this.address_edit);
    };
    MapviewscreenPage.prototype.mapmyindia_removeMarker = function () {
        var markerlength = this.marker.length;
        if (markerlength > 0) {
            for (var i = 0; i < markerlength; i++) {
                this.map.removeLayer(this.marker[i]); /* deletion of marker object from the map */
            }
        }
        delete this.marker;
        this.marker = [];
    };
    MapviewscreenPage.prototype.setLatlong = function (latitude, longitude) {
        console.log(latitude);
        this.latitude = latitude;
        this.longtitude = longitude;
    };
    MapviewscreenPage.prototype.addmarkerBy_latlong = function (latitude, longitude) {
        this.mapmyindia_removeMarker();
        var mk = this.addMarker([latitude, longitude], '', "Customer location", true); /*call the add marker function*/
        mk.on("dragstart", function (e) { });
        mk.on("dragend", function (e) {
            var pt = e.target._latlng;
            this.latitude = e.target._latlng.lat;
            this.longtitude = e.target._latlng.lng;
            this.setLatlong(this.latitude, this.longtitude);
            /*event returns lat lng of dragged position*/
            mk.setLatLng(pt); /*set marker position to dragged position*/
            console.log(e);
        });
        this.marker.push(mk);
        this.map.setView(mk.getLatLng());
    };
    MapviewscreenPage.prototype.plot = function () {
        var _this = this;
        this.mapmyindia_removeMarker();
        if (this.network.type != 'none') {
            this.geolocation.getCurrentPosition().then(function (resp) {
                console.log(resp);
                _this.latitude = resp.coords.latitude;
                _this.longtitude = resp.coords.longitude;
                _this.cust_lat = _this.latitude;
                _this.cust_long = _this.longtitude;
                var mk = _this.addMarker([_this.latitude, _this.longtitude], '', "Customer location", false); /*call the add marker function*/
                mk.on("dragstart", function (e) { });
                mk.on("dragend", function (e) {
                    var pt = e.target._latlng;
                    this.latitude = this.longtitude = e.target._latlng.lat;
                    this.longtitude = e.target._latlng.lng;
                    this.latitude = e.target._latlng.lat;
                    this.longtitude = e.target._latlng.lng;
                    this.setLatlong(this.latitude, this.longtitude); /*event returns lat lng of dragged position*/
                    mk.setLatLng(pt); /*set marker position to dragged position*/
                    console.log(e);
                });
                _this.marker.push(mk);
                _this.map.setView(mk.getLatLng());
            }).catch(function (error) {
                alert(JSON.stringify(error));
                console.log('Error getting location', error);
            });
        }
        else {
            console.log("Keep Your Internet On");
        }
    };
    MapviewscreenPage.prototype.ionViewWillEnter = function () {
        this.events.publish('hideHeader', { footerstatus: false, lac: "", borrname: "" }); //for hiding footer
    };
    MapviewscreenPage.prototype.ionViewWillLeave = function () {
        this.events.publish('hideHeader', { footerstatus: true, lac: this.LacNo, borrname: this.borrname }); //for hiding footer
    };
    MapviewscreenPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mapviewscreen',
            templateUrl: 'mapviewscreen.html',
        }),
        __metadata("design:paramtypes", [Geolocation,
            ModalController,
            LaunchNavigator,
            NavController,
            Network,
            ToastController,
            DbProvider,
            NavParams,
            RestProvider,
            LoadingController,
            GetLatLongProvider,
            Events])
    ], MapviewscreenPage);
    return MapviewscreenPage;
}());
export { MapviewscreenPage };
//# sourceMappingURL=mapviewscreen.js.map