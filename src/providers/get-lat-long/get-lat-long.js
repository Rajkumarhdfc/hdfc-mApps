var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the GetLatLongProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GetLatLongProvider = /** @class */ (function () {
    function GetLatLongProvider(http) {
        this.http = http;
        console.log('Hello GetLatLongProvider Provider');
    }
    GetLatLongProvider.prototype.getLatitudeLongitude = function (address) {
        return new Promise(function (resolve, reject) {
            // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
            address = address || 'Mumbai,South,Churchgate';
            // Initialize the Geocoder
            var geocoder = new google.maps.Geocoder();
            var results = geocoder.geocode({
                'address': address
            }, function (results, status) {
                console.log(results);
                console.log(status);
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results.length > 0) {
                        console.log(results[0].geometry.location.lat());
                        this.cust_lat = results[0].geometry.location.lat();
                        this.cust_long = results[0].geometry.location.lng();
                        // callback(results[0]);
                        //alert('success');
                        //                 	var mk = this.addMarker([this.latitude,this.longitude], '', "Customer location", true); /*call the add marker function*/
                        // mk.on("dragstart", function(e) {});
                        // mk.on("dragend", function(e) {
                        // var pt = e.target._latlng; /*event returns lat lng of dragged position*/
                        // mk.setLatLng(pt); /*set marker position to dragged position*/
                        // console.log(e);
                        // });
                        // this.marker.push(mk);
                        // this.map.setView(mk.getLatLng()); 
                    }
                    else {
                        alert('No geo code found,so pls edit the addres and check..');
                    }
                    console.log(results);
                    resolve(results);
                }
                else {
                    console.log(results);
                }
            });
            debugger;
            console.log(results);
        });
    };
    GetLatLongProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], GetLatLongProvider);
    return GetLatLongProvider;
}());
export { GetLatLongProvider };
//# sourceMappingURL=get-lat-long.js.map