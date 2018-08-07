import {Injectable} from '@angular/core';

import {LocalStorageService} from "angular-2-local-storage";

/*
 Generated class for the StorageProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class StorageProvider {

    constructor(private storage: LocalStorageService) {
        console.log('Hello StorageProvider Provider');
    }

    set(key: string, value: any) {
        this.storage.set(key, value);
    }

    getValue(key: string) {
        return this.storage.get('user_data');
    }

    getVal(key: string){
        return this.storage.get('user_data');
    }

    get(key: string) {
        return this.storage.get(key);
    }

    getJson(key: string) {
        let value = key.split('.');
        if (value.length === 1) {
            return this.storage.get(value[0]);
        } else if (value.length === 2) {
            try {
                return (this.storage.get(value[0]))[value[1]];
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    remove(key: string) {
        this.storage.remove(key);
    }
}
