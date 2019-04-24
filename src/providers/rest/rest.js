var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbProvider } from '../../providers/db/db';
var RestProvider = /** @class */ (function () {
    function RestProvider(http, dbProvider) {
        this.http = http;
        this.dbProvider = dbProvider;
        this.apiUrl = "https://mapiuat.hdfc.com/PDA_SYNC_DMZ_V1/api/pda";
        //apiUrl = "https://192.168.10.72/PDA_SYNC_DMZ_V1/api/pda";
        this.sApplicationID = "3";
        this.sVersion = "3";
        this.httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" }) };
        console.log('Hello RestProvider Provider');
    }
    /*************************************************** Used For Login ***********************************************/
    RestProvider.prototype.authUser = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = new HttpParams().set("sUserID", data.userID)
                .set("sApplicationID", "3")
                .set("sIMEINo", "")
                .set("sDeviceToken", "");
            _this.http.post(_this.apiUrl + '/authenticateUser', body.toString(), _this.httpOptions).subscribe(function (res) {
                _this.loginObj = data;
                resolve(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    /*********************************** Used For Session ID and Table List ************************************************/
    RestProvider.prototype.generateToken = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = new HttpParams().set("sUserID", _this.loginObj.userID)
                .set("sApplicationId", _this.sApplicationID)
                .set("sVersion", _this.sVersion)
                .set("sProcessType", "")
                .set("sLatitude", "")
                .set("slongitude", "")
                .set("sReferenceSync_ID", "");
            _this.http.post(_this.apiUrl + '/StartSync', body.toString(), _this.httpOptions).subscribe(function (res) {
                _this.startSyncObj = res;
                console.log(_this.startSyncObj);
                resolve(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    /*********************************** Download Data ************************************************/
    RestProvider.prototype.downloadData = function (dataRow, sLastSyncOn) {
        var _this = this;
        console.log(dataRow);
        return new Promise(function (resolve, reject) {
            var body = new HttpParams().set("sUserID", _this.loginObj.userID)
                .set("sSessionID", _this.startSyncObj.SYNC_INFO[0].SESSION_ID)
                .set("sTableID", dataRow.TABLE_ID)
                .set("sSyncType", dataRow.TABLE_TYPE)
                .set("sTimeStamp", sLastSyncOn == null ? '' : sLastSyncOn);
            console.log(body.toString());
            console.log(dataRow.LAST_SYNC_ON);
            _this.http.post(_this.apiUrl + '/DownloadTable_v1', body.toString(), _this.httpOptions).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    /////////////////////////////////*Upload Data*/////////////////////////////////////////////////////////////////
    RestProvider.prototype.uploadData = function (table_id, records, sessionid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = new HttpParams().set("sUserID", _this.loginObj.userID)
                .set("sSessionID", sessionid)
                .set("sTableID", table_id)
                .set("sTableRecords", JSON.stringify(records));
            console.log(body.toString());
            console.log(JSON.stringify(records));
            _this.http.post(_this.apiUrl + '/Upload_Table_data', body.toString(), _this.httpOptions).subscribe(function (res) {
                resolve(res);
                console.log(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    RestProvider.prototype.Level_Upd = function (lac_no, level, remark) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = new HttpParams().set("sUserID", _this.loginObj.userID)
                .set("LAC_NO", lac_no)
                .set("LEVEL1", level)
                .set("REMARK", remark);
            console.log(body.toString());
            _this.http.post(_this.apiUrl + '/Set_lac_level', body.toString(), _this.httpOptions).subscribe(function (res) {
                resolve(res);
                console.log(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    ///////////////////////////////upload photo///////////////////////////////////////////////////////////////////////
    RestProvider.prototype.uploadphoto = function (fileno, ldapid, propno, img_filename, sessionid, base64Image) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions2 = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
            //////////////passing the data in json format////////////////////////////////////////
            var data = {
                "APPLICATION_ID": _this.sApplicationID,
                "FILE_NAME": img_filename,
                "USER_ID": ldapid,
                "SESSION_ID": sessionid,
                "KEY1": fileno,
                "KEY2": propno,
                "KEY3": "",
                "KEY4": "",
                "KEY5": "",
                "DocBuffer": base64Image
            };
            _this.http.post(_this.apiUrl + '/Upload_Document_V2', JSON.stringify(data), httpOptions2).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    /////////////////////////////////View Docs//////////////////////////////////////////////////////////////////
    RestProvider.prototype.ViewDocs = function (filename, pdf_flag) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions3 = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
            //////////////passing the data in json format////////////////////////////////////////
            var data1 = {
                "FILE_NAME": filename,
                "PDF_FLAG": pdf_flag
            };
            _this.http.post(_this.apiUrl + '/GetPDFDocument', JSON.stringify(data1), httpOptions3).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    //////////////////////////////////GeoLocation map/////////////////////////////////////////////////////
    RestProvider.prototype.LatLngMap = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var httpOptions4 = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
            //////////////passing the data in json format////////////////////////////////////////
            console.log(data);
            _this.http.post(_this.apiUrl + '/InsertAddressLatlong', JSON.stringify(data), httpOptions4).subscribe(function (res) {
                resolve(res);
                console.log(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    ///////////////////////////remarks upload/////////////////////////////////////////////////////////////////
    RestProvider.prototype.RemarksUpload = function (ldapid, remarks, mobileno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = new HttpParams().set("USER_ID", ldapid)
                .set("REMARKS", remarks)
                .set("MOBILE_NO", mobileno);
            console.log(body.toString());
            _this.http.post(_this.apiUrl + '/InsertRemarks', body.toString(), _this.httpOptions).subscribe(function (res) {
                resolve(res);
                console.log(res);
            }, function (err) {
                console.log("ERROR");
                console.log(err);
                reject(err);
            });
        });
    };
    RestProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, DbProvider])
    ], RestProvider);
    return RestProvider;
}());
export { RestProvider };
//# sourceMappingURL=rest.js.map