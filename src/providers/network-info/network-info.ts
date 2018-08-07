import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

/*
  Generated class for the NetworkInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkInfoProvider {
  disconnectSubscription: any;
  connectSubscription: any;
  constructor(public http: HttpClient, private network: Network) {
    console.log('Hello NetworkInfoProvider Provider');
  }

  network_watchDisconnect(){
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });
  }

  network_stopWatchDisconnect(){
    this.disconnectSubscription.unsubscribe();
  }

  network_watchConnect(){
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
  }

  network_stopWatchConnect(){
    this.connectSubscription.unsubscribe();
  }
}
