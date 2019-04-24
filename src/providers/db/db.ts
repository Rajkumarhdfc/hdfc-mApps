import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { TableListPage } from '../../pages/table-list/table-list';
import { LacDetailsPage } from '../../pages/lac-details/lac-details';

@Injectable()
export class DbProvider {
    
	options: any = {
		name : 'recoveryDB.db',
		location : 'default'
	}
	items: any;
	tableItems=[];
	userid:any;
	topreminders=[];
	sessionid:any;
	tableItems_v1 = [];
	reminders=[];
	NEW_COMMN_DETAILS=[];
	NEW_FU_ACTION=[];
	NEW_PROP_CLASS=[];
	upload_data=[];
	top_three_table_items=[]
	top_level_try=[];
	count_to_bas=[];
	diff_result=[];
	tableScript =    
	        [
	         { TableId : 202 , TableName: 'PDANEW_PMI_TRANS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_PMI_TRANS (tran_dt NUMERIC,rcbl NUMERIC, rcvd NUMERIC, os NUMERIC, tr_type TEXT, doc_no TEXT, effective_dt NUMERIC, pay_mode TEXT,tr_desc TEXT, bank_nm TEXT, bnc_reason TEXT, ldap_id TEXT, deleted_flag TEXT,timestamp NUMERIC, srno NUMERIC, lac_no NUMERIC)"},
	         { TableId : 203 , TableName:'PDANEW_LAC_REMARKS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_REMARKS (LAC_NO NUMERIC, REMARKS TEXT, LAST_UPD NUMERIC, SRNO NUMERIC, deleted_flag TEXT, timestamp NUMERIC, ldap_id TEXT, OPR_ID TEXT)"},
	         { TableId : 204 , TableName:'PDANEW_LAC_FU_ACTION', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_FU_ACTION (ldap_id TEXT, lac_no NUMERIC, action TEXT, date_of_action NUMERIC, def_observ TEXT, remark TEXT, deleted_flag TEXT, timestamp NUMERIC, opr_id TEXT, response TEXT, srno NUMERIC, promised_amt NUMERIC, promised_dt NUMERIC)"},
	         { TableId : 205 , TableName:'PDANEW_LAC_DETAILS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_DETAILS (lac_no NUMERIC, loan_amt NUMERIC, cumdisb NUMERIC, bal_term NUMERIC, roi NUMERIC, gr_no NUMERIC,  origin_branch NUMERIC, origin_place TEXT, thru_whom TEXT, rcd_dt NUMERIC, last_rcbl_updt NUMERIC, normal_pay_mode TEXT, yob_pr_emi NUMERIC, yob_pr_pmi NUMERIC, yob_pr_bp NUMERIC, cur_pr_emi NUMERIC, cur_pr_pmi NUMERIC, cur_pr_bp NUMERIC, emi NUMERIC, last_pmi_recble NUMERIC, ly_os_emi NUMERIC, ly_os_pmi NUMERIC, ly_os_add_int NUMERIC, ly_os_mr NUMERIC, ly_os_ppc NUMERIC, ly_os_si NUMERIC, emi_recble NUMERIC, pmi_recble NUMERIC, add_int_recble NUMERIC, mr_recble NUMERIC, ppc_recble NUMERIC, si_recble NUMERIC, emi_recd NUMERIC, pmi_recd NUMERIC, add_int_recd NUMERIC, mr_recd NUMERIC, ppc_recd NUMERIC, si_recd NUMERIC, emi_curos NUMERIC, pmi_curos NUMERIC, add_curos NUMERIC, mr_curos NUMERIC, cur_ppcos NUMERIC, cur_sios NUMERIC, os_months_emi NUMERIC, os_months_pmi NUMERIC, prop_class TEXT, customer_grade TEXT, payment_type TEXT, fraud_ind TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC, ldap_id TEXT, last_tr_dt NUMERIC, sanction NUMERIC, ly_os_tot NUMERIC, tot_recble NUMERIC, tot_recd NUMERIC, tot_curos NUMERIC, tot_pemi_os NUMERIC, tot_emi_os NUMERIC, tot_addint_os NUMERIC, tot_ppc_os NUMERIC, tot_si_os NUMERIC, tot_mr_os NUMERIC, group_name TEXT, asset_classification TEXT)"},
	         { TableId : 206 , TableName:'PDANEW_EMI_TRANS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_EMI_TRANS (tran_dt NUMERIC, rcbl NUMERIC, rcvd NUMERIC, os NUMERIC, tr_type TEXT, doc_no TEXT, effective_dt NUMERIC, pay_mode TEXT, tr_desc TEXT, bank_nm TEXT, bnc_reason TEXT, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC, lac_no NUMERIC)"},
	         { TableId : 207 , TableName:'PDANEW_DISB_DETAILS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_DISB_DETAILS (lac_no NUMERIC, file_no NUMERIC, disb_no NUMERIC, doc_no NUMERIC, doc_dt NUMERIC, doc_amt NUMERIC, payable_to TEXT, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC, disb_dt NUMERIC, status TEXT)"},
	         { TableId : 208 , TableName:'PDANEW_CUSTOMER_ADDRESS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_CUSTOMER_ADDRESS (cust_number NUMERIC, file_no NUMERIC, capacity TEXT,  cust_name TEXT, branch_code NUMERIC, addr_type TEXT, addr_line1 TEXT, addr_line2 TEXT, addr_line3 TEXT, addr_line4 TEXT, city TEXT, pincode NUMERIC, tel_no TEXT, designation TEXT, spec_addr TEXT, mobile_no TEXT, email TEXT, employ_no TEXT, comp_name1 TEXT, comp_name2 TEXT, branch TEXT, dept TEXT, btel_no1 TEXT, btel_no2 TEXT, btel_no3 , ext_no TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC, ldap_id TEXT, emp_since TEXT)"},
	         { TableId : 233 , TableName:'PDANEW_COMM_OTH_DETAILS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_COMM_OTH_DETAILS (lac_no NUMERIC, name TEXT, relation TEXT, address1 TEXT, address2 TEXT, mobile1 TEXT, mobile2 TEXT, email_id TEXT, off_tel_no TEXT, res_tel_no TEXT, fax TEXT, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC)"},
	         { TableId : 215 , TableName:'PDANEW_FILE_REMINDERS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_FILE_REMINDERS (ldap_id TEXT, file_no NUMERIC, sr_order NUMERIC, reminder TEXT, user_id TEXT, status TEXT, updation_date NUMERIC, category TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC)"},
	         { TableId : 217 , TableName:'PDANEW_AI_IC', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_AI_IC (tran_dt NUMERIC, ai_rcbl NUMERIC, ai_rcvd NUMERIC, ai_out NUMERIC, mr_rcbl NUMERIC, mr_rcvd NUMERIC, mr_out NUMERIC, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC, lac_no NUMERIC)"},
	         { TableId : 234 , TableName:'PDANEW_LAC_USER_PARA', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_USER_PARA (para_code TEXT, para_value TEXT, para_desc TEXT, srno NUMERIC, deleted_flag TEXT, ldap_id TEXT, timestamp NUMERIC, para_group TEXT, para_min_charge NUMERIC, para_max_charge TEXT)"},
	         { TableId : 226 , TableName:'PDANEW_LAC_TERMS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_TERMS (LAC_NO NUMERIC, T_TYPE TEXT, FROM_DT NUMERIC, TO_DT NUMERIC, AMT NUMERIC, ROI NUMERIC, PERIODICITY NUMERIC, UPD_DATE NUMERIC, LDAP_ID TEXT, SRNO NUMERIC, TIMESTAMP NUMERIC)"},
	         { TableId : 227 , TableName:'PDACRM_FULG_ACTIONS', CreateSql : "CREATE TABLE IF NOT EXISTS PDACRM_FULG_ACTIONS (LAC_NO NUMERIC, ACTIVITY_TYPE TEXT, SUIT_SEQ_NO NUMERIC, ACTION_SEQ_NO NUMERIC, ACTION TEXT, DATE_OF_ACTION NUMERIC, ACTION_TO_BE TEXT, NEXT_ACTION_DT NUMERIC, DONE_BY TEXT, TO_BE_DONE_BY TEXT, AMOUNT_SPENT NUMERIC, AMOUNT_TOBECHG NUMERIC, REMARK TEXT, LDAP_ID TEXT, SRNO NUMERIC, DELETED_FLAG TEXT, TIMESTAMP NUMERIC, ACTION_DESC TEXT)"},
	         { TableId : 228 , TableName:'PDANEW_PROPERTY_MST', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_PROPERTY_MST (PROP_NO TEXT, PROP_NAME TEXT, BUILDER_NO NUMERIC, PROP_STAT TEXT, HDFC_LOCATION_TYPE TEXT, COMPLETION_MONTH NUMERIC, PROP_CATEGORY TEXT, FLOOR_DET TEXT, FLOOR_NO NUMERIC, TOTAL_UNIT NUMERIC, MAX_EXPOSURE NUMERIC, MAX_AGR_VALUE NUMERIC, MAX_TOTAL_COST NUMERIC, APPR_STATUS TEXT, AREA_CODE NUMERIC, LANDMARK TEXT, FILE_NO NUMERIC, SPECIFIC_RMK TEXT, TECH_APR_NO NUMERIC, RECORD_STATUS TEXT, PER_AGRMNT_VALUE NUMERIC, DATE_OF_APR NUMERIC, CONS_STATUS TEXT, TA_DONE_BY TEXT, APPRAISER TEXT, MODE_OF_APR TEXT, UPDATION_DATE NUMERIC, APPROVAL_STATUS TEXT, PROGRESS TEXT, PROGRESS_AS_PER_SCHE TEXT, REMARK TEXT, APR_RATE NUMERIC, APPROVED_BY TEXT, LDAP_ID TEXT, DELETED_FLAG TEXT, TIMESTAMP NUMERIC, SRNO NUMERIC, BUILDER_NAME TEXT, AREA_DESC TEXT, APPR_DESC TEXT, FLOOR_DESC TEXT, FRIL_YN TEXT, VALUATION_DONE TEXT, VAL_DONE TEXT, VAL_CNT TEXT)"},
	         { TableId : 231 , TableName:'PDANEW_LG_DOCUMENTS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LG_DOCUMENTS (file_no NUMERIC,  doc_code TEXT,  doc_desc TEXT,  status TEXT,  original TEXT,  action_date NUMERIC,  user_id TEXT, upd_date NUMERIC,  ldap_id TEXT,  deleted_flag TEXT,  srno NUMERIC,  timestamp NUMERIC)"},
	         { TableId : 282 , TableName:'pdanew_asset_class', CreateSql : "CREATE TABLE IF NOT EXISTS pdanew_asset_class (lac_no NUMERIC, borr_name TEXT, months_os_comb NUMERIC, plt_comb NUMERIC, mru_dt NUMERIC, asset_classification TEXT, run_dt NUMERIC, yyyymm NUMERIC, ldap_id TEXT, srno NUMERIC, timestamp NUMERIC, deleted_flag TEXT)"},
	         { TableId : 283 , TableName:'pdanew_unique_id_accounts', CreateSql : "CREATE TABLE IF NOT EXISTS pdanew_unique_id_accounts (lac_no NUMERIC, lac_no1 NUMERIC,origin_branch VARCHAR2(50),laf_no NUMERIC, borr_name TEXT,  cur_emios NUMERIC,  cur_pmios NUMERIC,  cur_osadd NUMERIC,cur_mros NUMERIC,plt_comb NUMERIC,months_comb NUMERIC,total NUMERIC,  ldap_id TEXT,  srno NUMERIC,  deleted_flag TEXT,  timestamp NUMERIC)"},
	         { TableId : 218 , TableName:'PDANEW_CUST_CONTACT', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_CUST_CONTACT(cust_number NUMERIC, contact_type TEXT, contact_det TEXT, user_id TEXT, ldap_id TEXT, srno NUMERIC, lac_no NUMERIC, deleted_flag TEXT,  timestamp NUMERIC);"},
	         { TableId : 219 , TableName:'PDANEW_LAC_CROSSLINK', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_CROSSLINK(ldap_id TEXT, lac_no NUMERIC, file1 NUMERIC, file2 NUMERIC, remarks TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC,  cur_emios NUMERIC,cur_pmios NUMERIC,cur_bpos  NUMERIC,cur_osadd NUMERIC,cur_mros NUMERIC,cur_plt  NUMERIC,cur_totos NUMERIC);"},
	         { TableId : 220 , TableName:'PDANEW_CUSTOMER_ADDRESS_NEW', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_CUSTOMER_ADDRESS_NEW( perm_address VARCHAR2(20),file_no NUMERIC ,capacity TEXT ,  srno NUMERIC , deleted_flag TEXT , timestamp NUMERIC,  ldap_id TEXT,  address TEXT  ,  comm_address TEXT ,  comm_custno TEXT ,  comm_latitude TEXT,  comm_longitude TEXT,  empl_address TEXT ,  empl_custno TEXT,  empl_latitude TEXT ,  empl_longitude TEXT,  prop_address TEXT,    prop_custno TEXT  ,  prop_latitude TEXT ,  prop_longitude TEXT);"},
	         { TableId : 221 , TableName:'TAB_DAILY_ALERTS', CreateSql : "CREATE TABLE IF NOT EXISTS TAB_DAILY_ALERTS(LAC_NO NUMERIC, ALERT_DATE NUMERIC, ALERT_NAME TEXT, BORR_NAME TEXT, ALERT_TEXT TEXT, REMARKS TEXT, LDAP_ID TEXT,SRNO NUMERIC, TIMESTAMP NUMERIC);"},
	         { TableId : 214 , TableName:'PDANEW_FULG_ACTIONS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_FULG_ACTIONS(ldap_id TEXT, lac_no NUMERIC, action TEXT, date_of_action NUMERIC, def_observ TEXT, remark TEXT, deleted_flag TEXT,  timestamp NUMERIC, opr_id TEXT,  srno NUMERIC, activity_type TEXT, action_desc TEXT);"},
	         { TableId : 216 , TableName:'PDANEW_ILPS_REMARKS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_ILPS_REMARKS(ldap_id TEXT , file_no NUMERIC, REMARKS TEXT , user_id NUMERIC, UPD_DATE NUMERIC, srno NUMERIC, timestamp NUMERIC, deleted_flag TEXT);"},
	         { TableId : 232 , TableName:'PDANEW_VIEW_DOCS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_VIEW_DOCS(srno NUMERIC, ldap_id TEXT,  lac_no NUMERIC ,  doc_type TEXT,  doc_desc TEXT,  filename TEXT,  deleted_flag TEXT,  timestamp NUMERIC,  downloaded_flag TEXT ,  offline_flag TEXT,  doc_system TEXT,  doc_para1 TEXT,  doc_para2 TEXT,  file_no NUMERIC,  doc_rec_srno NUMERIC, network_path TEXT);"},
	         { TableId : 222 , TableName:'PDANEW_CRITICAL_INFO', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_CRITICAL_INFO(LAC_NO NUMERIC , SPECIAL_INFO_TYPE TEXT , LDAP_ID TEXT , UPD_DATE, DATE_OF_ACTION, SRNO, DELETED_FLAG , TIMESTAMP); "},
	         { TableId : 223 , TableName:'PDANEW_FU_ACT_REMINDER', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_FU_ACT_REMINDER (LAC_NO NUMERIC, NXT_ACTION NUMERIC, DEF_OBSERV TEXT, LDAP_ID TEXT, NAME TEXT, SRNO NUMERIC, DELETED_FLAG TEXT,  TIMESTAMP NUMERIC);"},
	         { TableId : 224 , TableName:'PDANEW_LAC_AMRT', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_AMRT (LAC_NO NUMERIC, PR_EMI NUMERIC, EMI NUMERIC, ROI NUMERIC, PERIODICITY NUMERIC, AMRT_FR_DT NUMERIC, DT_OF_AMRT NUMERIC, YYYYYY NUMERIC, LDAP_ID TEXT, AMRT_TO_DT NUMERIC, SRNO NUMERIC,TIMESTAMP NUMERIC)"},
	         { TableId : 225 , TableName:'PDANEW_LAC_DEFAULT_INFO', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_DEFAULT_INFO(LAC_NO NUMERIC , RISK_EVENT TEXT, UPDATED_BY NUMERIC , UPDATED_DATE NUMERIC, LDAP_ID TEXT, SRNO NUMERIC , DELETED_FLAG TEXT , TIMESTAMP NUMERIC);"},
	         { TableId : 200 , TableName:'PDANEW_LAC_MASTER', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_LAC_MASTER (click_count numeric DEFAULT 0,company_arrangement varchar2(100),max_action_date NUMERIC,lac_no NUMERIC,os_months_emi NUMERIC, os_months_pmi NUMERIC, borr_name TEXT, follow_up_ind TEXT,  prin_os_last_tr_comb NUMERIC,  months_os_comb NUMERIC, area_desc TEXT,  selfemp_company_name TEXT,  prop_class TEXT,  fraud_ind TEXT ,  customer_grade TEXT,  cure_type TEXT,  srno NUMERIC,  deleted_flag TEXT,  timestamp NUMERIC,  ldap_id TEXT,  prop_area_desc TEXT,  prop_name TEXT,  obs_code TEXT,  file_no TEXT,  sanction TEXT ,  my_basket TEXT,  prop_no TEXT,  builder_name TEXT,  builder_contact TEXT,  action_taken TEXT,  fu_area_desc TEXT,  plt TEXT,  months_os TEXT,  emp_area_desc TEXT,  last_rcbl_dt TEXT,  to_date TEXT,  rec_type TEXT,difficulty_level TEXT,level_remarks TEXT,followupflag TEXT);"},
	         { TableId : 201 , TableName:'PDANEW_PROP_DETAILS', CreateSql : "CREATE TABLE IF NOT EXISTS PDANEW_PROP_DETAILS (lac_no NUMERIC, prop_addr_line1 TEXT,  prop_addr_line2 TEXT,  prop_addr_line3 TEXT,  prop_addr_line4 TEXT,  prop_addr_line5 TEXT, landmark TEXT, prop_area NUMERIC,  mortgage_type TEXT,  prin_ason_dt1 NUMERIC,  prin_ason_val1 NUMERIC,  srno NUMERIC ,  deleted_flag TEXT,  timestamp NUMERIC,  ldap_id TEXT,  cumdisb NUMERIC,  prop_no TEXT,  prop_pin NUMERIC,  no_of_owners NUMERIC,  prop_val_cost NUMERIC,  reserve_price NUMERIC,  prop_state TEXT,  prop_city TEXT,  master_fileno TEXT,  docket_location TEXT,  ta_remarks TEXT,  prop_spec_addr TEXT,  prop_area_desc TEXT,  tot_plot_area NUMERIC,prop_latitude VARCHAR2(25),prop_longitude VARCHAR2(25));"},
	       	{TableId : 209 , TableName:'PDANEW_NEW_FU_ACTION', CreateSql :"create table  IF NOT EXISTS PDANEW_NEW_FU_ACTION(  ldap_id VARCHAR2(20),  lac_no  NUMBER(10),  action VARCHAR2(5),  date_of_action DATE,  response VARCHAR2(3),  def_observ VARCHAR2(5),  remark VARCHAR2(500),  opr_id VARCHAR2(10),  action_to_be VARCHAR2(3),  action_to_be_dt   DATE,  amount_tobechg   NUMBERIC(7,2),  amount_spent NUMBERIC(7,2),  copy_status VARCHAR2(2),  dwld_date DATE,  uploaded_flag VARCHAR2(1),  created_dt DATE,  latitude VARCHAR2(25),  longitude VARCHAR2(25),mobile_srno INTEGER PRIMARY KEY AUTOINCREMENT,version_no NUMBER(10),  processed_flag VARCHAR2(2),  processed_dt DATE,area_code VARCHAR2(50),  special_info_type    VARCHAR2(2),  action_type VARCHAR2(2),  risk_event VARCHAR2(20),  promised_dt DATE,  promised_amt NUMBER(12,2),  pipeline_amt NUMBER(20,2),  pipeline_dt DATE,  pipeline_proj_bucket VARCHAR2(500));" },
	        {TableId : 229 , TableName:'PDANEW_PROP_CLASS', CreateSql :"create table IF NOT EXISTS PDANEW_PROP_CLASS(lac_no NUMBER(10),class_code VARCHAR2(20),specific_value VARCHAR2(20),ldap_id VARCHAR2(20),deleted_flag VARCHAR2(1),timestamp DATE,  mobile_srno INTEGER PRIMARY KEY AUTOINCREMENT,uploaded_flag  VARCHAR2(1));"},
	        {TableId : 230 , TableName:'PDANEW_NEW_COMM_OTH_DETAILS', CreateSql :"create table IF NOT EXISTS PDANEW_NEW_COMM_OTH_DETAILS(lac_no NUMBER,  name VARCHAR2(65),  relation  VARCHAR2(30),  address1 VARCHAR2(500),  address2 VARCHAR2(500),  mobile1 VARCHAR2(20),  mobile2 VARCHAR2(20),  email_id      VARCHAR2(500),  off_tel_no    VARCHAR2(20),  res_tel_no    VARCHAR2(20),  fax VARCHAR2(20),  ldap_id   VARCHAR2(20),  deleted_flag  VARCHAR2(1),  timestamp DATE, mobile_srno  INTEGER PRIMARY KEY AUTOINCREMENT,  uploaded_flag VARCHAR2(1));"}
	        ]

		refreshData = [{TableId: 200, TableName:'PDANEW_LAC_MASTER'},
				{TableId: 204, TableName:'PDANEW_LAC_FU_ACTION'},
				{TableId: 205, TableName:'PDANEW_LAC_DETAILS'},
				{TableId: 206, TableName:'PDANEW_EMI_TRANS'}
				];


	constructor(public http: HttpClient,
				public platform: Platform, 
				private sqlite: SQLite,
				){}
	
  /******************************************** APP-LAUNCH *****************************************************/

public CreateLoginDetailsTbl(){
	return new Promise((resolve,reject) => {
	  	this.sqlite.create({
	  	name: 'logindb.db',
	  location: 'default'
	})
	.then((db: SQLiteObject) => {
  		db.executeSql('CREATE TABLE IF NOT EXISTS login_details (rowid INTEGER PRIMARY KEY,user_info TEXT)', null)
  		.then(res =>{
  			console.log(res);
  		})
	 .catch(e => console.log(e));
	}).catch(e => console.log(e));

	})	
}

public loginTbl(){
	var user_Details=  [{"SESSION_ID":"2RNUZPLERSGKJJBNOTFA1UF11ZLY2S","USER_NAME":"PRASANNAKC","USER_ID":"PRASANNAKC","LAST_LOGIN_DT":"2019-01-31T13:47:43"}]
        var user_Details1=JSON.stringify(user_Details);
	return new Promise((resolve,reject)=>{
		 this.sqlite.create({
        name: 'logindb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        
            db.executeSql('DELETE FROM login_details',null)
                 .then(() => {
					console.log('Deleted successfully')
					})
               	 .catch(e => console.log(e));
				db.executeSql('INSERT INTO login_details (user_info) Values (?)',[user_Details1])
              	  .then((res) =>  {
              	  	console.log("inserted successfully");
              	  	 resolve(res); 

              	  }) 
					.catch(e => console.log(e));
      }).catch(e => console.log(e));


	})
}

	public getAppMasterUserID(){  //------select userid in Appmaster -------//
	  	return new Promise((resolve,reject) => {
	  	this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			    let sInsertAppMasterScript = "SELECT UserID from App_Master";
				db.executeSql(sInsertAppMasterScript,[])
				.then(res => {
					this.userid=res.rows.item(0);
					resolve(res.rows.item(0))})

				.catch(e => {console.log(e) ; reject(e);});

	    })
	    .catch(e => alert(e));
	    })	
	}

 

// public sCreateTableScript(){		// --Table creation Appmaster and App_table master//
// 		return new Promise((resolve,reject) => {
// 			this.sqlite.create(this.options)
// 			.then((db : SQLiteObject) => {
// 				console.log("Connection open for sCreateTableScript");
// 			    var SqlOut =[];	
// 				var sCreateAppMasterScript = "CREATE TABLE IF NOT EXISTS App_Master(UserID TEXT PRIMARY KEY, Password TEXT, Version TEXT, SubVersion TEXT, SessionId TEXT)";
// 				var sCreateAppTableMasterScript = "CREATE TABLE IF NOT EXISTS App_Table_Master(TABLE_ID INT PRIMARY KEY, TABLE_NAME TEXT, TABLE_TYPE TEXT, MAXTIMESTAMP TEXT, SPECIAL_ACTION TEXT, LAST_SYNC_ON TEXT, ROW_CNT NUMERIC)";
// 				db.executeSql(sCreateAppMasterScript, {})			
// 		        .then(res => { SqlOut.push(res); 
// 		        }).catch(e => {console.log(e) ; reject(e)});
// 				db.executeSql(sCreateAppTableMasterScript, {})
// 				.then(res => {SqlOut.push(res);

// 					return resolve(SqlOut);
// 				})
				
// 				.catch(e => {console.log(e) ; reject(e)});
				
// 			})
// 		})
// 	}	








public sDropTableSAVEPHOTO(){  //-- drop tables on change user//
		return new Promise((resolve,reject) => {
			//this.createDatabase();
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				console.log("Connection open for sDropTable");
				var resolveObj = [];
		 		var sDropSql="DROP TABLE IF EXISTS PhotoUpload";
				db.executeSql(sDropSql, [])
				.then((res) => {resolveObj.push(res)})              
				.catch(e => {console.log(e) ; reject(e)});
		    	resolve(resolveObj);
		    	
			})
		})
	}


DeleteTablePhotoUpld(){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql1="DELETE FROM PhotoUpload";
								db.executeSql(UpdateSql1,[]).then(res=>{
								console.log(res);
								resolve(res);
							})
				})
		})

}


	public CreateTablePhotoSave(){		// --Table creation Appmaster and App_table master//
		return new Promise((resolve,reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				console.log("Connection open for sCreateTableScript");
			    var SqlOut1 =[];	
				var sCreateAppMasterScript = 
				"CREATE TABLE IF NOT EXISTS PhotoUpload(LAC_NO numeric, PhotoType TEXT, Path TEXT,Photourl TEXT,prop_no numeric)";
				db.executeSql(sCreateAppMasterScript, [])			
		        .then(res => { SqlOut1.push(res); 
		        }).catch(e => {console.log(e) ; reject(e)});
					return resolve(SqlOut1);
				})
				
				.catch(e => {console.log(e) ; reject(e)});
				
			})
		}		
InsertIntoPhotoUpload(lacno,phototype,filename,photourl,propno){
	return new Promise((resolve,reject) => {
	  	this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			    let sInsertAppMasterScript = "INSERT INTO PhotoUpload(LAC_NO,PhotoType,Path,Photourl,prop_no) values(?,?,?,?,?)";
				db.executeSql(sInsertAppMasterScript,[lacno,phototype,filename,photourl,propno])
				.then(res => {
					resolve(res)})
				.catch(e => {console.log(e) ; reject(e);});
							
	    })
	    .catch(e => alert(e));
	    })	
}

public selectPhotoUpload(){	
var listItems=[]	// --selecting values if userid is not null from App_Master //
		return new Promise((resolve,reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				console.log("Connection open for sSelectApp_MasterScript");
				var sSqlScript = "SELECT count(*) as totuplcnt,LAC_NO,PhotoType,Path,Photourl,prop_no FROM PhotoUpload";
				db.executeSql(sSqlScript,[]).then((res) => {
					console.log(res);

					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							listItems.push({
		    					LAC_NO: res.rows.item(i).LAC_NO,
		   						PhotoType: res.rows.item(i).PhotoType,
		   						Path:res.rows.item(i).Path,
		   						Photourl:res.rows.item(i).Photourl,
		   						prop_no:res.rows.item(i).prop_no,
		   						photoupcnt:res.rows.item(i).totuplcnt
		   					
		                    });
		                }

				    }
					return resolve(listItems);	
				}).catch(e => {console.log(e) ; reject(e)});

				
			})
		})
	}

public PhotoUploadcount(){	
var countphotoupld=[]	// --selecting values if userid is not null from App_Master //
		return new Promise((resolve,reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				console.log("Connection open for sSelectApp_MasterScript");
				var sSqlScript = "SELECT count(*) as totuplcnt FROM PhotoUpload";
				db.executeSql(sSqlScript,[]).then((res) => {
					console.log(res);

					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							countphotoupld.push({
		   						photoupcnt:res.rows.item(i).totuplcnt
		                    });
		                }

				    }
									
					return resolve(countphotoupld);	

				}).catch(e => {console.log(e) ; reject(e)});

				
			})
		})
	}
	


	

	// public sSelectApp_MasterScript(){		// --selecting values if userid is not null from App_Master //
	// 	return new Promise((resolve,reject) => {
	// 		this.sqlite.create(this.options)
	// 		.then((db : SQLiteObject) => {
	// 			console.log("Connection open for sSelectApp_MasterScript");
	// 			var sSqlScript = "SELECT * FROM App_Master where UserID is not null";
	// 			db.executeSql(sSqlScript,[]).then((res) => {
	// 				console.log(res);
									
	// 				return resolve(res);	

	// 			}).catch(e => {console.log(e) ; reject(e)});

				
	// 		})
	// 	})
	// }
	// clearsynctable(){    //--delete sync table data and updating app_table_master
	// 	return new Promise((resolve,reject) => {				
	// 		this.sqlite.create(this.options)
	// 		.then((db : SQLiteObject) => {
	// 			for(let i = 0; i < this.tableScript.length; i++){
	// 				let sDeleteSyncTablesData = "DELETE FROM " + this.tableScript[i].TableName;
	// 				console.log("DELETE FROM " + this.tableScript[i].TableName);
	// 				db.executeSql(sDeleteSyncTablesData, {})
	// 				.then(res => {
	// 					console.log("Clear Sync Table Data");
	// 					resolve(res)})
	// 				.catch(e => {console.log(e); reject(e)})
	// 				}
	// 			let sDeleteSyncTablesData = "UPDATE app_table_master set ROW_CNT=NULL,MAXTIMESTAMP=NULL,LAST_SYNC_ON=NULL";
					
	// 				db.executeSql(sDeleteSyncTablesData, {})
	// 				.then(res => {
	// 					resolve(res)})
	// 				.catch(e => {console.log(e); reject(e)})

	// 		}).catch(e=>console.log(e))
	// 	})
	// }

	/**************************************************** LOGIN ********************************************************/	

	public sDropTable(){  //-- drop tables on change user//
		
		return new Promise((resolve,reject) => {
			//this.createDatabase();
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				console.log("Connection open for sDropTable");
				var resolveObj = [];
		 		var sDropSql="DROP TABLE IF EXISTS App_Master";
				db.executeSql(sDropSql, [])
				.then((res) => {resolveObj.push(res)})              
				.catch(e => {console.log(e) ; reject(e)});

				sDropSql="DROP TABLE IF EXISTS App_Table_Master ";
				db.executeSql(sDropSql, [])
				.then((res) => {resolveObj.push(res)})              
				.catch(e => {console.log(e) ; reject(e)});

				for(let i = 0; i < this.tableScript.length; i++){
		      		let sDropSql="DROP TABLE IF EXISTS " + this.tableScript[i].TableName;      			
				    db.executeSql(sDropSql, [])
				    .then((res) => {resolveObj.push(res);
				
				})
				.catch(e => {console.log(e);reject(e)});
		    	}
				 
		    	resolve(resolveObj);
		    	
			})
		})
	}

	updateApp_MasterData(sPwd, sVersion, sSubVersion, sUserId){ // update app_master table (password,version,subversion)//
		
		return new Promise((resolve,reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {	
				console.log("Connection open for updateApp_MasterData");			
				let sUpdAppMasterScript = "UPDATE App_Master SET Password=?, Version=?, SubVersion=? WHERE UserID=?";
				db.executeSql(sUpdAppMasterScript, [sPwd, sVersion, sSubVersion, sUserId])
				.then((res) => {console.log(' Update App_Master Details  SQL'); 
					resolve(res);})
				.catch(e => reject(e)); 
			})
		})
	}

	/**************************************************** HOME *******************************************************/

public getsessionid(){  ///////////////////get session id from appmaster table////////////////////////////
 	return new Promise((resolve,reject) => {
	  	this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			    let sInsertAppMasterScript = "SELECT SessionId from App_Master";
				db.executeSql(sInsertAppMasterScript,[])
				.then(res => {
				this.sessionid=res.rows.item(0);
				console.log(res);
					resolve(res.rows.item(0))
				})

				.catch(e => {console.log(e) ; reject(e);});
							
	    })
	    .catch(e => alert(e));
	    })	

 }

updateSessionID(sSessionID, sUserId){ ////--update session id//////////
		console.log(sSessionID, sUserId);
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sUpdateAppMasterScript = "UPDATE App_Master SET SessionId=? WHERE UserID=?";
		        db.executeSql(sUpdateAppMasterScript, [sSessionID, sUserId])
		        .then(res => {
		        	alert(sSessionID);
		        	console.log(res);
		        	resolve(res)
		        })
		    }).catch(e => reject(e));
		})
	}	



	insertIntoAppTableMaster (sTableID, sTableName, sTableType, sMaxTime, sSpecialAction){   ////--select values from App_Table_Master,insert into app_table_master and update last_sync_on=last maxtimestamp and current timestamp into maxtimestamp
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let SelectSql = "SELECT * FROM App_Table_Master WHERE TABLE_ID = " + sTableID;
				db.executeSql(SelectSql, [])
				.then(res => {
					if(res.rows.length == 0){
						let sInsertAppTableMasterScript = "INSERT INTO App_Table_Master(TABLE_ID, TABLE_NAME, TABLE_TYPE, MAXTIMESTAMP, SPECIAL_ACTION) VALUES(?,?,?,?,?)";
						db.executeSql(sInsertAppTableMasterScript, [sTableID,sTableName,sTableType,sMaxTime,sSpecialAction])
						.then(() =>{							
							let sSql ="select LAST_SYNC_ON from App_Table_Master WHERE TABLE_ID=" + sTableID;
							db.executeSql(sSql, []).then((res) => resolve(res));
						})
					}
					else{
						let sInsertAppTableMasterScript = "UPDATE App_Table_Master SET LAST_SYNC_ON = MAXTIMESTAMP, MAXTIMESTAMP ='" + sMaxTime + "' WHERE TABLE_ID=" + sTableID;
						db.executeSql(sInsertAppTableMasterScript, [])
						.then(() =>{
							let sSql ="select LAST_SYNC_ON from App_Table_Master WHERE TABLE_ID=" + sTableID;
							db.executeSql(sSql, []).then((res) => resolve(res));
						})
					} 	       	       
				})
				.catch(e => {reject(e) ; console.log(e) });
			})
		})
	}	

/************************************************ TABLE LIST *************************************************/
	
	executeDownloadScript(DownloadDataObj){
	    let promises = [];		    	
		let DownloadDatLength;
		if(typeof(DownloadDataObj.DownloadTable_v1) != 'undefined'){
	    DownloadDatLength = DownloadDataObj.DownloadTable_v1.length ;
		}
		this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {

			for (let i=0; i < DownloadDatLength; i++){
				promises.push(new Promise((resolve, reject) => {
	           		db.executeSql(DownloadDataObj.DownloadTable_v1[i].SQL_INS_SCRIPT, []).then(res => {
	           			resolve(res);
	           			console.log(res);
	           		})
	       		})
	       		)
	       	}             
	            
		})
			return Promise.all(promises);
	}
	

	updateTableRowCount(tableName){//update row_count for app table_master

		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let queryscript="UPDATE  App_Table_Master SET ROW_CNT = (select count (*)from(select distinct * from " + tableName + " )) WHERE TABLE_NAME='" + tableName + "'"
				  	db.executeSql(queryscript, [])
				  	console.log("updateTableRowCount executed");
				  	resolve();

			})
		
		})
	}

	updateRowCount_v1(sTableName){
			return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {				
				let queryscript="UPDATE  App_Table_Master SET  ROW_CNT =(select count(1) from " + sTableName + ") WHERE TABLE_NAME='" + sTableName + "'" 
				db.executeSql(queryscript, [])
				.then(()=>{ 					
					resolve();
				}).catch(e=> console.log(e))					
			}).catch(e=>console.log(e))
		})		
	}


	TablelistAppTableMaster() //selecting from app_table_master with type="D" and pushing values to list items which will be used for displaying
	{
		var listItems=[];
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = "SELECT * FROM App_Table_Master WHERE TABLE_TYPE = 'D'"
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							listItems.push({
		    					TABLE_ID: res.rows.item(i).TABLE_ID,
		   						TABLE_NAME: res.rows.item(i).TABLE_NAME,
		   						ROW_COUNT:res.rows.item(i).ROW_CNT,
		   						SYNC_FLAG:1,
		   						LAST_SYNC_ON: res.rows.item(i).LAST_SYNC_ON 
		                    });
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(listItems);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})
	}

TablelistAppTableMaster_refresh() //selecting from app_table_master with type="D" and pushing values to list items which will be used for displaying
	{
		var listItems1=[];
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = "SELECT * FROM App_Table_Master WHERE TABLE_TYPE = 'D'"
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {

					    for (let i=0; i < res.rows.length; i++){
							 if(res.rows.item(i).TABLE_ID==200||res.rows.item(i).TABLE_ID==204||res.rows.item(i).TABLE_ID==205||res.rows.item(i).TABLE_ID==206)
							 {
							 	listItems1.push({
		    					TABLE_ID: res.rows.item(i).TABLE_ID,
		   						TABLE_NAME: res.rows.item(i).TABLE_NAME,
		   						ROW_COUNT:res.rows.item(i).ROW_CNT,
		   						SYNC_FLAG:1,
		   						LAST_SYNC_ON: res.rows.item(i).LAST_SYNC_ON 
		                    });
		                }
							 }
							

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(listItems1);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})
	}
getTableIdDetails(tablename)//--for passing data according to table_name
	{
		var listItems=[];
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = "SELECT * FROM App_Table_Master WHERE TABLE_TYPE IN('D','S') AND TABLE_NAME ='" + tablename + "'";
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
						if (res.rows.length > 0) {
							
		                    listItems.push({
		    					TABLE_ID: res.rows.item(0).TABLE_ID,
		   						TABLE_NAME: res.rows.item(0).TABLE_NAME,
		   						ROW_COUNT:res.rows.item(0).ROW_CNT,
		   						LAST_SYNC_ON: res.rows.item(0).LAST_SYNC_ON,
		   						SYNC_FLAG:1
		                        });
		                		console.log(listItems) ;

	                	}
	                	return resolve(listItems);
	    
					}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})
	}



	clearsynctable_1(){    //--delete sync table data and updating app_table_master
		return new Promise((resolve,reject) => {	
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				for(let i = 0; i < this.refreshData.length; i++){
					let sDeleteSyncTablesData = "DELETE FROM " + this.refreshData[i].TableName;
					console.log("DELETE FROM " + this.refreshData[i].TableName);
					db.executeSql(sDeleteSyncTablesData, [])
					.then(res => {
						console.log("Clear Sync Table Data");
						resolve(res)})
					.catch(e => {console.log(e); reject(e)})
					
					let sDeleteSyncTablesData1 = "UPDATE app_table_master set ROW_CNT=NULL,MAXTIMESTAMP=NULL,LAST_SYNC_ON=NULL where TABLE_ID="+this.refreshData[i].TableId;
					db.executeSql(sDeleteSyncTablesData1, [])
					.then(res => {
						resolve(res)})
					.catch(e => {console.log(e); reject(e)})

				}

			}).catch(e=>console.log(e))
		})
	}

 LacMasterTableDetails(){//displaying the lac master table page
 	//var tableItems=[];
 	var length = this.tableItems.length;
 	console.log(length);
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
					let sSelectSqlstmt = "SELECT lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket FROM PDANEW_LAC_MASTER LIMIT 15 OFFSET "+  length + " ;"
					console.log(sSelectSqlstmt);
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
					    
							this.tableItems.push({
		    					LAC_NO: res.rows.item(i).lac_no,
		   						BORR_NAME: res.rows.item(i).borr_name,
		   						FOLLOW_UP_IND:res.rows.item(i).follow_up_ind,
		   						PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
		   						MONTHS_OS: res.rows.item(i).months_os,
		   						AREA_DESC: res.rows.item(i).area_desc,
		   						CUSTOMER_GRADE: res.rows.item(i).customer_grade,
		   						PROP_AREA_DESC:res.rows.item(i).prop_area_desc,
		   						PROP_NAME: res.rows.item(i).prop_name,
		   						EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
		   						M_OS:res.rows.item(i).plt,
		   						FOLLOW_UP: res.rows.item(i).fu_area_desc,
		   						EMP_AREA: res.rows.item(i).emp_area_desc,
		   						difficulty_level:res.rows.item(i).difficulty_level,
		   						my_basket:res.rows.item(i).my_basket
		                    }); 
		                }
				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(this.tableItems)
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }

 getFollowuoFlag(lacno){
	 var followupflaglist=[];
	return new Promise((resolve,reject)=>{
			
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				//console.log(len);
				let sSelectSqlstmt = "SELECT lac_no,followupflag FROM PDANEW_LAC_MASTER where lac_no="+lacno;
					console.log(sSelectSqlstmt);
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {

					    for (let i=0; i < res.rows.length; i++){
					    	
							followupflaglist.push({
		    					LAC_NO: res.rows.item(i).lac_no,
		   						followupflag:res.rows.item(i).followupflag,
		   					
		                    }); 
						
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(followupflaglist);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))

})
}


ClearLevelUpdate(){
	return new Promise((resolve,reject)=>{
		this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				db.executeSql("UPDATE PDANEW_LAC_MASTER SET difficulty_level=?,level_remarks=?", [,''])
					.then(res =>
					{
						resolve(res);
					console.log(res);
				 }).catch(e=>console.log(e))
		})
			})

 }


SelectLacMasterAcDetails(lacno){
	var lacmasteracdetails=[];
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT lac_no,to_date,plt,last_rcbl_dt,prin_os_last_tr_comb FROM PDANEW_LAC_MASTER where LAC_NO =" + lacno 

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							lacmasteracdetails.push({
		    					
								TO_DATE:(res.rows.item(i).to_date).toString().slice(0,10),
								LAC_NO:res.rows.item(i).lac_no,
								last_rcbl_dt:(res.rows.item(i).last_rcbl_dt).toString().slice(0,10),
								prin_os_last_tr_comb:res.rows.item(i).prin_os_last_tr_comb ,

								plt:res.rows.item(i).prin_os_last_tr_comb

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
						
	            	resolve(lacmasteracdetails);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})
}



SelectLacMasterPltSum(){
	var plt=[];
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT SUM(plt) as plttot FROM PDANEW_LAC_MASTER "

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							plt.push({
		    					
								plt:res.rows.item(i).plttot

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
						
	            	resolve(plt);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})
}


SelectLacMasterPltSum_backet(value){
	var plt=[];
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT SUM(plt) as plttot FROM PDANEW_LAC_MASTER where my_basket='" + value + "'"

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							plt.push({
		    					
								plt:res.rows.item(i).plttot

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
						
	            	resolve(plt);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})
}



LacMasterTableDetailsPhotoUpload(lacno){
	return new Promise((resolve,reject)=>{
			
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				//console.log(len);
				let sSelectSqlstmt = "SELECT lac_no,file_no,prop_no,srno,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket,followupflag FROM PDANEW_LAC_MASTER where lac_no="+lacno;
					console.log(sSelectSqlstmt);
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {

					    for (let i=0; i < res.rows.length; i++){
					    	
					    		this.tableItems_v1.push({
		    					LAC_NO: res.rows.item(i).lac_no,
		   						BORR_NAME: res.rows.item(i).borr_name,
		   						FOLLOW_UP_IND:res.rows.item(i).follow_up_ind,
		   						PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
		   						MONTHS_OS: res.rows.item(i).months_os,
		   						AREA_DESC: res.rows.item(i).area_desc,
		   						CUSTOMER_GRADE: res.rows.item(i).customer_grade,
		   						PROP_AREA_DESC:res.rows.item(i).prop_area_desc,
		   						PROP_NAME: res.rows.item(i).prop_name,
		   						EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
		   						M_OS:res.rows.item(i).plt,
		   						FOLLOW_UP: res.rows.item(i).fu_area_desc,
		   						EMP_AREA: res.rows.item(i).emp_area_desc,
		   						difficulty_level:res.rows.item(i).difficulty_level,
		   						my_basket:res.rows.item(i).my_basket,
		   						followupflag:res.rows.item(i).followupflag,
		   						file_no:res.rows.item(i).file_no,
		   						prop_no:res.rows.item(i).prop_no,
		   						srno:res.rows.item(i).srno
		                    }); 
						
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(this.tableItems_v1);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))

})
}
 
LacMasterTableDetails_v1(){//displaying the lac master table page
	return new Promise((resolve,reject)=>{
		this.tableItems_v1=[];
		
	   this.sqlite.create(this.options)
	   .then((db : SQLiteObject) => {

		   let sSelectSqlstmt ="SELECT p.os_months_emi,p.max_action_date,p.company_arrangement,p.os_months_pmi,p.lac_no,p.file_no,p.prop_no,p.srno,p.borr_name,p.follow_up_ind,p.prin_os_last_tr_comb,p.months_os,area_desc,p.customer_grade,p.prop_area_desc,p.fu_area_desc,p.emp_area_desc,p.selfemp_company_name,p.plt,p.prop_name,p.difficulty_level,p.my_basket,p.followupflag,count(u.lac_no)as total_acc_cnt,sum(u.plt_comb)as all_plt FROM PDANEW_LAC_MASTER p join pdanew_unique_id_accounts u on p.lac_no=u.lac_no GROUP BY p.lac_no"
			   console.log(sSelectSqlstmt);
			   db.executeSql(sSelectSqlstmt, [])
			   .then(res =>
			   {
			   if (res.rows.length > 0) {

				   for (let i=0; i < res.rows.length; i++){
					   if(res.rows.item(i).lac_no!=""){
						   this.tableItems_v1.push({
						   LAC_NO: res.rows.item(i).lac_no,
							  BORR_NAME: res.rows.item(i).borr_name,
							  FOLLOW_UP_IND:res.rows.item(i).follow_up_ind,
							  PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
							  MONTHS_OS: res.rows.item(i).months_os,
							  AREA_DESC: res.rows.item(i).area_desc,
							  CUSTOMER_GRADE: res.rows.item(i).customer_grade,
							  PROP_AREA_DESC:res.rows.item(i).prop_area_desc,
							  PROP_NAME: res.rows.item(i).prop_name,
							  EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
							  M_OS:res.rows.item(i).plt,
							  FOLLOW_UP: res.rows.item(i).fu_area_desc,
							  EMP_AREA: res.rows.item(i).emp_area_desc,
							  difficulty_level:res.rows.item(i).difficulty_level,
							  my_basket:res.rows.item(i).my_basket,
							  followupflag:res.rows.item(i).followupflag,
							  file_no:res.rows.item(i).file_no,
							  prop_no:res.rows.item(i).prop_no,
							  srno:res.rows.item(i).srno,
							  os_months_emi:res.rows.item(i).os_months_emi,
							  os_months_pmi:res.rows.item(i).os_months_pmi,
							  max_action_date:res.rows.item(i).max_action_date,
							  company_arrangement:res.rows.item(i).company_arrangement,
							  no_of_acc:res.rows.item(i).total_acc_cnt,
							  plt_count:res.rows.item(i).all_plt

					   }); 
					   }
				   }

			   }
			   resolve(this.tableItems_v1);
				console.log(res);
			   })
			   .then(res => {
			   
		   }).catch(e=>console.log(e))
	   }).catch(e=>console.log(e))
 
   })

}

GetPropName(lacno){
	return new Promise((resolve,reject)=>{
		var proplist=[];
		
	   this.sqlite.create(this.options)
	   .then((db : SQLiteObject) => {
		   let sSelectSqlstmt ="SELECT prop_name FROM PDANEW_LAC_MASTER where lac_no="+lacno;
			   console.log(sSelectSqlstmt);
			   db.executeSql(sSelectSqlstmt, [])
			   .then(res =>
			   {
			   if (res.rows.length > 0) {

				   for (let i=0; i < res.rows.length; i++){
					   if(res.rows.item(i).lac_no!=""){
						   proplist.push({
							  PROP_NAME: res.rows.item(i).prop_name,
					   }); 
					   }
				   }

			   }
			   resolve(proplist);
				console.log(res);
			   })
			   .then(res => {
			   
		   }).catch(e=>console.log(e))
	   }).catch(e=>console.log(e))
   
   

   })
}
 Updatefollowupflag(fflag,lacno){
 	return new Promise((resolve,reject)=>{
 	this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "UPDATE PDANEW_LAC_MASTER SET followupflag ='" + fflag + "'WHERE  lac_no ="+lacno

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
				 }).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
 }

LacMasterTableDFilter(){//displaying the lac master table page
 	var table=[];
 	console.log(length);
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
			//console.log(len);
				let sSelectSqlstmt = "SELECT max_action_date,company_arrangement,lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket FROM PDANEW_LAC_MASTER ;"
					console.log(sSelectSqlstmt);
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
					    
							table.push({
		    					LAC_NO: res.rows.item(i).lac_no,
		   						BORR_NAME: res.rows.item(i).borr_name,
		   						FOLLOW_UP_IND:res.rows.item(i).follow_up_ind,
		   						PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
		   						MONTHS_OS: res.rows.item(i).months_os,
		   						AREA_DESC: res.rows.item(i).area_desc,
		   						CUSTOMER_GRADE: res.rows.item(i).customer_grade,
		   						PROP_AREA_DESC:res.rows.item(i).prop_area_desc,
		   						PROP_NAME: res.rows.item(i).prop_name,
		   						EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
		   						M_OS:res. rows.item(i).plt,
		   						FOLLOW_UP: res.rows.item(i).fu_area_desc,
		   						EMP_AREA: res.rows.item(i).emp_area_desc,
		   						difficulty_level:res.rows.item(i).difficulty_level,
		   						my_basket:res.rows.item(i).my_basket,
		   						max_action_date:res.rows.item(i).max_action_date,
							  company_arrangement:res.rows.item(i).company_arrangement
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(table);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }



LacMasterTableBasketFilter(basketname){//displaying the lac master table page
 	var table1=[];
 	console.log(length);
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {

		//		basketname=basketname.toString();

				let sSelectSqlstmt=	"SELECT p.os_months_emi,p.max_action_date,p.company_arrangement,p.os_months_pmi,p.lac_no,p.file_no,p.prop_no,p.srno,p.borr_name,p.follow_up_ind,p.prin_os_last_tr_comb,p.months_os,area_desc,p.customer_grade,p.prop_area_desc,p.fu_area_desc,p.emp_area_desc,p.selfemp_company_name,p.plt,p.prop_name,p.difficulty_level,p.my_basket,p.followupflag,count(u.lac_no)as total_acc_cnt,sum(u.plt_comb)as all_plt FROM PDANEW_LAC_MASTER p join pdanew_unique_id_accounts u on p.lac_no=u.lac_no where p.my_basket='"+basketname+"' GROUP BY p.lac_no"


			//	let sSelectSqlstmt = "SELECT max_action_date,company_arrangement,lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket FROM PDANEW_LAC_MASTER where my_basket='"+basketname+"'";
					console.log(sSelectSqlstmt);
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
					    if(res.rows.item(i).lac_no!=""){
					    	table1.push({
		    					LAC_NO: res.rows.item(i).lac_no,
		   						BORR_NAME: res.rows.item(i).borr_name,
		   						FOLLOW_UP_IND:res.rows.item(i).follow_up_ind,
		   						PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
		   						MONTHS_OS: res.rows.item(i).months_os,
		   						AREA_DESC: res.rows.item(i).area_desc,
		   						CUSTOMER_GRADE: res.rows.item(i).customer_grade,
		   						PROP_AREA_DESC:res.rows.item(i).prop_area_desc,
		   						PROP_NAME: res.rows.item(i).prop_name,
		   						EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
		   						M_OS:res. rows.item(i).plt,
		   						FOLLOW_UP: res.rows.item(i).fu_area_desc,
		   						EMP_AREA: res.rows.item(i).emp_area_desc,
		   						difficulty_level:res.rows.item(i).difficulty_level,
		   						my_basket:res.rows.item(i).my_basket,
		   						max_action_date:res.rows.item(i).max_action_date,
							   company_arrangement:res.rows.item(i).company_arrangement,
							   no_of_acc:res.rows.item(i).total_acc_cnt,
							   plt_count:res.rows.item(i).all_plt


							 
		                    }); 
					    }
							
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(table1);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }

  LacMasterTableInfo(lac_no){     
  console.log(lac_no);      //displaying the lac details table page
 	var Items=[];
		return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT emi,os_months_emi,asset_classification,bal_term,roi,rcd_dt,last_tr_dt,sanction,cumdisb,normal_pay_mode,fraud_ind,prop_class,gr_no,origin_place,thru_whom,lac_no FROM PDANEW_LAC_DETAILS where LAC_NO =" + lac_no 

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							Items.push({
		    					EMI: res.rows.item(i).emi,
		   						M0NTH_OS: res.rows.item(i).os_months_emi,
		   						ASSET_CLASS:res.rows.item(i).asset_classification,
		   						BAL_TERM: res.rows.item(i).bal_term,
		   						ROI: res.rows.item(i).roi,
		   						RCD: (res.rows.item(i).rcd_dt).toString().slice(0,10),
		   						LAST_TRANS_DATE: (res.rows.item(i).last_tr_dt).toString().slice(0,10),
		   						SANCTION:res.rows.item(i).sanction,
		   						DISBAMT: res.rows.item(i).cumdisb,
		   						PAY_MODE: res.rows.item(i).normal_pay_mode,
		   						FRAUD_CLASS:res. rows.item(i).fraud_ind,
		   						PROP_CLASS: res.rows.item(i).prop_class,
		   						GROUP_NO: res.rows.item(i).gr_no,
	                         	LOAN_ORIGIN:res.rows.item(i).origin_place,
								THROUGH_WHOM:res.rows.item(i).thru_whom,
								TO_DATE:res.rows.item(i).timestamp,
								LAC_NO:res.rows.item(i).lac_no,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
						
	            	resolve(Items);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }
 GetPropertyDetails(lac_no){             /////////getting property details///////////////
 	var Prop=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT prop_latitude,prop_longitude,prop_no,prop_addr_line1,prop_addr_line2,prop_pin,prop_city,prop_state,prop_area,no_of_owners,prop_val_cost,reserve_price,master_fileno,docket_location,ta_remarks,tot_plot_area FROM PDANEW_PROP_DETAILS where LAC_NO =" + lac_no 

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							Prop.push({
		    					prop_no: res.rows.item(i).prop_no,
		   						prop_addr_line1: res.rows.item(i).prop_addr_line1,
		   						prop_addr_line2:res.rows.item(i).prop_addr_line2,
		   						prop_pin: res.rows.item(i).prop_pin,
		   						prop_city: res.rows.item(i).prop_city,
		   						prop_state: res.rows.item(i).prop_state,
		   						prop_area: res.rows.item(i).prop_area,
		   						no_of_owners:res.rows.item(i).no_of_owners,
		   						prop_val_cost: res.rows.item(i).prop_val_cost,
		   						reserve_price: res.rows.item(i).reserve_price,
		   						master_fileno:res. rows.item(i).master_fileno,
		   						docket_location: res.rows.item(i).docket_location,
		   						ta_remarks: res.rows.item(i).ta_remarks,
	                         	tot_plot_area:res.rows.item(i).tot_plot_area,
	                         	prop_longi:res.rows.item(i).prop_longitude,
	                         	prop_lat:res.rows.item(i).prop_latitude 
	
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
						
	            	resolve(Prop);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }

GetDisbDetails(lac_no){ //////////////get disb details/////////////
 	var Disb=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT disb_dt,disb_no,payable_to,doc_amt,doc_no,status FROM PDANEW_DISB_DETAILS where LAC_NO = "+lac_no+" ORDER BY disb_dt"

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							Disb.push({
		    					disb_dt: (res.rows.item(i).disb_dt).toString().slice(0,10),
		   						disb_no: res.rows.item(i).disb_no,
		   						payable_to:res.rows.item(i).payable_to,
		   						doc_amt: res.rows.item(i).doc_amt,
		   						doc_no: res.rows.item(i).doc_no,
		   						status: res.rows.item(i).status,

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
						
	            	resolve(Disb);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }


 GetDisbAmtDetails(lac_no){ ////////////// get disbamt details   ///////////////////
 	var amt=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT doc_amt,SUM(doc_amt) AS Total_Disbursed_amount FROM PDANEW_DISB_DETAILS where LAC_NO =" + lac_no 

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							amt.push({
		    					
		   						Total_disbursed_amount:res.rows.item(i).Total_Disbursed_amount,
	
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
						
	            	resolve(amt);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }
GetUniqueIdDetails(lac_no){      //////////////get unique id details //////////
 	var Uid=[];
 	var sumplt=0;
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT laf_no,cur_emios,cur_mros,lac_no,total,plt_comb,months_comb,origin_branch,cur_osadd FROM pdanew_unique_id_accounts where LAC_NO =" + lac_no 

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
					    		sumplt=sumplt+Number(res.rows.item(i).plt_comb);

							Uid.push({
		    					laf_no: res.rows.item(i).laf_no,
		   						cur_emios: res.rows.item(i).cur_emios,
		   						cur_mros:res.rows.item(i).cur_mros,
		   						lac_no: res.rows.item(i).lac_no,
		   						total: res.rows.item(i).total,
		   						plt_comb: res.rows.item(i).plt_comb,
								months_comb: res.rows.item(i).months_comb,
								origin_branch:res.rows.item(i).origin_branch,
								cur_osadd:res.rows.item(i).cur_osadd,
								sumplt:sumplt,

		                    }); 
		              
		                }

				    }
	     			console.log(res);
	     			console.log(sumplt);
					})
					.then(res => {

	            	resolve(Uid);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

 }
GetFileReminder(file_no){
	var reminder=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT updation_date,reminder,user_id FROM PDANEW_FILE_REMINDERS where FILE_NO =" + file_no 

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {


					    for (let i=0; i < res.rows.length; i++){
							reminder.push({
		    					updation_date:(res.rows.item(i).updation_date).toString().slice(0,10),
		   						reminder: res.rows.item(i).reminder,
		   						user_id:res.rows.item(i).user_id
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(reminder);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

}

GetBuilderDetails(file_no){
	var detail=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = "select * from PDANEW_LAC_MASTER LM JOIN PDANEW_PROPERTY_MST PM WHERE LM.LAC_NO ="+file_no+" AND LM.LAC_NO = PM.FILE_NO"
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							detail.push({
		    					builder_no: res.rows.item(i).BUILDER_NO,
		   						builder_name: res.rows.item(i).BUILDER_NAME,
		   						builder_contact:res.rows.item(i).builder_contact,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(detail);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

}
GetACDetails(lac_no){
	var acdetails=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = 
				"SELECT LY_OS_EMI,LY_OS_PMI,LY_OS_ADD_INT,LY_OS_MR,LY_OS_PPC,LY_OS_SI,LY_OS_TOT,emi_recble,pmi_recble,add_int_recble,mr_recble,ppc_recble,si_recble,tot_recble,ppc_recd,tot_recd,mr_recd,emi_recd,pmi_recd,si_recd,add_int_recd,emi_curos,pmi_curos,add_curos,mr_curos,cur_ppcos,cur_sios,tot_curos FROM PDANEW_LAC_DETAILS where LAC_NO =" + lac_no

					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							acdetails.push({
		    					LY_OS_EMI: res.rows.item(i).ly_os_emi,
		   						LY_OS_PMI: res.rows.item(i).ly_os_pmi,
		   						LY_OS_ADD_INT:res.rows.item(i).ly_os_add_int,
		   						LY_OS_MR:res.rows.item(i).ly_os_mr,
		   						LY_OS_PPC:res.rows.item(i).ly_os_ppc,
		   						LY_OS_SI:res.rows.item(i).ly_os_si,
		   						LY_OS_TOTAL:res.rows.item(i).ly_os_tot,
		   						emi_recble: res.rows.item(i).emi_recble,
		   						pmi_recble: res.rows.item(i).pmi_recble,
		   						add_int_recble:res.rows.item(i).add_int_recble,
		   						mr_recble:res.rows.item(i).mr_recble,
		   						ppc_recble:res.rows.item(i).ppc_recble,
		   						si_recble:res.rows.item(i).si_recble,
		   						tot_recble:res.rows.item(i).tot_recble,
		   						emi_recd: res.rows.item(i).emi_recd,
		   						pmi_recd: res.rows.item(i).pmi_recd,
		   						add_int_recd:res.rows.item(i).add_int_recd,
		   						mr_recd:res.rows.item(i).mr_recd,
		   						ppc_recd:res.rows.item(i).ppc_recd,
		   						si_recd:res.rows.item(i).si_recd,
		   						tot_recd:res.rows.item(i).tot_recd,
		   						emi_curos: res.rows.item(i).emi_curos,
		   						pmi_curos: res.rows.item(i).pmi_curos,
		   						add_curos:res.rows.item(i).add_curos,
		   						mr_curos:res.rows.item(i).mr_curos,
		   						cur_ppcos:res.rows.item(i).cur_ppcos,
		   						cur_sios:res.rows.item(i).cur_sios,
		   						tot_curos:res.rows.item(i).tot_curos,
		   						}); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(acdetails);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})


}
GetCustContact(lac_no){
	var contact=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = "SELECT cust_number,contact_type,contact_det FROM PDANEW_CUST_CONTACT WHERE LAC_NO ="+lac_no +" and contact_type='M'"
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							contact.push({
		    					cust_number: res.rows.item(i).cust_number,
		   						contact_type: res.rows.item(i).contact_type,
		   						contact_det: res.rows.item(i).contact_det,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(contact);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})


}

GetCommDetails_1(file_no){
	var commdetails=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = "select cust_name,capacity,cust_number,addr_type,addr_line1,addr_line2,addr_line3,addr_line4,city,tel_no,spec_addr,mobile_no,email from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO ="+file_no+" AND CAPACITY ='B'"
				db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							commdetails.push({
		    					cust_name: res.rows.item(i).cust_name,
		   						addr_type: res.rows.item(i).addr_type,
		   						addr_line1: res.rows.item(i).addr_line1,
		   						addr_line2: res.rows.item(i).addr_line2,
		   						addr_line3: res.rows.item(i).addr_line3,
		   						addr_line4: res.rows.item(i).addr_line4,
		   						city:res.rows.item(i).city,
		   						tel_no:res.rows.item(i).tel_no,
		   						spec_addr:res.rows.item(i).spec_addr,
		   						mobile_no:res.rows.item(i).mobile_no,
		   						email:res.rows.item(i).email,
		   						capacity:res.rows.item(i).capacity,
		   						comm_custno:res.rows.item(i).cust_number,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(commdetails);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetCommDetails_2(file_no){
	var common=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select cust_name,capacity,cust_number,addr_type,addr_line1,addr_line2,addr_line3,addr_line4,city,tel_no,spec_addr,mobile_no,email from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO ="+file_no+" AND CAPACITY ='C'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							common.push({
		    					cust_name: res.rows.item(i).cust_name,
		   						addr_type: res.rows.item(i).addr_type,
		   						addr_line1: res.rows.item(i).addr_line1,
		   						addr_line2: res.rows.item(i).addr_line2,
		   						addr_line3: res.rows.item(i).addr_line3,
		   						addr_line4: res.rows.item(i).addr_line4,
		   						city:res.rows.item(i).city,
		   						tel_no:res.rows.item(i).tel_no,
		   						spec_addr:res.rows.item(i).spec_addr,
		   						mobile_no:res.rows.item(i).mobile_no,
		   						email:res.rows.item(i).email,
		   						capacity:res.rows.item(i).capacity,
		   						comm_custno:res.rows.item(i).cust_number,

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(common);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}
GetCommDetails_3(file_no){
	var guarantor=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select cust_name,capacity,cust_number,addr_type,addr_line1,addr_line2,addr_line3,addr_line4,city,tel_no,spec_addr,mobile_no,email from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO ="+file_no+" AND CAPACITY ='G'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							guarantor.push({
		    					cust_name: res.rows.item(i).cust_name,
		   						addr_type: res.rows.item(i).addr_type,
		   						addr_line1: res.rows.item(i).addr_line1,
		   						addr_line2: res.rows.item(i).addr_line2,
		   						addr_line3: res.rows.item(i).addr_line3,
		   						addr_line4: res.rows.item(i).addr_line4,
		   						city:res.rows.item(i).city,
		   						tel_no:res.rows.item(i).tel_no,
		   						spec_addr:res.rows.item(i).spec_addr,
		   						mobile_no:res.rows.item(i).mobile_no,
		   						email:res.rows.item(i).email,
		   						capacity:res.rows.item(i).capacity,
		   						comm_custno:res.rows.item(i).cust_number,


		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(guarantor);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

// GetCommDetailsaddrstype(file_no){
// 	var commndtls=[];
//  	return new Promise((resolve,reject)=>{
// 			this.sqlite.create(this.options)
// 			.then((db : SQLiteObject) => {
// 				let sSelectSqlstmt1= "select addr_type,capacity from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO ="+file_no
// 				db.executeSql(sSelectSqlstmt1, [])
// 					.then(res =>
// 					{
// 					if (res.rows.length > 0) {
// 					    for (let i=0; i < res.rows.length; i++){
// 							commndtls.push({
// 		   						addr_type: res.rows.item(i).addr_type,
// 		   						capacity:res.rows.item(i).capacity
// 		                    }); 
// 		                }
// 				    }
// 	     			console.log(res);
// 					})
// 					.then(res => {
// 	            	resolve(commndtls);
// 				}).catch(e=>console.log(e))

// 			}).catch(e=>console.log(e))
// 		})
// }
UpdateCustomerDetails(fileno,latitude_desc,langtitude_desc,capacity,latitude,longitude,srno){
return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "UPDATE PDANEW_CUSTOMER_ADDRESS_NEW SET '" + latitude_desc + "'='" + latitude + "','" + langtitude_desc + "'='" + longitude +
        "'  WHERE file_no = '" + fileno + "' AND srno='" + srno + "' AND capacity='" + capacity + "';"

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
				 }).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetCustomerAddress(file_no){
	var address=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= 
				"select distinct lfa.addr_type,lfa.capacity,lfa.cust_number,lfa.file_no,fa.address,fa.comm_address,fa.srno,fa.prop_address,fa.perm_address,fa.empl_address,fa.file_no,fa.comm_custno,fa.empl_latitude,fa.empl_longitude,fa.comm_longitude,fa.comm_latitude,fa.prop_latitude,fa.prop_longitude from PDANEW_CUSTOMER_ADDRESS_NEW fa JOIN PDANEW_CUSTOMER_ADDRESS lfa WHERE fa.file_no = '"+ file_no + "'and fa.file_no = lfa.file_no and lfa.cust_number=fa.comm_custno"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
                            var address1=""
					    	var latitude="";
					    	var longitude="";
					    	var addresstype="";
							//var permaddrs=""

					    	if(res.rows.item(i).addr_type=="C"){
					    		latitude=res.rows.item(i).comm_latitude,
					    		longitude=res.rows.item(i).comm_longitude,
					    		address1=res.rows.item(i).comm_address,
					    		addresstype="C"
    
					    	}else if(res.rows.item(i).addr_type=="E"){
					    		latitude=res.rows.item(i).empl_latitude,
					    		longitude=res.rows.item(i).empl_longitude,
					    		address1=res.rows.item(i).empl_address,
					    		addresstype="E"

					    	}
					    	else{
					    		latitude=res.rows.item(i).prop_latitude,
					    		longitude=res.rows.item(i).prop_longitude,
					    		address1=res.rows.item(i).prop_address,
					    		addresstype="P"

					    		
					    	}
							address.push({
		    					addresstype: res.rows.item(i).addr_type,
		   						capacity:res.rows.item(i).capacity,
		   						comm_custno:res.rows.item(i).cust_number,
		   						file_no:res.rows.item(i).file_no,
		   					//	permaddrs:res.rows.item(i).perm_address,
		   						address:address1,
		   						empl_latitude:res.rows.item(i).empl_latitude,
		   						empl_longitude:res.rows.item(i).empl_longitude,
		   						comm_longitude:res.rows.item(i).comm_longitude,
		   						comm_latitude:res.rows.item(i).comm_latitude,
		   						prop_latitude:res.rows.item(i).prop_latitude,
		   						prop_longitude:res.rows.item(i).prop_longitude,
		   						comm_address:res.rows.item(i).comm_address,
		   						prop_address:res.rows.item(i).prop_address,
		   						empl_address:res.rows.item(i).empl_address,
		   						latitude:latitude,
		   						longitude:longitude,
		   						addtype:addresstype,
		   						srno:res.rows.item(i).srno

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(address);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetCustomerAddress_lac(file_no){
	var address=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				 let sSelectSqlstmt1= "select * from PDANEW_CUSTOMER_ADDRESS_NEW where file_no = '"+ file_no + "'and capacity='B'"

			//	"select distinct lfa.addr_type,lfa.capacity,lfa.cust_number,lfa.file_no,fa.address,fa.comm_address,fa.srno,fa.prop_address,fa.perm_address,fa.empl_address,fa.file_no,fa.comm_custno,fa.empl_latitude,fa.empl_longitude,fa.comm_longitude,fa.comm_latitude,fa.prop_latitude,fa.prop_longitude from PDANEW_CUSTOMER_ADDRESS_NEW fa JOIN PDANEW_CUSTOMER_ADDRESS lfa WHERE fa.file_no = '"+ file_no + "'and fa.file_no = lfa.file_no and lfa.cust_number=fa.comm_custno"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
                            var address1=""
					    	var latitude="";
					    	var longitude="";
					    	var addresstype="";
							//var permaddrs=""

					 
					    		latitude=res.rows.item(i).comm_latitude,
					    		longitude=res.rows.item(i).comm_longitude,
					    		addresstype="C"
	
								address.push({
									addresstype: res.rows.item(i).addr_type,
									   capacity:'B',
									   comm_custno:res.rows.item(i).cust_number,
									   file_no:res.rows.item(i).file_no,
								   //	permaddrs:res.rows.item(i).perm_address,
									   address:res.rows.item(i).comm_address,
									   comm_longitude:res.rows.item(i).comm_longitude,
									   comm_latitude:res.rows.item(i).comm_latitude,
								
									   comm_address:res.rows.item(i).comm_address,
									   latitude:latitude,
									   longitude:longitude,
									   addtype:addresstype,
									   srno:res.rows.item(i).srno
	
								}); 
					    	
					    	
						
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(address);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

// GetCustomerAddress_lacDetails(file_no){
// 	var address=[];
//  	return new Promise((resolve,reject)=>{
// 			this.sqlite.create(this.options)
// 			.then((db : SQLiteObject) => {
// 				let sSelectSqlstmt1= 
// 				"select distinct lfa.addr_type,lfa.capacity,lfa.cust_number,lfa.file_no,fa.address,fa.comm_address,fa.srno,fa.prop_address,fa.perm_address,fa.empl_address,fa.file_no,fa.comm_custno,fa.empl_latitude,fa.empl_longitude,fa.comm_longitude,fa.comm_latitude,fa.prop_latitude,fa.prop_longitude from PDANEW_CUSTOMER_ADDRESS_NEW fa JOIN PDANEW_CUSTOMER_ADDRESS lfa WHERE fa.file_no = '"+ file_no + "'and fa.file_no = lfa.file_no and lfa.cust_number=fa.comm_custno and lfa.addr_type='C' and lfa.capacity='B'"
// 				db.executeSql(sSelectSqlstmt1, [])
// 					.then(res =>
// 					{
// 					if (res.rows.length > 0) {
// 					    for (let i=0; i < res.rows.length; i++){
//                             var address1=""
// 					    	var latitude="";
// 					    	var longitude="";
// 					    	var addresstype="";
// 							//var permaddrs=""

// 					    	if(res.rows.item(i).addr_type=="C"){
// 					    		latitude=res.rows.item(i).comm_latitude,
// 					    		longitude=res.rows.item(i).comm_longitude,
// 					    		address1=res.rows.item(i).comm_address,
// 					    		addresstype="C"
// 								//comm_address:res.rows.item(i).comm_address
// 					    	}
					    	
// 							address.push({
// 		    					addresstype: res.rows.item(i).addr_type,
// 		   						capacity:res.rows.item(i).capacity,
// 		   						comm_custno:res.rows.item(i).cust_number,
// 		   						file_no:res.rows.item(i).file_no,
// 		   					//	permaddrs:res.rows.item(i).perm_address,
// 		   						address:address1,
// 		   						empl_latitude:res.rows.item(i).empl_latitude,
// 		   						empl_longitude:res.rows.item(i).empl_longitude,
// 		   						comm_longitude:res.rows.item(i).comm_longitude,
// 		   						comm_latitude:res.rows.item(i).comm_latitude,
// 		   						prop_latitude:res.rows.item(i).prop_latitude,
// 		   						prop_longitude:res.rows.item(i).prop_longitude,
// 		   						comm_address:res.rows.item(i).comm_address,
// 		   						prop_address:res.rows.item(i).prop_address,
// 		   						empl_address:res.rows.item(i).empl_address,
// 		   						latitude:res.rows.item(i).comm_latitude,,
// 		   						longitude:res.rows.item(i).comm_longitude,
// 		   						addtype:addresstype,
// 		   						srno:res.rows.item(i).srno

// 		                    }); 
// 		                }

// 				    }
// 	     			console.log(res);
// 					})
// 					.then(res => {
// 	            	resolve(address);
// 				}).catch(e=>console.log(e))

// 			}).catch(e=>console.log(e))
// 		})
// }

getPermanentaddress(file_no){
	var permaddrss=[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select perm_address from PDANEW_CUSTOMER_ADDRESS_NEW WHERE file_no ="+ file_no 
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length>0) {

					    for (let i=0; i < res.rows.length; i++){
					    	if(res.rows.item(i).perm_address!=null){
							permaddrss.push({
		    					perm_address: res.rows.item(i).perm_address,
		                    }); 
						}
		                }
				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(permaddrss);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetFu_actionPopoverDetails(lac_no,sr_no){
	var faction=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select action,date_of_action,response,def_observ,opr_id,remark,srno from PDANEW_LAC_FU_ACTION WHERE LAC_NO = "+lac_no+" AND SRNO ='" + sr_no + "'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							faction.push({
		    					action: res.rows.item(i).action,
		   						date_of_action: (res.rows.item(i).date_of_action).toString().slice(0,10),
		   						response: res.rows.item(i).response,
		   						def_observ: res.rows.item(i).def_observ,
		   						opr_id: res.rows.item(i).opr_id,
		   						remark: res.rows.item(i).remark,
		   						srno: res.rows.item(i).srno,
		                    }); 
		                }
				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(faction);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetFu_actionDetails_1(lac_no){
	console.log(lac_no);
	var faction=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select action,date_of_action,response,def_observ,opr_id,remark,srno from PDANEW_LAC_FU_ACTION WHERE LAC_NO = "+lac_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							faction.push({
		    					action: res.rows.item(i).action,
		   						date_of_action:(res.rows.item(i).date_of_action).toString().slice(0,10),
		   						response: res.rows.item(i).response,
		   						def_observ: res.rows.item(i).def_observ,
		   						opr_id: res.rows.item(i).opr_id,
		   						remark: res.rows.item(i).remark,
		   						srno:res.rows.item(i).srno,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(faction);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetLegalAction(lac_no){
	var legalaction=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select lfa.date_of_action,fa.remark,lfa.action,fa.activity_type from PDANEW_FULG_ACTIONS fa GetCustomerAddress PDANEW_LAC_FU_ACTION lfa WHERE fa.lac_no = "+lac_no+" and fa.lac_no = lfa.lac_no"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							legalaction.push({
		    					action: res.rows.item(i).action ,
		   						date_of_action:(res.rows.item(i).date_of_action).toString().slice(0,10),
		   						remark: res.rows.item(i).remark,
		   						activity_type:res.rows.item(i).activity_type,
		   						
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(legalaction);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetEmiTrans(lac_no){
	var EmiTrans=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select rcbl,rcvd,os,tr_desc,bank_nm,bnc_reason,tran_dt from PDANEW_EMI_TRANS WHERE lac_no = "+lac_no+" ORDER BY tran_dt DESC "
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							EmiTrans.push({
		    					rcbl: res.rows.item(i).rcbl ,
		   						rcvd: res.rows.item(i).rcvd,
		   						os: res.rows.item(i).os,
		   						tr_desc: res.rows.item(i).tr_desc,
		   						bank_nm: res.rows.item(i).bank_nm,
		   						bnc_reason: res.rows.item(i).bnc_reason,
		   						tran_dt:res.rows.item(i).tran_dt.toString().slice(0,10),
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(EmiTrans);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetEmiTransTotal(lac_no){
	var EmiTranst=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "Select rcbl ,rcvd ,os  FROM PDANEW_EMI_TRANS  t  where t.LAC_NO= '"+lac_no+"' and  t.tran_dt='1666-01-30T12:00:00';"

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							EmiTranst.push({
		    					rcbl: res.rows.item(i).rcbl ,
		   						rcvd: res.rows.item(i).rcvd,
		   						os: res.rows.item(i).rcbl - res.rows.item(i).rcvd,
		   						
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(EmiTranst);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}



GetPmiTrans(lac_no){
	var PmiTrans=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select rcbl,rcvd,os,effective_dt,tr_type,timestamp,bnc_reason from PDANEW_PMI_TRANS  WHERE lac_no = "+lac_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							PmiTrans.push({
		    					rcbl: res.rows.item(i).rcbl ,
		   						rcvd: res.rows.item(i).rcvd,
		   						os: res.rows.item(i).os,
		   						tr_type: res.rows.item(i).tr_type,
		   						bnc_reason:res.rows.item(i).bnc_reason,
		   						effective_dt:(res.rows.item(i).effective_dt).toString().slice(0,10),
		   						timestamp:(res.rows.item(i).timestamp).toString().slice(0,10),
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(PmiTrans);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetPmiTransTotal(lac_no){
	var EmiTranst=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT sum(ifnull(RCBL,0)) as a, sum(ifnull(RCVD,0)) as b, sum(ifnull(OS,0)) as c  FROM PDANEW_PMI_TRANS t where t.LAC_NO= '"+lac_no+"'"


				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							EmiTranst.push({
		    					rcbl: res.rows.item(i).a ,
		   						rcvd: res.rows.item(i).b,
		   						os: res.rows.item(i).a - res.rows.item(i).b,
		   						
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(EmiTranst);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}



GetAITrans(lac_no){
	var AITrans=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select tran_dt,ai_rcbl,ai_rcvd,ai_out,mr_rcbl,mr_rcvd,mr_out from PDANEW_AI_IC WHERE lac_no = "+lac_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							AITrans.push({
		   						tran_dt: (res.rows.item(i).tran_dt).toString().slice(0,10),
		   						ai_rcbl: res.rows.item(i).ai_rcbl,
		   						ai_rcvd: res.rows.item(i).ai_rcvd,
		   						ai_out: res.rows.item(i).ai_out,
		   						mr_rcbl: res.rows.item(i).mr_rcbl,
		   						mr_rcvd: res.rows.item(i).mr_rcvd,
		   						mr_out: res.rows.item(i).mr_out,
		   				
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(AITrans);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

GetIlpsRemarks(file_no){
	var IlpsRemarks=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select REMARKS,UPD_DATE from PDANEW_ILPS_REMARKS WHERE FILE_NO ="+file_no+" ORDER BY UPD_DATE DESC "
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							IlpsRemarks.push({
		    					remarks: res.rows.item(i).REMARKS ,
		   						upd_date: (res.rows.item(i).UPD_DATE).toString().slice(0,10),
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(IlpsRemarks);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
GetLacRemarks(file_no){
	var LacRemarks=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select REMARKS,LAST_UPD,OPR_ID from PDANEW_LAC_REMARKS WHERE LAC_NO ="+file_no+" ORDER BY last_upd DESC "
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							LacRemarks.push({
		    					remarks: res.rows.item(i).REMARKS ,
		   						last_upd: (res.rows.item(i).LAST_UPD).toString().slice(0,10),
		   						opr_id:res.rows.item(i).OPR_ID,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(LacRemarks);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

GetTabAlerts(file_no){
	var tabalert=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select ALERT_DATE,BORR_NAME,ALERT_NAME,ALERT_TEXT,REMARKS from TAB_DAILY_ALERTS WHERE LAC_NO ="+file_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
						console.log(file_no);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							tabalert.push({
		    					BORR_NAME: res.rows.item(i).BORR_NAME ,
		   						ALERT_DATE:(res.rows.item(i).ALERT_DATE).toString().slice(0,10),
		   						ALERT_NAME:res.rows.item(i).ALERT_NAME,
		   						ALERT_TEXT:res.rows.item(i).ALERT_TEXT,
		   						REMARKS:res.rows.item(i).REMARKS,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(tabalert);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
GetLacTerms(file_no){
	var LacTerms=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select TO_DT,AMT,T_TYPE,ROI,UPD_DATE,FROM_DT,PERIODICITY from PDANEW_LAC_TERMS WHERE LAC_NO ="+file_no+" ORDER BY TO_DT DESC "
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							LacTerms.push({
		    					AMT: res.rows.item(i).AMT ,
		   						TO_DT: (res.rows.item(i).TO_DT).toString().slice(0,10),
		   						FROM_DT: (res.rows.item(i).FROM_DT).toString().slice(0,10),
		   						UPD_DATE: (res.rows.item(i).UPD_DATE).toString().slice(0,10),
		   						T_TYPE:res.rows.item(i).T_TYPE,
		   						ROI:res.rows.item(i).ROI,
		   						PERIODICITY:res.rows.item(i).PERIODICITY

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(LacTerms);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
GetLacTerAmrt(file_no){
	var LacTerAmrt=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select AMRT_FR_DT,DT_OF_AMRT,AMRT_TO_DT,YYYYYY from PDANEW_LAC_AMRT WHERE LAC_NO ="+file_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							LacTerAmrt.push({
		    					AMRT_FR_DT:(res.rows.item(i).AMRT_FR_DT).toString().slice(0,10) ,
		   						DT_OF_AMRT:(res.rows.item(i).DT_OF_AMRT).toString().slice(0,10),
		   						AMRT_TO_DT:(res.rows.item(i).AMRT_TO_DT).toString().slice(0,10),
		   						YYYYYY:(res.rows.item(i).YYYYYY),
		   						PERIODICITY:res.rows.item(i).PERIODICITY
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(LacTerAmrt);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}


GetLacDinfo(file_no){
	var LacDinfo=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select RISK_EVENT,UPDATED_BY,UPDATED_DATE from PDANEW_LAC_DEFAULT_INFO WHERE LAC_NO ="+file_no
					db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							LacDinfo.push({
		    					RISK_EVENT: res.rows.item(i).RISK_EVENT ,
		   						UPDATED_BY: res.rows.item(i).UPDATED_BY,
		   						UPDATED_DATE: (res.rows.item(i).UPDATED_DATE).toString().slice(0,10),
		   						
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(LacDinfo);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
GetActRe(file_no){
	var ActRe=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select NXT_ACTION,DEF_OBSERV,NAME from PDANEW_FU_ACT_REMINDER WHERE LAC_NO ="+file_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							ActRe.push({
		    					NXT_ACTION:(res.rows.item(i).NXT_ACTION).toString().slice(0,10) ,
		   						DEF_OBSERV:res.rows.item(i).DEF_OBSERV,
		   						NAME:res.rows.item(i).NAME,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(ActRe);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

GetLgDocs(file_no){
	var LgDocs=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select original,doc_code,action_date from PDANEW_LG_DOCUMENTS WHERE file_no ="+file_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							LgDocs.push({
		    					original: res.rows.item(i).original ,
		   						doc_code:res.rows.item(i).doc_code,
		   						action_date:(res.rows.item(i).action_date).toString().slice(0,10),
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(LgDocs);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

GetFuActdetails(file_no){
	var Fuaction_info=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select DATE_OF_ACTION,ACTION,AMOUNT_TOBECHG,ACTION_DESC from PDACRM_FULG_ACTIONS WHERE LAC_NO ="+file_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							Fuaction_info.push({
		    					DATE_OF_ACTION:(res.rows.item(i).DATE_OF_ACTION).toString().slice(0,10),
		   						ACTION_DESC:res.rows.item(i).ACTION_DESC,
		   						ACTION:res.rows.item(i).ACTION,
		   						AMOUNT_TOBECHG:res.rows.item(i).AMOUNT_TOBECHG,

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(Fuaction_info);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}


GetCriticalInfo(file_no){
	var criticalinfo=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select DATE_OF_ACTION,UPD_DATE,SPECIAL_INFO_TYPE from PDANEW_CRITICAL_INFO WHERE LAC_NO ="+file_no
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							criticalinfo.push({
		    					DATE_OF_ACTION:(res.rows.item(i).DATE_OF_ACTION).toString().slice(0,10),
		   						UPD_DATE:(res.rows.item(i).UPD_DATE).toString().slice(0,10),
		   						SPECIAL_INFO_TYPE:res.rows.item(i).SPECIAL_INFO_TYPE,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(criticalinfo);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

GetAITransTotal(lac_no){
	var AITranstot=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT sum(ifnull(AI_RCBL,0)) as a, sum(ifnull(AI_RCVD,0)) as b, sum(ifnull(AI_OUT,0)) as c, sum(ifnull(MR_RCBL,0)) as d, sum(ifnull(MR_RCVD,0)) as e, sum(ifnull(MR_OUT,0)) as f FROM PDANEW_AI_IC t where t.LAC_NO= '"+lac_no+"'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
					    
							AITranstot.push({
								total_rcbl:res.rows.item(i).a,
								total_rcvd:res.rows.item(i).b,
								total_out:res.rows.item(i).a-res.rows.item(i).b ,
								mr_rcbl:res.rows.item(i).d,
								mr_rcvd:res.rows.item(i).e,
								mr_out:res.rows.item(i).d-res.rows.item(i).e,


								   
    
     // transRes.push({"total":"AI TOTAL","a":result[0].a,"b":result[0].b,"c":l});
     // transRes.push({"total":"MR TOTAL","a":result[0].d,"b":result[0].e,"c":m});



					// 			MR_TOT:res.rows.item(i).d+res.rows.item(i).e+res.rows.item(i).l,
					// 			AI_TOT:res.rows.item(i).a+res.rows.item(i).b+res.rows.item(i).m,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(AITranstot);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

LacMasterDetailsSort(sortorder,sorttype){
 var sortitems=[];

return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
			//	let sSelectSqlstmt1= "select max_action_date,company_arrangement,followupflag,my_basket,lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level from PDANEW_LAC_MASTER where lac_no !='' ORDER BY " + sorttype + " " + sortorder 
			let sSelectSqlstmt ="SELECT p.os_months_emi,p.max_action_date,p.company_arrangement,p.os_months_pmi,p.lac_no,p.file_no,p.prop_no,p.srno,p.borr_name,p.follow_up_ind,p.prin_os_last_tr_comb,p.months_os,area_desc,p.customer_grade,p.prop_area_desc,p.fu_area_desc,p.emp_area_desc,p.selfemp_company_name,p.plt,p.prop_name,p.difficulty_level,p.my_basket,p.followupflag,count(u.lac_no)as total_acc_cnt,sum(u.plt_comb)as all_plt FROM PDANEW_LAC_MASTER p join pdanew_unique_id_accounts u on p.lac_no=u.lac_no where p.lac_no !='' GROUP BY p.lac_no ORDER BY "+ 'p.'+sorttype + " " + sortorder;


			//"SELECT p.os_months_emi,p.max_action_date,p.company_arrangement,p.os_months_pmi,p.lac_no,p.file_no,p.prop_no,p.srno,p.borr_name,p.follow_up_ind,p.prin_os_last_tr_comb,p.months_os,area_desc,p.customer_grade,p.prop_area_desc,p.fu_area_desc,p.emp_area_desc,p.selfemp_company_name,p.plt,p.prop_name,p.difficulty_level,p.my_basket,p.followupflag,count(u.lac_no)as total_acc_cnt,sum(u.plt_comb)as all_plt FROM PDANEW_LAC_MASTER p join pdanew_unique_id_accounts u on p.lac_no=u.lac_no where lac_no !='' ORDER BY " + sorttype + " " + sortorder +'GROUP BY p.lac_no';
			debugger;
			db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							sortitems.push({
								LAC_NO: res.rows.item(i).lac_no,
		   						BORR_NAME: res.rows.item(i).borr_name,
		   						FOLLOW_UP_IND:res.rows.item(i).follow_up_ind,
		   						PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
		   						MONTHS_OS: res.rows.item(i).months_os,
		   						AREA_DESC: res.rows.item(i).area_desc,
		   						CUSTOMER_GRADE: res.rows.item(i).customer_grade,
		   						PROP_AREA_DESC:res.rows.item(i).prop_area_desc,
		   						PROP_NAME: res.rows.item(i).prop_name,
		   						EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
		   						M_OS:res. rows.item(i).plt,
		   						FOLLOW_UP: res.rows.item(i).fu_area_desc,
		   						EMP_AREA: res.rows.item(i).emp_area_desc,
		   						difficulty_level:res.rows.item(i).difficulty_level,
		   						my_basket:res.rows.item(i).my_basket,
		   						followupflag:res.rows.item(i).followupflag,
		   						max_action_date:res.rows.item(i).max_action_date,
								company_arrangement:res.rows.item(i).company_arrangement,
								no_of_acc:res.rows.item(i).total_acc_cnt,
								plt_count:res.rows.item(i).all_plt

							

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(sortitems);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

LacMasterSetLevel(lac_no,level,remark){
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "UPDATE PDANEW_LAC_MASTER SET difficulty_level ='" + level + "',level_remarks ='" + remark +
        "' WHERE  lac_no ="+lac_no

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
				 }).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

LacMasterMyBasket(lac_no,basketname){
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "UPDATE PDANEW_LAC_MASTER SET my_basket='" + basketname + "' WHERE  lac_no =" + lac_no 
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
				 }).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
// LacMasterSelectMyBasket(){
// 	return new Promise((resolve,reject)=>{
// 			this.sqlite.create(this.options)
// 			.then((db : SQLiteObject) => {
// 				let sSelectSqlstmt1= "select distinct my_basket as basket_name from PDANEW_LAC_MASTER where my_basket !=''"
// 				db.executeSql(sSelectSqlstmt1, [])
// 					.then(res =>
// 					{
// 					console.log(res);
// 				 }).catch(e=>console.log(e))

// 			}).catch(e=>console.log(e))
// 		})

// }

LacMasterSelectMyBasket(){
var SelectMyBasket=[];
return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select distinct my_basket from PDANEW_LAC_MASTER where my_basket !='' and my_basket!='undefined'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							SelectMyBasket.push({
								basket:res.rows.item(i).my_basket
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(SelectMyBasket);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})


}

LacMasterInsertMyBasket(basketname){
	return new Promise((resolve,reject) => {
	  	this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			    let sInsertAppMasterScript = "INSERT INTO PDANEW_LAC_MASTER(lac_no ,  my_basket) values(?,?)";
				db.executeSql(sInsertAppMasterScript,["",basketname])
				.then(res => {
					resolve(res)})
				.catch(e => {console.log(e) ; reject(e);});
							
	    })
	    .catch(e => alert(e));
	    })	
}

GetReminders(){
//var Reminders =[];
this.reminders=[];
//var current_date=new Date();
return new Promise((resolve,reject)=>{

 			if(this.reminders.length == 0){
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				//console.log(len);
				let sSelectSqlstmt = "select DATETIME('now') as datenow,LAC_NO,NAME,DEF_OBSERV,NXT_ACTION from PDANEW_FU_ACT_REMINDER where NXT_ACTION >=datenow"
					console.log(sSelectSqlstmt);
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
						console.log(res.rows.length);
					if (res.rows.length > 0) {

					    for (let i=0; i < res.rows.length; i++){
							//length=res.rows.length;
							
						//	 var reninder_date=new Date(res.rows.item(i).NXT_ACTION);


							// if(res.rows.item(i).lac_no!="" && reninder_date>=current_date)
							 if(res.rows.item(i).lac_no!="")
							{
					    		this.reminders.push({
					    		LAC_NO:res.rows.item(i).LAC_NO,
								NAME:res.rows.item(i).NAME,
								DEF_OBSERV:(res.rows.item(i).DEF_OBSERV).toString().slice(0,10),
								NXT_ACTION:res.rows.item(i).NXT_ACTION,
		                    }); 
							}
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(this.reminders);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		}
		else{
			resolve(this.reminders);
		}


		})

}
/////////////////sort by latest date/////////////////////
Reminders_by_Latest_date(){
	var Reminderslatest =[];
	return new Promise((resolve,reject)=>{
			if(this.reminders.length == 0){
				this.sqlite.create(this.options)
				.then((db : SQLiteObject) => {
					let sSelectSqlstmt = "select LAC_NO,NAME,DEF_OBSERV,NXT_ACTION from PDANEW_FU_ACT_REMINDER ORDER BY NXT_ACTION  DESC LIMIT 3"
						console.log(sSelectSqlstmt);
						db.executeSql(sSelectSqlstmt, [])
						.then(res =>
						{
							console.log(res.rows.length);
						if (res.rows.length > 0) {
	
							for (let i=0; i < res.rows.length; i++){
								   if(res.rows.item(i).lac_no!=""){
									Reminderslatest.push({
									LAC_NO:res.rows.item(i).LAC_NO,
									NAME:res.rows.item(i).NAME,
									DEF_OBSERV:(res.rows.item(i).DEF_OBSERV).toString().slice(0,10),
									NXT_ACTION:res.rows.item(i).NXT_ACTION,
								}); 
								}
							}
	
						}
						 console.log(res);
						})
						.then(res => {
						resolve(this.reminders);
					}).catch(e=>console.log(e))
				}).catch(e=>console.log(e))
			}
			// else{
			// 	resolve(this.reminders);
			// }

			})
	
	}

fuaction_ci_type(){
var ci_type =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT para_desc,para_value FROM PDANEW_LAC_USER_PARA WHERE para_code = 'CI_TYPE'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							ci_type.push({
								para_desc:res.rows.item(i).para_desc,
								para_value:res.rows.item(i).para_value
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(ci_type);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

fuaction_risk_event(){
var risk_event =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "Select para_code,para_value,para_desc From pdanew_lac_user_para Where PARA_CODE='RISK'"

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							risk_event.push({
								para_desc:res.rows.item(i).para_desc,
								para_code:res.rows.item(i).para_code,
								para_value:res.rows.item(i).para_value,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(risk_event);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

f_action_search(action,actionvaldata){
	var f_search =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT para_code,para_value,para_desc,para_value FROM PDANEW_LAC_USER_PARA WHERE para_code = '"+action+"' AND para_desc like '%" +
         actionvaldata + "%'";

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							f_search.push({
								para_desc:res.rows.item(i).para_desc,
								para_code:res.rows.item(i).para_code,
								para_value:res.rows.item(i).para_value,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(f_search);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})


}
f_action_searchareacode(action,actionvaldata){
	var f_searchlist =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '"+action+"'  AND para_desc like '%" +
         actionvaldata + "%'";

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							f_searchlist.push({
								para_desc:res.rows.item(i).para_desc,
								para_code:res.rows.item(i).para_code,
								para_value:res.rows.item(i).para_value,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(f_searchlist);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})


}
f_action_response_cd(action,actionvaldata){
	var f_response_cd =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '"+action+"'  AND para_desc like '%" +
         actionvaldata + "%'";

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							f_response_cd.push({
								para_desc:res.rows.item(i).para_desc,
								para_code:res.rows.item(i).para_code,
								para_value:res.rows.item(i).para_value,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(f_response_cd);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}

f_action_DEF_OBS_CD(action,actionvaldata){
	var f_DEF_OBS_CD =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '"+action+"'  AND para_desc like '%" +
         actionvaldata + "%'";

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							f_DEF_OBS_CD.push({
								para_desc:res.rows.item(i).para_desc,
								para_code:res.rows.item(i).para_code,
								para_value:res.rows.item(i).para_value,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(f_DEF_OBS_CD);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}


f_ACTION_TO_BE_CD(action,actionvaldata){
	var f_ACTION_TO_BE_CD =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '"+action+"'  AND para_desc like '%" +
         actionvaldata + "%'";

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							f_ACTION_TO_BE_CD.push({
								para_desc:res.rows.item(i).para_desc,
								para_code:res.rows.item(i).para_code,
								para_value:res.rows.item(i).para_value,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(f_ACTION_TO_BE_CD);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}


getBorrDetails(){
var borr_details =[];
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = 'BORR_RELATION'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							borr_details.push({
								para_desc:res.rows.item(i).para_desc,
								para_value:res.rows.item(i).para_value
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(borr_details);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
//////////////////////////////insert into upload tables ////////////////////////////////////////////////////////////////////////////////////

insertIntoProp_Class (classcode, lacno, specificvalue,ldapid){ 
	var PDANEW_PROP_CLASS_DATA =[]; 
	 //--select values from App_Table_Master,insert into app_table_master and update last_sync_on=last maxtimestamp and current timestamp into maxtimestamp
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
			            //this.getAppMasterUserID();
						let sInsertAppTableMasterScript = "INSERT INTO PDANEW_PROP_CLASS(class_code,lac_no,specific_value,ldap_id) VALUES(?,?,?,?)";
							db.executeSql(sInsertAppTableMasterScript, [classcode,lacno,specificvalue,ldapid]).then(()=>{
							// let UpdateSql="UPDATE PDANEW_PROP_CLASS SET UPLOADED_FLAG='N' where lac_no="+lacno;
							// 	db.executeSql(UpdateSql,[]).then(res=>{
							// 	console.log(res);
							// })
							let SelectSql = "SELECT * FROM PDANEW_PROP_CLASS where lac_no="+lacno;
								db.executeSql(SelectSql, []).then(res => {
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									PDANEW_PROP_CLASS_DATA.push(res.rows.item(i));
								}
								resolve(PDANEW_PROP_CLASS_DATA);

						})
							
					})	

			})

			.catch(e => {reject(e) ; console.log(e) });
		})
	}


Delete_Class(lacno){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="DELETE FROM PDANEW_PROP_CLASS  where lac_no="+lacno;
								db.executeSql(UpdateSql,[]).then(res=>{
								console.log(res);
							})

				})
		})

}
deleteallPropClass(){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="DELETE FROM PDANEW_PROP_CLASS ";
								db.executeSql(UpdateSql,[]).then(res=>{
								console.log(res);
								resolve(res);

							})

				})
		})
}
SelectProp_Class(lacno){
	var propclass=[];
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT * FROM  PDANEW_PROP_CLASS where lac_no="+lacno;
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									propclass.push(res.rows.item(i));
								}
								resolve(propclass);
							})
				})
		})

}

selectPropClassCode(lacno){
	var classcode=[];
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT class_code from  PDANEW_PROP_CLASS where lac_no="+lacno;
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									classcode.push(res.rows.item(i));
								}
								resolve(classcode);
							})
				})
		})

}
selectallPropClass(){
	var propclassall=[];
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT * FROM  PDANEW_PROP_CLASS";
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									propclassall.push(res.rows.item(i));
								}
								resolve(propclassall);
							})
				})
		})
}
insertIntonew_fu_action (lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,actndate,ldapid,version_no){   //--select values from App_Table_Master,insert into app_table_master and update last_sync_on=last maxtimestamp and current timestamp into maxtimestamp
		var PDANEW_NEW_FU_ACTION_DATA = []; 
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
			
						let sInsertAppTableMasterScript = "INSERT INTO PDANEW_NEW_FU_ACTION(lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,date_of_action,ldap_id,version_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
						
						db.executeSql(sInsertAppTableMasterScript, [lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,actndate,ldapid,version_no]).then(()=>{
							let SelectSql = "SELECT * FROM PDANEW_NEW_FU_ACTION where lac_no="+lac_no;
								db.executeSql(SelectSql, []).then(res => {
									console.log(res);

									for (let i=0; i < res.rows.length; i++){
									PDANEW_NEW_FU_ACTION_DATA.push(res.rows.item(i));
								}
									resolve(PDANEW_NEW_FU_ACTION_DATA);
									
								})	
						})
					
			})
			.catch(e => {reject(e) ; console.log(e) });
		})
	}


insertIntonew_fu_action1 (lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,actndate,ldapid,version_no){   //--select values from App_Table_Master,insert into app_table_master and update last_sync_on=last maxtimestamp and current timestamp into maxtimestamp
		var PDANEW_NEW_FU_ACTION_DATA = []; 
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
			
						let sInsertAppTableMasterScript = "INSERT INTO PDANEW_NEW_FU_ACTION(lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,date_of_action,ldap_id,version_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
						db.executeSql(sInsertAppTableMasterScript, [lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,actndate,ldapid,version_no]).then(()=>{
							let SelectSql = "SELECT * FROM PDANEW_NEW_FU_ACTION where lac_no="+lac_no;
								db.executeSql(SelectSql, []).then(res => {
									console.log(res);

									for (let i=0; i < res.rows.length; i++){
									PDANEW_NEW_FU_ACTION_DATA.push(res.rows.item(i));
								}
								 	resolve(PDANEW_NEW_FU_ACTION_DATA);
									
								 })	
						})
					
			})
			.catch(e => {reject(e) ; console.log(e) });
		})
	}
Delete_new_fu_action(lacno){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="DELETE FROM PDANEW_NEW_FU_ACTION  where lac_no="+lacno;
								db.executeSql(UpdateSql,[]).then(res=>{
								console.log(res);
							})

				})
		})

}

Selectnew_fu_action(lacno){
	var fuact=[];
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT * FROM  PDANEW_NEW_FU_ACTION where lac_no="+lacno;
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									fuact.push(res.rows.item(i));
								}
								resolve(fuact);
							})
				})
		})

}
selectallnew_fu_action(){
	var propclassall=[];
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT * FROM PDANEW_NEW_FU_ACTION  ";
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									propclassall.push(res.rows.item(i));
								}
								resolve(propclassall);
							})
				})
		})
}
deleteallnew_fu_action(){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="DELETE FROM PDANEW_NEW_FU_ACTION ";
								db.executeSql(UpdateSql,[]).then(res=>{
								console.log(res);
								resolve(res);
							})

				})
		})
}
insertIntoContact_Update(lac_no,name,relation,address1,address2,mobile1,mobile2,email_id,off_tel_no,res_tel_no,fax,ldap_id){   //--select values from App_Table_Master,insert into app_table_master and update last_sync_on=last maxtimestamp and current timestamp into maxtimestamp
	var PDANEW_NEW_COMMN_DETAILS = []; 
		console.log(lac_no,name,relation,address1,address2,mobile1,mobile2,email_id,off_tel_no,res_tel_no,fax,ldap_id);
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
			
						let sInsertAppTableMasterScript = "INSERT INTO PDANEW_NEW_COMM_OTH_DETAILS(lac_no,name,relation,address1,address2,mobile1,mobile2,email_id,off_tel_no,res_tel_no,fax,ldap_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
						db.executeSql(sInsertAppTableMasterScript, [lac_no,name,relation,address1,address2,mobile1,mobile2,email_id,off_tel_no,res_tel_no,fax,ldap_id]).then(()=>{
							let SelectSql = "SELECT * FROM PDANEW_NEW_COMM_OTH_DETAILS where lac_no="+lac_no;
								db.executeSql(SelectSql, []).then(res => {
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									PDANEW_NEW_COMMN_DETAILS.push(res.rows.item(i));
								}
									resolve(PDANEW_NEW_COMMN_DETAILS);

									console.log(PDANEW_NEW_COMMN_DETAILS);
								})	
						})
					
				})

			.catch(e => {reject(e) ; console.log(e) });
		})
	}
Delete_Contact_Update(lacno){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="DELETE FROM PDANEW_NEW_COMM_OTH_DETAILS  where lac_no="+lacno;
								db.executeSql(UpdateSql,[]).then(res=>{
								console.log(res);
							})

				})
		})

}
SelectContact_Update(lacno){
	var Contact_Update=[];
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT * FROM  PDANEW_NEW_COMM_OTH_DETAILS where lac_no="+lacno;
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									Contact_Update.push(res.rows.item(i));
								}
								resolve(Contact_Update);
							})
				})
		})

}
selectallContact_Update(){
	var propclassall=[];
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT * FROM PDANEW_NEW_COMM_OTH_DETAILS ";
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									propclassall.push(res.rows.item(i));
								}
								resolve(propclassall);
							})
				})
		})
}
deleteallContact_Update(){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="DELETE FROM PDANEW_NEW_COMM_OTH_DETAILS ";
								db.executeSql(UpdateSql,[]).then(res=>{
								console.log(res);
								resolve(res);
							})

				})
		})
}
	GlobalUpload(){
		let totalrows=[];
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="SELECT (Select COUNT(*) AS MyCount FROM PDANEW_PROP_CLASS) + (SELECT COUNT(*) AS MyCount FROM PDANEW_NEW_FU_ACTION) + (SELECT COUNT(*) AS MyCount FROM PDANEW_NEW_COMM_OTH_DETAILS) as total_rows"
 
								db.executeSql(UpdateSql,[]).then(res=>{
									console.log(res);
									for (let i=0; i < res.rows.length; i++){
									totalrows.push({totalcount:res.rows.item(i).total_rows});
								}
								resolve(totalrows);
							})
				})


			// let resolveObj=[];
			// let uploaddata=[];
			// this.sqlite.create(this.options)
			// .then((db : SQLiteObject) => {				
			// 				let SelectSql = "SELECT * FROM PDANEW_NEW_COMM_OTH_DETAILS ;"
			// 					 var promise1 =db.executeSql(SelectSql, []).then(res => {
			// 						console.log(res);
			// 						for (let i=0; i < res.rows.length; i++){
			// 						resolveObj.push({ data1:res.rows.item(i)});
			// 						}
			// 						//resolve(resolveObj);
			// 						console.log(resolveObj);
			// 						}).then((result)=>{
			// 							let SelectSql2 = "SELECT * FROM PDANEW_NEW_FU_ACTION ;"
			// 							var promise2 =db.executeSql(SelectSql2, []).then(res => {
			// 							console.log(res);
			// 								for (let i=0; i < res.rows.length; i++){
			// 								this.NEW_FU_ACTION.push({data2:res.rows.item(i)});
			// 								}
			// 							//resolve(this.NEW_FU_ACTION);
			// 							console.log(this.NEW_FU_ACTION);	
			// 						})
			// 					}).then((result)=>{
			// 						let SelectSql3 = "SELECT * FROM PDANEW_PROP_CLASS ;"
   //         							 var promise3=db.executeSql(SelectSql3, []).then(res => {
   //           							console.log(res);
   //          						 for (let i=0; i < res.rows.length; i++){
   //           							this.NEW_PROP_CLASS.push({data3:res.rows.item(i)});
   //          							}
   //          							//resolve(this.NEW_PROP_CLASS);
   //          							console.log(this.NEW_PROP_CLASS);
            		 				
			// 					})
								
			// 				}).then((result=>{
			// 					return Promise.all([resolveObj,this.NEW_FU_ACTION,this.NEW_PROP_CLASS])
			// 					.then((res)=> {
								
			// 						resolve(res);
  	// 							//uploaddata=result;
  	// 							//this.upload_data=uploaddata;
  	// 							console.log(res);
  	// 							//console.log(this.upload_data);
  	// 							return res;
			// 					});	
			// 				}))

			// 				})
				
//////////////////////////////////////////////return with promise.all////////////////////////////////////////////////////////////
				
// this.upload_data=uploaddata;
// console.log(this.upload_data);

		})

	}
	updatefollowupflag(gflag,lacno){////////--update session id//////////
		console.log(lacno,gflag);
		return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sUpdateAppMasterScript = "UPDATE PDANEW_LAC_MASTER SET followupflag =? WHERE lac_no=?";
		        db.executeSql(sUpdateAppMasterScript, [gflag,lacno])
		        .then(res => {
		        	console.log(res);
		        	resolve(res)
		        })
		    }).catch(e => reject(e));
		})
	}



	/////////////////////////////cross links followup page//////////////////////




// 	return new Promise((resolve, reject) => {
// 			this.sqlite.create(this.options)
// 			.then((db : SQLiteObject) => {
// 				let selectsql= "SELECT lac_no1 FROM PDANEW_UNIQUE_ID_ACCOUNTS WHERE lac_no="+lacno+ "and lac_no1!="+lacno;
// 								db.executeSql(selectsql,[]).then(res=>{
// 									console.log(res);
// 									for (let i=0; i < res.rows.length; i++){
// 									detailscrosslinks.push({
// 								lac_no1:res.rows.item(i).lac_no1
								
// 		                    }); 
// 							console.log(res.rows.item(i).lac_no1);

// 								}
//                                console.log(detailscrosslinks+'final res');
// 								resolve(detailscrosslinks);
//})
// // 				})
//  		})
//  }




SelectCrossLinkDetails(lacno){
	var detailscrosslinks=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT lac_no1 FROM PDANEW_UNIQUE_ID_ACCOUNTS WHERE lac_no='" + lacno+ "' and lac_no1!='" + lacno + "'" +" and plt_comb >0"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							detailscrosslinks.push({
		    					lac_no1: res.rows.item(i).lac_no1 ,
		    					action_cl:"",
		    					amount_cr_cl:""
		   						
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(detailscrosslinks);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
///////////////////////select difficulty level,my basket before syncing/////////////////
SelectSyncLacMaster(){
var selectsync=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT difficulty_level,my_basket FROM PDANEW_LAC_MASTER"
					db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							selectsync.push({
		    				difficulty_level:res.rows.item(i).difficulty_level,
		    				my_basket:res.rows.item(i).my_basket
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(selectsync);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}
SelectLevelUpd(){
	var levelupd=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select lac_no,difficulty_level,level_remarks from PDANEW_LAC_MASTER where difficulty_level !=''"
					db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							levelupd.push({
		    				LEVEL1:res.rows.item(i).difficulty_level,
		    				REMARK:res.rows.item(i).level_remarks,
		    				LAC_NO:res.rows.item(i).lac_no,


		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(levelupd);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

TechDetails(fileno){
	var techdtls=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT prop_name,builder_name,val_done,mode_of_apr FROM PDANEW_PROPERTY_MST where file_no="+fileno
					db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							techdtls.push({
		    				prop_name:res.rows.item(i).prop_name,
		    				builder_name:res.rows.item(i).builder_name,
		    				val_done:res.rows.item(i).val_done,
		    				mode_of_apr:res.rows.item(i).mode_of_apr

		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(techdtls);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

SelectFromViewDocs(lac_no){
	var selectviewdocs=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "SELECT srno,lac_no, doc_desc, doc_type, filename, offline_flag,downloaded_flag FROM PDANEW_VIEW_DOCS  WHERE LAC_NO='" + lac_no +
            "'"
					db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							selectviewdocs.push({
		    				SRNO:res.rows.item(i).srno,
		    				DOC_DESC:res.rows.item(i).doc_desc,
		    				DOC_TYPE:res.rows.item(i).doc_type,
		    				FILENAME:res.rows.item(i).filename,
		    				OFFLINE_FLAG:res.rows.item(i).offline_flag,
		    				DOWNLOADED_FLAG:res.rows.item(i).downloaded_flag,
		    				lac_no:res.rows.item(i).lac_no,
		                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
					console.log(selectviewdocs);
	            	resolve(selectviewdocs);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

/////////////////////////comm oth detls tab//////////////////////////////////
GetOtherCommDetails(file_no){
	var othcommdetail=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt = "select name,address1,address2,relation,mobile1,mobile2,email_id,off_tel_no,res_tel_no,fax from PDANEW_COMM_OTH_DETAILS where lac_no="+file_no
					db.executeSql(sSelectSqlstmt, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							othcommdetail.push({
		    					name: res.rows.item(i).BUILDER_NO,
		   						address1: res.rows.item(i).BUILDER_NAME,
		   						address2:res.rows.item(i).builder_contact,
		   						relation:res.rows.item(i).relation,
		   						mobile1:res.rows.item(i).mobile1,
		   						mobile2:res.rows.item(i).mobile2,
		   						email_id:res.rows.item(i).email_id,
		   						off_tel_no:res.rows.item(i).off_tel_no,
		   						res_tel_no:res.rows.item(i).res_tel_no,
		   						fax:res.rows.item(i).fax,

	                    }); 
		                }

				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(othcommdetail);
				}).catch(e=>console.log(e))
			}).catch(e=>console.log(e))
		})

}
///////////////////////////////bnc reason////////////////////////////////////////////////////////


GetBncReasonDtls(lac_no,tran_dt){
	var bncreason=[];
 	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "select bnc_reason,tran_dt from PDANEW_EMI_TRANS WHERE lac_no = "+lac_no+" AND tran_dt ='" + tran_dt +  "'"
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							bncreason.push({
		    				bnc_reason: res.rows.item(i).bnc_reason,
		                    }); 
		                }
				    }
	     			console.log(res);
					})
					.then(res => {
	            	resolve(bncreason);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})
}

///////////////////////////////////select diff level////////////////////////////

SelectMyBasketndDifflvl(){
var result=[];
return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {

				//let sSelectSqlstmt1= "select level_remarks,my_basket,difficulty_level,lac_no from PDANEW_LAC_MASTER where my_basket !='' or difficulty_level!='' or level_remarks!=''"
				let sSelectSqlstmt2="select level_remarks,my_basket,difficulty_level,lac_no from PDANEW_LAC_MASTER where my_basket !='' and my_basket!='undefined' and my_basket!='null' or  difficulty_level !='' and difficulty_level!='undefined' and difficulty_level!='null' or level_remarks!='' "
				console.log(sSelectSqlstmt2);
				db.executeSql(sSelectSqlstmt2, [])
					.then(res =>
					{
						console.log(res);
					if (res.rows.length > 0) {
					    for (let i=0; i < res.rows.length; i++){
							result.push({
								basket:res.rows.item(i).my_basket,
		                   		difficulty_level:res.rows.item(i).difficulty_level,
		                   		lac_no:res.rows.item(i).lac_no,
		                   		level_remarks:res.rows.item(i).level_remarks
		                    });

				    }
				}
	     			console.log(res);
					})
					.then(res => {
	            	resolve(result);
				}).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})


}

UpdLevelandBasket(lacno,level,basket,lrmrks){
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {

				let sSelectSqlstmt1= "UPDATE PDANEW_LAC_MASTER SET difficulty_level ='" + level + "',level_remarks ='" + lrmrks + "',my_basket ='" + basket +
        "' WHERE lac_no ="+lacno
                       
                       console.log(sSelectSqlstmt1);
				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
					console.log(res);
				 }).catch(e=>console.log(e))

			}).catch(e=>console.log(e))
		})

}


public sCreateTableScript(){		// --Table creation Appmaster and App_table master//
	return new Promise((resolve,reject) => {
		this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			console.log("Connection open for sCreateTableScript");
			var SqlOut =[];	
			var sCreateAppMasterScript = "CREATE TABLE IF NOT EXISTS App_Master(UserID TEXT PRIMARY KEY, Password TEXT, Version TEXT, SubVersion TEXT, SessionId TEXT)";
			var sCreateAppTableMasterScript = "CREATE TABLE IF NOT EXISTS App_Table_Master(TABLE_ID INT PRIMARY KEY, TABLE_NAME TEXT, TABLE_TYPE TEXT, MAXTIMESTAMP TEXT, SPECIAL_ACTION TEXT, LAST_SYNC_ON TEXT, ROW_CNT NUMERIC)";
			db.executeSql(sCreateAppMasterScript, [])			
			.then(res => { SqlOut.push(res); 
			}).catch(e => {console.log(e) ; reject(e)});
			db.executeSql(sCreateAppTableMasterScript, [])
			.then(res => {SqlOut.push(res);

				return resolve(SqlOut);
			})
			
			.catch(e => {console.log(e) ; reject(e)});
			
		})
	})
}	




setApp_MasterData() {
return new Promise((resolve, reject) => {
	this.sqlite.create({
		name: 'logindb.db',
		location: 'default'
	}).then((db: SQLiteObject) => {
		db.executeSql('SELECT user_info FROM login_details', null)
			.then(res => {
				if (res.rows.length > 0) {
					var result = JSON.parse(res.rows.item(0).user_info);
					console.log(result);

					this.sSelectApp_MasterScript()
						.then(res => {
							if (res['rows'].length > 0) {
								if (result[0].USER_ID == res['rows']['item'](0)['UserID']) {
									resolve(result);
								} 
								else{
									this.sDropTable().then(res=>{
										this.sCreateTableScript();
										this.createSyncTable();
										console.log('Inside second else');
										this.setAppMasterUserID(result[0].USER_ID).then((res) => {
											resolve(result);
											console.log(result);
										})
	
										console.log('Inside first else');
									})
								}

							} else {
								// delete and recreate 
							//	this.createSyncTable();
						
							this.sDropTable().then(res=>{
								this.sCreateTableScript();
								this.createSyncTable();
								console.log('Inside second else');
								this.setAppMasterUserID(result[0].USER_ID).then((res) => {
									resolve(result);
									console.log(result);
								})

								console.log('Inside first else');
							})

							}
						})


					console.log();
				}
			})


	}).catch(e => console.log(e));



})

}	
public createSyncTable(){   // --creating sync tables//
		
	return new Promise((resolve,reject) => {
		this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
		console.log("Connection open for createSyncTable");
		for(let i = 0; i < this.tableScript.length; i++)
		{
			db.executeSql(this.tableScript[i].CreateSql, [])
			.then((res) =>{ console.log("Connection close for createSyncTable");
				
			}).catch(e => {console.log(e) ; reject(e)});
		  
		   }
	   
		resolve();
	})
})

}
deleteApp_master(){
	return new Promise((resolve, reject) => {
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let UpdateSql="DELETE FROM App_Master ";
								db.executeSql(UpdateSql,[]).then(res=>{
								console.log(res);
								resolve(res);
							})

				})
		})
}


public sSelectApp_MasterScript(){		// --selecting values if userid is not null from App_Master //
	return new Promise((resolve,reject) => {
		this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			console.log("Connection open for sSelectApp_MasterScript");
			var sSqlScript = "SELECT * FROM App_Master where UserID is not null";
			db.executeSql(sSqlScript,[]).then((res) => {
				console.log(res);
								
				return resolve(res);	

			}).catch(e => {console.log(e) ; reject(e)});

			
		})
	})
}

clearsynctable(){    //--delete sync table data and updating app_table_master
	return new Promise((resolve,reject) => {				
		this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			for(let i = 0; i < this.tableScript.length; i++){
				let sDeleteSyncTablesData = "DELETE FROM " + this.tableScript[i].TableName;
				console.log("DELETE FROM " + this.tableScript[i].TableName);
				db.executeSql(sDeleteSyncTablesData, [])
				.then(res => {
					console.log("Clear Sync Table Data");
					resolve(res)})
				.catch(e => {console.log(e); reject(e)})
				}
			let sDeleteSyncTablesData = "UPDATE app_table_master set ROW_CNT=NULL,MAXTIMESTAMP=NULL,LAST_SYNC_ON=NULL";
				
				db.executeSql(sDeleteSyncTablesData, [])
				.then(res => {
					resolve(res)})
				.catch(e => {console.log(e); reject(e)})

		}).catch(e=>console.log(e))
	})
}


public setAppMasterUserID(sUserId){			//-----------Insert userid in Appmaster----------//
	  return new Promise((resolve,reject) => {
	  this.sqlite.create(this.options)
	.then((db : SQLiteObject) => {
			console.log("Connection open for setAppMasterUserID"); 	
			let sInsertAppMasterScript = "INSERT INTO App_Master(UserID) values(?)";
			console.log(sInsertAppMasterScript + sUserId);
			db.executeSql(sInsertAppMasterScript, [sUserId])
			.then(res => {
				resolve(res)})
			.catch(e => {console.log(e) ; reject(e);});
						
	})
	.catch(e => alert(e));
	})	
}

updateClick_count(lacno){ ////--update total no of clicks //////////
	console.log(lacno);
	return new Promise((resolve, reject) => {
		this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
			let sUpdateAppMasterScript = "UPDATE PDANEW_LAC_MASTER SET click_count=click_count+1 WHERE lac_no=?";
			//alert(click_count);
			db.executeSql(sUpdateAppMasterScript, [lacno])
			.then(res => {
				console.log(res);
				resolve(res)
			})
		}).catch(e => reject(e));
	})
}	

Listingmostvisitedlist(){
	return new Promise((resolve,reject)=>{
	this.top_three_table_items=[];
		
	   this.sqlite.create(this.options)
	   .then((db : SQLiteObject) => {

		   let sSelectSqlstmt ="SELECT p.click_count,p.os_months_emi,p.max_action_date,p.company_arrangement,p.os_months_pmi,p.lac_no,p.file_no,p.prop_no,p.srno,p.borr_name,p.follow_up_ind,p.prin_os_last_tr_comb,p.months_os,area_desc,p.customer_grade,p.prop_area_desc,p.fu_area_desc,p.emp_area_desc,p.selfemp_company_name,p.plt,p.prop_name,p.difficulty_level,p.my_basket,p.followupflag,count(u.lac_no)as total_acc_cnt,sum(u.plt_comb)as all_plt FROM PDANEW_LAC_MASTER p join pdanew_unique_id_accounts u on p.lac_no=u.lac_no  where p.click_count!=0 group by p.click_count,p.lac_no order by count(p.click_count) DESC limit 3"
			   console.log(sSelectSqlstmt);
			   db.executeSql(sSelectSqlstmt, [])
			   .then(res =>
			   {
			   if (res.rows.length > 0) {

				   for (let i=0; i < res.rows.length; i++){
					   if(res.rows.item(i).lac_no!=""){
						   this.top_three_table_items.push({
						   LAC_NO: res.rows.item(i).lac_no,
							  BORR_NAME: res.rows.item(i).borr_name,
							  FOLLOW_UP_IND:res.rows.item(i).follow_up_ind,
							  PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
							  MONTHS_OS: res.rows.item(i).months_os,
							  AREA_DESC: res.rows.item(i).area_desc,
							  CUSTOMER_GRADE: res.rows.item(i).customer_grade,
							  PROP_AREA_DESC:res.rows.item(i).prop_area_desc,
							  PROP_NAME: res.rows.item(i).prop_name,
							  EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
							  M_OS:res.rows.item(i).plt,
							  FOLLOW_UP: res.rows.item(i).fu_area_desc,
							  EMP_AREA: res.rows.item(i).emp_area_desc,
							  difficulty_level:res.rows.item(i).difficulty_level,
							  my_basket:res.rows.item(i).my_basket,
							  followupflag:res.rows.item(i).followupflag,
							  file_no:res.rows.item(i).file_no,
							  prop_no:res.rows.item(i).prop_no,
							  srno:res.rows.item(i).srno,
							  os_months_emi:res.rows.item(i).os_months_emi,
							  os_months_pmi:res.rows.item(i).os_months_pmi,
							  max_action_date:res.rows.item(i).max_action_date,
							  company_arrangement:res.rows.item(i).company_arrangement,
							  no_of_acc:res.rows.item(i).total_acc_cnt,
							  click_count:res.rows.item(i).click_count,
							  plt_count:res.rows.item(i).all_plt

					   }); 
					   }
				   }

			   }
			   resolve(this.top_three_table_items);
				console.log(res);
			   })
			   .then(res => {
			   
		   }).catch(e=>console.log(e))
	   }).catch(e=>console.log(e))
 
   })
}

count_top_basket(){ ////--update total no of clicks //////////
	this.count_to_bas=[];

	return new Promise((resolve, reject) => {
	 this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
	 		let sUpdateAppMasterScript ="select my_basket,count(my_basket) as count_bask from PDANEW_LAC_MASTER  where my_basket!=''group by my_basket order by count(my_basket) desc limit 2";
				db.executeSql(sUpdateAppMasterScript, [])
				.then(res =>
				{
					//
					//this.count_to_bas=res;
					for (let i=0; i < res.rows.length; i++){
						this.count_to_bas.push({
						my_basket:res.rows.item(i).my_basket,
						count_bask:res.rows.item(i).count_bask,

					}); 
				}
				 console.log(res);
				})
				.then(res => {
					
				resolve(this.count_to_bas);
			}).catch(e=>console.log(e))
		}).catch(e=>console.log(e))
	})
}	

count_top_level_try(){  

	this.top_level_try=[];
	return new Promise((resolve, reject) => {
	// 	this.sqlite.create(this.options)
	// 	.then((db : SQLiteObject) => {
	// 		let sUpdateAppMasterScript ="select count(*) as try from PDANEW_LAC_MASTER where difficulty_level='try' union select count() as difficult from PDANEW_LAC_MASTER where difficulty_level='difficult'";
	// 		db.executeSql(sUpdateAppMasterScript)
	// 		.then(res => {
	// 			console.log(res);
	// 			resolve(res)
	// 		})
			
	// 	}).catch(e => reject(e));
	// })


	this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
	 		let sUpdateAppMasterScript ="select count(*) as try,difficulty_level from PDANEW_LAC_MASTER where difficulty_level='Needs Attention'";
				db.executeSql(sUpdateAppMasterScript, [])
				.then(res =>
				{
				//	result=res;
				for (let i=0; i < res.rows.length; i++){
			
					this.top_level_try.push({
						difficulty_level:res.rows.item(i).difficulty_level,
						cnt_tot_try:res.rows.item(i).try,

					}); 
				}
				resolve(this.top_level_try);	
				console.log(res);
			})

			}).catch(e=>console.log(e));
				//.then(res => {
				//	resolve(this.top_level_try);	
			// }).catch(e=>console.log(e))
		}).catch(e=>console.log(e))
//	})
}

count_top_level_diff(){
	this.diff_result=[];
	return new Promise((resolve, reject) => {
	
	this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
	 		let sUpdateAppMasterScript1 ="select count(*) as difficult from PDANEW_LAC_MASTER where difficulty_level='Make Extra Effort'";
				db.executeSql(sUpdateAppMasterScript1, [])
				.then(res =>
				{
					for (let i=0; i < res.rows.length; i++){
			
						this.diff_result.push({
							difficulty_level:res.rows.item(i).difficulty_level,
							cnt_tot_diff:res.rows.item(i).difficult,
	
						}); 
					}
		
				resolve(this.diff_result);
				 console.log(res);
				}).catch(e=>console.log(e))
		
		}).catch(e=>console.log(e))
	})
}


Get_Top_latest_Reminders(){
	var topreminders =[];
	return new Promise((resolve,reject)=>{
		this.topreminders=[];
		this.sqlite.create(this.options)
		.then((db : SQLiteObject) => {
				let sSelectSqlstmt ="select LAC_NO,NAME,DEF_OBSERV,NXT_ACTION from PDANEW_FU_ACT_REMINDER group by NXT_ACTION order by NXT_ACTION desc limit 3 "
				db.executeSql(sSelectSqlstmt, [])
				.then(res_rem =>
				{
				if (res_rem.rows.length > 0) {
					for (let i=0; i < res_rem.rows.length; i++){
						if(res_rem.rows.item(i).lac_no!=""){
						this.topreminders.push({
							LAC_NO:res_rem.rows.item(i).LAC_NO,
							NAME:res_rem.rows.item(i).NAME,
							DEF_OBSERV:(res_rem.rows.item(i).DEF_OBSERV).toString().slice(0,10),
							NXT_ACTION:res_rem.rows.item(i).NXT_ACTION,

						}); 
					}
				}
				
				}
				console.log(res_rem);
				resolve(this.topreminders);
				}).catch(e=>console.log(e))
		}).catch(e=>console.log(e))
	})
	
	}


	
// Delete_bucket(basketname){
// 	return new Promise((resolve, reject) => {
// 			this.sqlite.create(this.options)
// 			.then((db : SQLiteObject) => {
// 				let UpdateSql="DELETE FROM PDANEW_LAC_MASTER where my_basket="+basketname;
// 								db.executeSql(UpdateSql,[]).then(res=>{
// 								console.log(res);
// 								resolve(res);
// 							})

// 				})
// 		})

// }
//"UPDATE PDANEW_LAC_MASTER SET my_basket='" + basketname + "' WHERE  lac_no =" + lac_no 

update_global_buck(basketname,emptybuck){
	return new Promise((resolve,reject)=>{
			this.sqlite.create(this.options)
			.then((db : SQLiteObject) => {
				let sSelectSqlstmt1= "UPDATE PDANEW_LAC_MASTER SET my_basket='" +emptybuck+ "' WHERE my_basket='" + basketname + "';"

				db.executeSql(sSelectSqlstmt1, [])
					.then(res =>
					{
						resolve(res);
					console.log(res);
				 }).catch(e=>console.log(e))
				
			}).catch(e=>console.log(e))
		})

}
}



		
		
					
						
				



	






			



		
		
					
						
				



	






			
