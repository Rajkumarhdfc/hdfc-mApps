import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbProvider } from '../../providers/db/db';

@Injectable()
export class RestProvider {

//apiUrl = "https://mapiuat.hdfc.com/PDA_SYNC_DMZ_V1/api/pda";

apiUrl = "https://mapi.hdfc.com/PDA_SYNC_DMZ_API/api/pda";

	sApplicationID = "3";
	sVersion = "3";
	loginObj: any;
	startSyncObj: any;
	ldapid:any;

	httpOptions = {headers: new HttpHeaders({"Content-Type" : "application/x-www-form-urlencoded"})};

	constructor(public http: HttpClient,public dbProvider:DbProvider) {
		this.loginObj={"userID":""};
		this.dbProvider.sSelectApp_MasterScript().then((res)=>{
		this.loginObj.userID= res['rows']['item'](0)['UserID'];
		this.ldapid=res['rows']['item'](0)['UserID'];
		console.log(this.ldapid);
	   })
	   console.log('Hello RestProvider Provider');
	}

/*************************************************** Used For Login ***********************************************/

	authUser(data){		
	  	return new Promise((resolve,reject) => {
		  	const body = new HttpParams().set("sUserID" ,data.userID)
		  								 		  .set("sApplicationID" , "3")
									  			  .set("sIMEINo" , "")
									  		 	  .set("sDeviceToken" , "");
		  	
		  	this.http.post(this.apiUrl + '/authenticateUser', body.toString(), this.httpOptions).subscribe(res => 
				{	
					this.loginObj = data; 					
					resolve(res);				
			   	}, (err) => 
			   	{
		        	console.log("ERROR");
			        console.log(err);
			        reject(err);
			    }
			);
	  	});
	}

	/*********************************** Used For Session ID and Table List ************************************************/

	generateToken(data){		
	  	return new Promise((resolve,reject) => {
			this.dbProvider.sSelectApp_MasterScript().then((res)=>{
				this.loginObj.userID= res['rows']['item'](0)['UserID'];
				this.ldapid=res['rows']['item'](0)['UserID'];
				console.log(this.ldapid);

				const body = new HttpParams().set("sUserID" , this.ldapid)
				.set("sApplicationId" , this.sApplicationID)
			  .set("sVersion" , this.sVersion)
				.set("sProcessType" , "")
				.set("sLatitude" , "")
				.set("slongitude" , "")
				.set("sReferenceSync_ID" , "");

				console.log(this.apiUrl + '/StartSync', body.toString(), this.httpOptions)
this.http.post(this.apiUrl + '/StartSync', body.toString(), this.httpOptions).subscribe(res => 
{	
this.startSyncObj = res;
console.log(this.startSyncObj);				
resolve(res);				
}, (err) => 
{
console.log("ERROR");
console.log(err);
reject(err);
}
);
			   })
			
		  
	  	});
	}

		/*********************************** Download Data ************************************************/

	downloadData(dataRow,sLastSyncOn){
		console.log(dataRow);
		return new Promise((resolve,reject) => {
		
			const body = new HttpParams().set("sUserID",this.loginObj.userID)
	  									 .set("sSessionID" ,this.startSyncObj.SYNC_INFO[0].SESSION_ID)
								  		 .set("sTableID" , dataRow.TABLE_ID)
								  		 .set("sSyncType" ,dataRow.TABLE_TYPE)
								  		 .set("sTimeStamp" , sLastSyncOn == null ? '' : sLastSyncOn);
			
			console.log( body.toString());	
			console.log(dataRow.LAST_SYNC_ON);	
			console.log(this.apiUrl + '/DownloadTable_v1', body.toString(), this.httpOptions);
			this.http.post(this.apiUrl + '/DownloadTable_v1', body.toString(), this.httpOptions).subscribe(res => 
				{
					resolve(res);		
					
				}, (err) => 
			   	{console.log("ERROR");
			      console.log(err);
			      reject(err);
			    }
			);
	  	});
		
	}


/////////////////////////////////*Upload Data*/////////////////////////////////////////////////////////////////

uploadData(table_id,records,sessionid){
	
		return new Promise((resolve,reject) => {
		
			const body = new HttpParams().set("sUserID",this.loginObj.userID)
	  									 .set("sSessionID",sessionid)
								  		 .set("sTableID" , table_id)
								  		 .set("sTableRecords",JSON.stringify(records));
			
			console.log(body.toString());	
			console.log(JSON.stringify(records));
			this.http.post(this.apiUrl + '/Upload_Table_data', body.toString(), this.httpOptions).subscribe(res => 
				{
					resolve(res);
					console.log(res);		
					
				}, (err) => 
			   	{
			   		console.log("ERROR");
			      	console.log(err);
			      	reject(err);
			    }
			);
	  	});
		
	}
	Level_Upd(lac_no,level,remark){
	
		return new Promise((resolve,reject) => {
		
			const body = new HttpParams().set("sUserID",this.loginObj.userID)
	  									 .set("LAC_NO",lac_no)
								  		 .set("LEVEL1",level)
								  		 .set("REMARK",remark);
		
			console.log(body.toString());	
			
			this.http.post(this.apiUrl + '/Set_lac_level', body.toString(), this.httpOptions).subscribe(res => 
				{
					resolve(res);
					console.log(res);		
					
				}, (err) => 
			   	{
			   		console.log("ERROR");
			      	console.log(err);
			      	reject(err);
			    }
			);
	  	});
		
	}
///////////////////////////////upload photo///////////////////////////////////////////////////////////////////////
uploadphoto(fileno,ldapid,propno,img_filename,sessionid,base64Image){
	return new Promise((resolve,reject) => {
	var	httpOptions2 = {headers: new HttpHeaders({"Content-Type" : "application/json"})};

//////////////passing the data in json format////////////////////////////////////////
	
	var data={
	"APPLICATION_ID":this.sApplicationID,
	"FILE_NAME": img_filename,
	"USER_ID": ldapid,
	"SESSION_ID":sessionid,
	"KEY1": fileno,
	"KEY2": propno,
	"KEY3": "",
	"KEY4": "",
	"KEY5": "",
	"DocBuffer":base64Image
		}
		this.http.post(this.apiUrl + '/Upload_Document_V2', JSON.stringify(data), httpOptions2).subscribe(res => 
				{
					resolve(res);
				}, (err) => 
			   	{
			   		console.log("ERROR");
			      	console.log(err);
			      	reject(err);
			    }
			);
	  	});
	}

/////////////////////////////////View Docs//////////////////////////////////////////////////////////////////

ViewDocs(filename,pdf_flag){
	return new Promise((resolve,reject) => {
	var	httpOptions3 = {headers: new HttpHeaders({"Content-Type" : "application/json"})};

//////////////passing the data in json format////////////////////////////////////////

	var data1={
	"FILE_NAME":filename,
	"PDF_FLAG":pdf_flag
		}
		this.http.post(this.apiUrl + '/GetPDFDocument', JSON.stringify(data1), httpOptions3).subscribe(res => 
				{
					resolve(res);
				}, (err) => 
			   	{
			   		console.log("ERROR");
			      	console.log(err);
			      	reject(err);
			    }
			);
	  	});
	}
//////////////////////////////////GeoLocation map/////////////////////////////////////////////////////
LatLngMap(data){
	return new Promise((resolve,reject) => {
	var	httpOptions4 = {headers: new HttpHeaders({"Content-Type" : "application/json"})};
      
//////////////passing the data in json format////////////////////////////////////////
	console.log(data);
	this.http.post(this.apiUrl + '/InsertAddressLatlong', JSON.stringify(data), httpOptions4).subscribe(res => 
				{
					resolve(res);
					console.log(res);

				}, (err) => 
			   	{
			   		console.log("ERROR");
			      	console.log(err);
			      	reject(err);
			    }
			);
	  	});
}



///////////////////////////remarks upload/////////////////////////////////////////////////////////////////
	RemarksUpload(ldapid,remarks,mobileno){
		return new Promise((resolve,reject) => {
		
			const body = new HttpParams().set("USER_ID",ldapid)
	  									 .set("REMARKS",remarks)
	  									 .set("MOBILE_NO",mobileno)
		
			console.log(body.toString());	
			this.http.post(this.apiUrl + '/InsertRemarks', body.toString(), this.httpOptions).subscribe(res => 
				{
					resolve(res);
					console.log(res);		
					
				}, (err) => 
			   	{
			   		console.log("ERROR");
			      	console.log(err);
			      	reject(err);
			    }
			);
	  	});
	}
	
}