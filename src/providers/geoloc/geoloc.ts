import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GeolocProvider {

  constructor(public http: HttpClient, private geo: Geolocation, private store: Storage) {
    console.log('Hello GeolocProvider Provider');
    this.geo.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('resp: '+JSON.stringify(resp.coords));
      return resp.coords;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async getLatLong(){
    debugger;
    let response;
    await this.geo.getCurrentPosition().then((resp) => {
      //console.log('resp: '+JSON.stringify(resp.coords.latitude)); 
      //console.log('resp: '+resp.coords.longitude);
      //return resp.coords;
      response = resp.coords;
      //this.store.set('coord',response);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    return response;
  }
}
