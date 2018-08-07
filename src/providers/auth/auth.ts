import {Injectable} from '@angular/core';
import {StorageProvider} from "../storage/storage";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

    constructor(private storage: StorageProvider) {
        console.log('Hello AuthProvider Provider');
    }

    setAuth(data, auth) {
        this.storage.set('auth_data', data);
        this.storage.set('user_data', auth);
    }

    setAuth_mpin(val: any){
        this.storage.set('MPIN',val);
    }

    getAuth_mpin(val: any){
        //this.storage.get('MPIN');
        return this.storage.get('MPIN');
    }

    setUserData(auth) {
        // this.storage.set('auth_data', data);
        this.storage.set('user_data', auth);
    }

    checkAuth() {
        return this.getAuthToken() != null;
    }

    getAuthToken() {
        return this.storage.getJson('auth_data')
    }

    getUserName() {
        return this.storage.getJson('user_data.username');
    }

    getUserData() {
        return this.storage.getJson('user_data');
    }

    logout() {
        this.storage.remove('auth_data');
        console.log('authentication data removed')
    }
}
