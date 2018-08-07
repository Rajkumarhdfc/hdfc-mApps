import { Device } from '@ionic-native/device';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DeviceProvider {

  constructor(public http: HttpClient, private device: Device) {
    console.log('Hello DeviceProvider Provider');
  }

  getDeviceData(){
    return this.device;
  }

  getDeviceInfo(){
    let device_info = {
      "DEVICE_ID": "123",//this.deviceDetails.serial,
      "DEVICE_NAME": "iphone",//this.deviceDetails.manufacturer,
      "DEVICE_MODEL": "123",//this.deviceDetails.model,
      "LATTITUDE": "19.54564",//this.geoData.latitude
      "LONGITUDE": "72.465",//this.geoData.longitude
      "DEVICE_OS": "ios",//this.deviceDetails.platform,
      "DEVICE_OS_VERSION": "5.4",//this.deviceDetails.version,
      "DEVICE_NETWORK_MODE": "wifi"
    }
    return device_info;
  }
  // getDevice_Cordova(){
  //   return this.device.cordova;
  // }

  // getDevice_Model(){
  //   return this.device.model;
  // }

  // getDevice_Platform(){
  //   return this.device.platform;
  // }

  // getDevice_UUID(){
  //   return this.device.uuid;
  // }

  // getDevice_OSver(){
  //   return this.device.version;
  // }  

  // getDevice_Manufacturer(){
  //   return this.device.manufacturer;
  // }

  // getDevice_isVirtual(){
  //   return this.device.isVirtual;
  // }

  // getDevice_serial(){
  //   return this.device.serial;
  // }
}
