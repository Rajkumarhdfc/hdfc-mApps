import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http'; 

declare var google;
/*
  Generated class for the GetLatLongProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetLatLongProvider {
httpOptions = {headers: new HttpHeaders({"Content-Type" : "application/x-www-form-urlencoded"})}; 

  constructor(public http: HttpClient) {
    console.log('Hello GetLatLongProvider Provider');



  }
   getLatitudeLongitude(address) {
debugger;
return new Promise((resolve,reject)=>{
	     var zipcode = address.match(/(?:^|\D)(\d{6})(?=\D|$)/g)
            console.log(zipcode);
            if (zipcode != null  ) {
            address= zipcode[0].trim();

              //  address = address.substring(0, address.indexOf(zipcode) + 7);
                console.log(address)
            } 

var headers = new Headers(); 
headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

this.http 
.get('https://apis.mapmyindia.com/advancedmaps/v1/fugx2ugzjsi9zuszr914ncig1u9jra17/geo_code?addr='+address, this.httpOptions) 
.subscribe(jsondata => { 
  console.log(jsondata);

        if (jsondata['responseCode'] == 200 && jsondata['results'].length !== 0) { 
                //route_api_result(jsondata.results); 
         

                var result={
                  lat:jsondata['results'][0].lat,
                  lang:jsondata['results'][0].lng
                }

                resolve(result)

              }else{
                   console.log('no response')

                   result={lat:"",lang:""};
              //  var error_response = "No response from API Server. Kindly check the api keys or requested server urls."; 
                   resolve(result)
              }
 
//alert('ok'); 

}, error => { 
  console.log(error);
              reject(error);
console.log(JSON.stringify(error)); 
}); 

   
    })
}



}


		// If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    //address = address || 'Mumbai,South,Churchgate';
    // Initialize the Geocoder
    // var geocoder = new google.maps.Geocoder();

    //  var results= geocoder.geocode({
    //         'address': address
    //     }, function(results, status) {
    //         console.log(results);
    //         console.log(status);
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             if(results.length>0){
    //               console.log(results[0].geometry.location.lat());
    //                  this.cust_lat = results[0].geometry.location.lat();
    //                 this.cust_long = results[0].geometry.location.lng();
                         
                        
                  

    // 				// callback(results[0]);
                
    				
    //                //alert('success');
    // //                 	var mk = this.addMarker([this.latitude,this.longitude], '', "Customer location", true); /*call the add marker function*/
    // // mk.on("dragstart", function(e) {});
    // // mk.on("dragend", function(e) {
    // // var pt = e.target._latlng; /*event returns lat lng of dragged position*/
    // // mk.setLatLng(pt); /*set marker position to dragged position*/
    // // console.log(e);
    // // });

    // // this.marker.push(mk);
    // // this.map.setView(mk.getLatLng()); 
    //             }
    //             else{
    //               alert('No geo code found,so pls edit the addres and check..');
    //             }
    //             console.log(results);
    //              resolve(results);
               
    //         } else
    //          {
    //           console.log(results);
    //         }
    //     });
    
     //debugger;
     //console.log(results);




    
   
