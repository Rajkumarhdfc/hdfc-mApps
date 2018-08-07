import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from "../auth/auth";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiProvider {
    //  url: string = 'https://mapiuat.hdfc.com/MowblyDMZ_WS_uat3/Service.asmx';
    //  url: string = 'https://applicationsuat.hdfc.com/webservices/public/api/v1';
    url: string = 'http://apigatewayuat.hdfc.com/api/User_Login';
    urlOTP: string = 'http://apigatewayuat.hdfc.com/api/Verify_OTP';
    urlLogout: string = 'http://apigatewayuat.hdfc.com/api/Logout_User';
    //userType: string = 'HSALES';
    userType: string = 'HDFC';

    constructor(public http: HttpClient, private auth: AuthProvider) {
        console.log('Hello ApiProvider Provider');
    }

    get(endpoint: string, params?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get(this.url + '/' + endpoint, reqOpts);
    }

    post(endpoint: string, body?: any, reqOpts: any = {}, auth_header: string = null) {

        let headers = new HttpHeaders().set('Accept', 'application/json');
        // if (auth_header) {
        //     headers = new HttpHeaders().set('Accept', 'application/json')
        //         .append('Authorization', 'Bearer ' + auth_header);
        // }

        let body1 = new HttpParams()
            .set('ApplicationId', body.ApplicationId)
            .set('Password', body.Password)
            .set('UserID', body.UserID);


        return this.http.post('https://mapiuat.hdfc.com/MowblyDMZ_WS_uat3/Service.asmx/Authenticate_v2',
            body1.toString(),
            {
                headers: new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                , responseType: 'text'
            }
        );

        //   reqOpts.headers = headers;
        //  return this.http.post(this.url + '/' + endpoint, body);
    }

    postA(endpoint: string, body?: any, reqOpts: any = {}, auth_header: string = null) {

        let headers = new HttpHeaders().set('Accept', 'application/json');
        let body1 = new HttpParams()
            .set('APP_VERSION', body.APP_VERSION)
            .set('USER_TYPE', body.USER_TYPE)
            .set('USER_ID', body.USER_ID)
            .set('PASSWORD', body.PASSWORD)
            .set('DEVICE_INFO_JSON', body.DEVICE_INFO_JSON)
            .set('NOTIFICATION_ID', body.NOTIFICATION_ID);

        return this.http.post(this.url,
            body1.toString(),
            {
                headers: new HttpHeaders()
                    //.set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('Content-Type', 'application/json')
                    .set('Access-Control-Allow-Origin', '*')
                    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
                //.set('withCredentials', 'true')
                , responseType: 'text',
            }
        );

    }

    postLogin(apiUrl: string, body: any = {}) {
        debugger;
        let body1 = new HttpParams()
            .set('APP_VERSION', body.APP_VERSION)
            .set('USER_TYPE', body.USER_TYPE)
            .set('USER_ID', body.USER_ID)
            .set('PASSWORD', body.PASSWORD)
            .set('DEVICE_INFO_JSON', body.DEVICE_INFO_JSON)
            .set('NOTIFICATION_ID', body.NOTIFICATION_ID);


        return this.http.post(this.url,
            body1
        ).map((response: Response) => {
            debugger;
            console.log('resp: ' + response);
            return response;
        });
    }

    verifyOTP(apiUrl: string, body: any = {}) {
        debugger;
        let body1 = new HttpParams()
            .set('OTP_CODE', body.OTP_CODE)
            .set('USER_TYPE', body.USER_TYPE)
            .set('USER_ID', body.USER_ID)
            .set('DEVICE_INFO_JSON', body.DEVICE_INFO_JSON)
            .set('NOTIFICATION_ID', body.NOTIFICATION_ID);


        return this.http.post(this.urlOTP,
            body1
        ).map((response: Response) => {
            debugger;
            console.log('resp: ' + response);
            return response;
        });
    }

    postWithAuth(endpoint: string, body?: any, reqOpts?: any) {

        if (!reqOpts) {
            reqOpts = {};
        }

        reqOpts.headers = new HttpHeaders().set('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + this.auth.getAuthToken());
        // reqOpts.observe = 'response';
        // reqOpts.responseType = 'text';
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    }

    postWithAuthAndUserId(endpoint: string, body?: any, reqOpts?: any) {

        if (!reqOpts) {
            reqOpts = {};
        }

        if (!body) {
            body = {};
        }

        body['user_id'] = this.auth.getUserName();

        reqOpts.headers = new HttpHeaders().set('Accept', 'application/json')
            .append('Authorization', 'Bearer ' + this.auth.getAuthToken());
        // reqOpts.observe = 'response';
        // reqOpts.responseType = 'text';
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    custom(type: any, endpoint: string, body?: any, reqOpts?: any) {
        return this.http.request(new HttpRequest(type, this.url + '/' + endpoint, body, reqOpts));
    }

    requestTest(request) {
        this.custom('POST', 'login', [], {
            reportProgress: true
        }).subscribe((req) => {
            console.log(req);
        });
    }

    getUserType(){
        return this.userType;
    }


    logOut(apiUrl: string, body: any = {}) {
        debugger;
        let body1 = new HttpParams()
            .set('USER_TYPE', body.USER_TYPE)
            .set('USER_ID', body.USER_ID)
            .set('SESSION_ID', body.SESSION_ID);

        return this.http.post(this.urlLogout,
            body1
        ).map((response: Response) => {
            debugger;
            console.log('resp: ' + response);
            return response;
        });
    }
}
