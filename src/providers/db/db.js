var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
var DbProvider = /** @class */ (function () {
    function DbProvider(http, platform, sqlite) {
        this.http = http;
        this.platform = platform;
        this.sqlite = sqlite;
        this.options = {
            name: 'recoveryDB.db',
            location: 'default'
        };
        this.tableItems = [];
        this.tableItems_v1 = [];
        this.reminders = [];
        this.NEW_COMMN_DETAILS = [];
        this.NEW_FU_ACTION = [];
        this.NEW_PROP_CLASS = [];
        this.upload_data = [];
        this.tableScript = [
            { TableId: 202, TableName: 'PDANEW_PMI_TRANS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_PMI_TRANS (tran_dt NUMERIC,rcbl NUMERIC, rcvd NUMERIC, os NUMERIC, tr_type TEXT, doc_no TEXT, effective_dt NUMERIC, pay_mode TEXT,tr_desc TEXT, bank_nm TEXT, bnc_reason TEXT, ldap_id TEXT, deleted_flag TEXT,timestamp NUMERIC, srno NUMERIC, lac_no NUMERIC)" },
            { TableId: 203, TableName: 'PDANEW_LAC_REMARKS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_REMARKS (LAC_NO NUMERIC, REMARKS TEXT, LAST_UPD NUMERIC, SRNO NUMERIC, deleted_flag TEXT, timestamp NUMERIC, ldap_id TEXT, OPR_ID TEXT)" },
            { TableId: 204, TableName: 'PDANEW_LAC_FU_ACTION', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_FU_ACTION (ldap_id TEXT, lac_no NUMERIC, action TEXT, date_of_action NUMERIC, def_observ TEXT, remark TEXT, deleted_flag TEXT, timestamp NUMERIC, opr_id TEXT, response TEXT, srno NUMERIC, promised_amt NUMERIC, promised_dt NUMERIC)" },
            { TableId: 205, TableName: 'PDANEW_LAC_DETAILS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_DETAILS (lac_no NUMERIC, loan_amt NUMERIC, cumdisb NUMERIC, bal_term NUMERIC, roi NUMERIC, gr_no NUMERIC,  origin_branch NUMERIC, origin_place TEXT, thru_whom TEXT, rcd_dt NUMERIC, last_rcbl_updt NUMERIC, normal_pay_mode TEXT, yob_pr_emi NUMERIC, yob_pr_pmi NUMERIC, yob_pr_bp NUMERIC, cur_pr_emi NUMERIC, cur_pr_pmi NUMERIC, cur_pr_bp NUMERIC, emi NUMERIC, last_pmi_recble NUMERIC, ly_os_emi NUMERIC, ly_os_pmi NUMERIC, ly_os_add_int NUMERIC, ly_os_mr NUMERIC, ly_os_ppc NUMERIC, ly_os_si NUMERIC, emi_recble NUMERIC, pmi_recble NUMERIC, add_int_recble NUMERIC, mr_recble NUMERIC, ppc_recble NUMERIC, si_recble NUMERIC, emi_recd NUMERIC, pmi_recd NUMERIC, add_int_recd NUMERIC, mr_recd NUMERIC, ppc_recd NUMERIC, si_recd NUMERIC, emi_curos NUMERIC, pmi_curos NUMERIC, add_curos NUMERIC, mr_curos NUMERIC, cur_ppcos NUMERIC, cur_sios NUMERIC, os_months_emi NUMERIC, os_months_pmi NUMERIC, prop_class TEXT, customer_grade TEXT, payment_type TEXT, fraud_ind TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC, ldap_id TEXT, last_tr_dt NUMERIC, sanction NUMERIC, ly_os_tot NUMERIC, tot_recble NUMERIC, tot_recd NUMERIC, tot_curos NUMERIC, tot_pemi_os NUMERIC, tot_emi_os NUMERIC, tot_addint_os NUMERIC, tot_ppc_os NUMERIC, tot_si_os NUMERIC, tot_mr_os NUMERIC, group_name TEXT, asset_classification TEXT)" },
            { TableId: 206, TableName: 'PDANEW_EMI_TRANS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_EMI_TRANS (tran_dt NUMERIC, rcbl NUMERIC, rcvd NUMERIC, os NUMERIC, tr_type TEXT, doc_no TEXT, effective_dt NUMERIC, pay_mode TEXT, tr_desc TEXT, bank_nm TEXT, bnc_reason TEXT, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC, lac_no NUMERIC)" },
            { TableId: 207, TableName: 'PDANEW_DISB_DETAILS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_DISB_DETAILS (lac_no NUMERIC, file_no NUMERIC, disb_no NUMERIC, doc_no NUMERIC, doc_dt NUMERIC, doc_amt NUMERIC, payable_to TEXT, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC, disb_dt NUMERIC, status TEXT)" },
            { TableId: 208, TableName: 'PDANEW_CUSTOMER_ADDRESS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_CUSTOMER_ADDRESS (cust_number NUMERIC, file_no NUMERIC, capacity TEXT,  cust_name TEXT, branch_code NUMERIC, addr_type TEXT, addr_line1 TEXT, addr_line2 TEXT, addr_line3 TEXT, addr_line4 TEXT, city TEXT, pincode NUMERIC, tel_no TEXT, designation TEXT, spec_addr TEXT, mobile_no TEXT, email TEXT, employ_no TEXT, comp_name1 TEXT, comp_name2 TEXT, branch TEXT, dept TEXT, btel_no1 TEXT, btel_no2 TEXT, btel_no3 , ext_no TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC, ldap_id TEXT, emp_since TEXT)" },
            { TableId: 233, TableName: 'PDANEW_COMM_OTH_DETAILS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_COMM_OTH_DETAILS (lac_no NUMERIC, name TEXT, relation TEXT, address1 TEXT, address2 TEXT, mobile1 TEXT, mobile2 TEXT, email_id TEXT, off_tel_no TEXT, res_tel_no TEXT, fax TEXT, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC)" },
            { TableId: 215, TableName: 'PDANEW_FILE_REMINDERS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_FILE_REMINDERS (ldap_id TEXT, file_no NUMERIC, sr_order NUMERIC, reminder TEXT, user_id TEXT, status TEXT, updation_date NUMERIC, category TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC)" },
            { TableId: 217, TableName: 'PDANEW_AI_IC', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_AI_IC (tran_dt NUMERIC, ai_rcbl NUMERIC, ai_rcvd NUMERIC, ai_out NUMERIC, mr_rcbl NUMERIC, mr_rcvd NUMERIC, mr_out NUMERIC, ldap_id TEXT, deleted_flag TEXT, timestamp NUMERIC, srno NUMERIC, lac_no NUMERIC)" },
            { TableId: 234, TableName: 'PDANEW_LAC_USER_PARA', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_USER_PARA (para_code TEXT, para_value TEXT, para_desc TEXT, srno NUMERIC, deleted_flag TEXT, ldap_id TEXT, timestamp NUMERIC, para_group TEXT, para_min_charge NUMERIC, para_max_charge TEXT)" },
            { TableId: 226, TableName: 'PDANEW_LAC_TERMS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_TERMS (LAC_NO NUMERIC, T_TYPE TEXT, FROM_DT NUMERIC, TO_DT NUMERIC, AMT NUMERIC, ROI NUMERIC, PERIODICITY NUMERIC, UPD_DATE NUMERIC, LDAP_ID TEXT, SRNO NUMERIC, TIMESTAMP NUMERIC)" },
            { TableId: 227, TableName: 'PDACRM_FULG_ACTIONS', CreateSql: "CREATE TABLE IF NOT EXISTS PDACRM_FULG_ACTIONS (LAC_NO NUMERIC, ACTIVITY_TYPE TEXT, SUIT_SEQ_NO NUMERIC, ACTION_SEQ_NO NUMERIC, ACTION TEXT, DATE_OF_ACTION NUMERIC, ACTION_TO_BE TEXT, NEXT_ACTION_DT NUMERIC, DONE_BY TEXT, TO_BE_DONE_BY TEXT, AMOUNT_SPENT NUMERIC, AMOUNT_TOBECHG NUMERIC, REMARK TEXT, LDAP_ID TEXT, SRNO NUMERIC, DELETED_FLAG TEXT, TIMESTAMP NUMERIC, ACTION_DESC TEXT)" },
            { TableId: 228, TableName: 'PDANEW_PROPERTY_MST', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_PROPERTY_MST (PROP_NO TEXT, PROP_NAME TEXT, BUILDER_NO NUMERIC, PROP_STAT TEXT, HDFC_LOCATION_TYPE TEXT, COMPLETION_MONTH NUMERIC, PROP_CATEGORY TEXT, FLOOR_DET TEXT, FLOOR_NO NUMERIC, TOTAL_UNIT NUMERIC, MAX_EXPOSURE NUMERIC, MAX_AGR_VALUE NUMERIC, MAX_TOTAL_COST NUMERIC, APPR_STATUS TEXT, AREA_CODE NUMERIC, LANDMARK TEXT, FILE_NO NUMERIC, SPECIFIC_RMK TEXT, TECH_APR_NO NUMERIC, RECORD_STATUS TEXT, PER_AGRMNT_VALUE NUMERIC, DATE_OF_APR NUMERIC, CONS_STATUS TEXT, TA_DONE_BY TEXT, APPRAISER TEXT, MODE_OF_APR TEXT, UPDATION_DATE NUMERIC, APPROVAL_STATUS TEXT, PROGRESS TEXT, PROGRESS_AS_PER_SCHE TEXT, REMARK TEXT, APR_RATE NUMERIC, APPROVED_BY TEXT, LDAP_ID TEXT, DELETED_FLAG TEXT, TIMESTAMP NUMERIC, SRNO NUMERIC, BUILDER_NAME TEXT, AREA_DESC TEXT, APPR_DESC TEXT, FLOOR_DESC TEXT, FRIL_YN TEXT, VALUATION_DONE TEXT, VAL_DONE TEXT, VAL_CNT TEXT)" },
            { TableId: 231, TableName: 'PDANEW_LG_DOCUMENTS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LG_DOCUMENTS (file_no NUMERIC,  doc_code TEXT,  doc_desc TEXT,  status TEXT,  original TEXT,  action_date NUMERIC,  user_id TEXT, upd_date NUMERIC,  ldap_id TEXT,  deleted_flag TEXT,  srno NUMERIC,  timestamp NUMERIC)" },
            { TableId: 282, TableName: 'pdanew_asset_class', CreateSql: "CREATE TABLE IF NOT EXISTS pdanew_asset_class (lac_no NUMERIC, borr_name TEXT, months_os_comb NUMERIC, plt_comb NUMERIC, mru_dt NUMERIC, asset_classification TEXT, run_dt NUMERIC, yyyymm NUMERIC, ldap_id TEXT, srno NUMERIC, timestamp NUMERIC, deleted_flag TEXT)" },
            { TableId: 283, TableName: 'pdanew_unique_id_accounts', CreateSql: "CREATE TABLE IF NOT EXISTS pdanew_unique_id_accounts (lac_no NUMERIC, lac_no1 NUMERIC,origin_branch VARCHAR2(50),laf_no NUMERIC, borr_name TEXT,  cur_emios NUMERIC,  cur_pmios NUMERIC,  cur_osadd NUMERIC,cur_mros NUMERIC,plt_comb NUMERIC,months_comb NUMERIC,total NUMERIC,  ldap_id TEXT,  srno NUMERIC,  deleted_flag TEXT,  timestamp NUMERIC)" },
            { TableId: 218, TableName: 'PDANEW_CUST_CONTACT', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_CUST_CONTACT(cust_number NUMERIC, contact_type TEXT, contact_det TEXT, user_id TEXT, ldap_id TEXT, srno NUMERIC, lac_no NUMERIC, deleted_flag TEXT,  timestamp NUMERIC);" },
            { TableId: 219, TableName: 'PDANEW_LAC_CROSSLINK', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_CROSSLINK(ldap_id TEXT, lac_no NUMERIC, file1 NUMERIC, file2 NUMERIC, remarks TEXT, srno NUMERIC, deleted_flag TEXT, timestamp NUMERIC,  cur_emios NUMERIC,cur_pmios NUMERIC,cur_bpos  NUMERIC,cur_osadd NUMERIC,cur_mros NUMERIC,cur_plt  NUMERIC,cur_totos NUMERIC);" },
            { TableId: 220, TableName: 'PDANEW_CUSTOMER_ADDRESS_NEW', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_CUSTOMER_ADDRESS_NEW(file_no NUMERIC ,  capacity TEXT ,  srno NUMERIC , deleted_flag TEXT , timestamp NUMERIC,  ldap_id TEXT,  address TEXT  ,  comm_address TEXT ,  comm_custno TEXT ,  comm_latitude TEXT,  comm_longitude TEXT,  empl_address TEXT ,  empl_custno TEXT,  empl_latitude TEXT ,  empl_longitude TEXT,  prop_address TEXT,    prop_custno TEXT  ,  prop_latitude TEXT ,  prop_longitude TEXT);" },
            { TableId: 221, TableName: 'TAB_DAILY_ALERTS', CreateSql: "CREATE TABLE IF NOT EXISTS TAB_DAILY_ALERTS(LAC_NO NUMERIC, ALERT_DATE NUMERIC, ALERT_NAME TEXT, BORR_NAME TEXT, ALERT_TEXT TEXT, REMARKS TEXT, LDAP_ID TEXT,SRNO NUMERIC, TIMESTAMP NUMERIC);" },
            { TableId: 214, TableName: 'PDANEW_FULG_ACTIONS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_FULG_ACTIONS(ldap_id TEXT, lac_no NUMERIC, action TEXT, date_of_action NUMERIC, def_observ TEXT, remark TEXT, deleted_flag TEXT,  timestamp NUMERIC, opr_id TEXT,  srno NUMERIC, activity_type TEXT, action_desc TEXT);" },
            { TableId: 216, TableName: 'PDANEW_ILPS_REMARKS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_ILPS_REMARKS(ldap_id TEXT , file_no NUMERIC, REMARKS TEXT , user_id NUMERIC, UPD_DATE NUMERIC, srno NUMERIC, timestamp NUMERIC, deleted_flag TEXT);" },
            { TableId: 232, TableName: 'PDANEW_VIEW_DOCS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_VIEW_DOCS(srno NUMERIC, ldap_id TEXT,  lac_no NUMERIC ,  doc_type TEXT,  doc_desc TEXT,  filename TEXT,  deleted_flag TEXT,  timestamp NUMERIC,  downloaded_flag TEXT ,  offline_flag TEXT,  doc_system TEXT,  doc_para1 TEXT,  doc_para2 TEXT,  file_no NUMERIC,  doc_rec_srno NUMERIC, network_path TEXT);" },
            { TableId: 222, TableName: 'PDANEW_CRITICAL_INFO', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_CRITICAL_INFO(LAC_NO NUMERIC , SPECIAL_INFO_TYPE TEXT , LDAP_ID TEXT , UPD_DATE, DATE_OF_ACTION, SRNO, DELETED_FLAG , TIMESTAMP); " },
            { TableId: 223, TableName: 'PDANEW_FU_ACT_REMINDER', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_FU_ACT_REMINDER (LAC_NO NUMERIC, NXT_ACTION NUMERIC, DEF_OBSERV TEXT, LDAP_ID TEXT, NAME TEXT, SRNO NUMERIC, DELETED_FLAG TEXT,  TIMESTAMP NUMERIC);" },
            { TableId: 224, TableName: 'PDANEW_LAC_AMRT', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_AMRT (LAC_NO NUMERIC, PR_EMI NUMERIC, EMI NUMERIC, ROI NUMERIC, PERIODICITY NUMERIC, AMRT_FR_DT NUMERIC, DT_OF_AMRT NUMERIC, YYYYYY NUMERIC, LDAP_ID TEXT, AMRT_TO_DT NUMERIC, SRNO NUMERIC,TIMESTAMP NUMERIC)" },
            { TableId: 225, TableName: 'PDANEW_LAC_DEFAULT_INFO', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_DEFAULT_INFO(LAC_NO NUMERIC , RISK_EVENT TEXT, UPDATED_BY NUMERIC , UPDATED_DATE NUMERIC, LDAP_ID TEXT, SRNO NUMERIC , DELETED_FLAG TEXT , TIMESTAMP NUMERIC);" },
            { TableId: 200, TableName: 'PDANEW_LAC_MASTER', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_LAC_MASTER (lac_no NUMERIC,os_months_emi NUMERIC, os_months_pmi NUMERIC, borr_name TEXT, follow_up_ind TEXT,  prin_os_last_tr_comb NUMERIC,  months_os_comb NUMERIC, area_desc TEXT,  selfemp_company_name TEXT,  prop_class TEXT,  fraud_ind TEXT ,  customer_grade TEXT,  cure_type TEXT,  srno NUMERIC,  deleted_flag TEXT,  timestamp NUMERIC,  ldap_id TEXT,  prop_area_desc TEXT,  prop_name TEXT,  obs_code TEXT,  file_no TEXT,  sanction TEXT ,  my_basket TEXT,  prop_no TEXT,  builder_name TEXT,  builder_contact TEXT,  action_taken TEXT,  fu_area_desc TEXT,  plt TEXT,  months_os TEXT,  emp_area_desc TEXT,  last_rcbl_dt TEXT,  to_date TEXT,  rec_type TEXT,difficulty_level TEXT,level_remarks TEXT,followupflag TEXT);" },
            { TableId: 201, TableName: 'PDANEW_PROP_DETAILS', CreateSql: "CREATE TABLE IF NOT EXISTS PDANEW_PROP_DETAILS (lac_no NUMERIC, prop_addr_line1 TEXT,  prop_addr_line2 TEXT,  prop_addr_line3 TEXT,  prop_addr_line4 TEXT,  prop_addr_line5 TEXT, landmark TEXT, prop_area NUMERIC,  mortgage_type TEXT,  prin_ason_dt1 NUMERIC,  prin_ason_val1 NUMERIC,  srno NUMERIC ,  deleted_flag TEXT,  timestamp NUMERIC,  ldap_id TEXT,  cumdisb NUMERIC,  prop_no TEXT,  prop_pin NUMERIC,  no_of_owners NUMERIC,  prop_val_cost NUMERIC,  reserve_price NUMERIC,  prop_state TEXT,  prop_city TEXT,  master_fileno TEXT,  docket_location TEXT,  ta_remarks TEXT,  prop_spec_addr TEXT,  prop_area_desc TEXT,  tot_plot_area NUMERIC,prop_latitude VARCHAR2(25),prop_longitude VARCHAR2(25));" },
            { TableId: 209, TableName: 'PDANEW_NEW_FU_ACTION', CreateSql: "create table  IF NOT EXISTS PDANEW_NEW_FU_ACTION(  ldap_id VARCHAR2(20),  lac_no  NUMBER(10),  action VARCHAR2(5),  date_of_action DATE,  response VARCHAR2(3),  def_observ VARCHAR2(5),  remark VARCHAR2(500),  opr_id VARCHAR2(10),  action_to_be VARCHAR2(3),  action_to_be_dt   DATE,  amount_tobechg   NUMBERIC(7,2),  amount_spent NUMBERIC(7,2),  copy_status VARCHAR2(2),  dwld_date DATE,  uploaded_flag VARCHAR2(1),  created_dt DATE,  latitude VARCHAR2(25),  longitude VARCHAR2(25),mobile_srno INTEGER PRIMARY KEY AUTOINCREMENT,version_no NUMBER(10),  processed_flag VARCHAR2(2),  processed_dt DATE,area_code VARCHAR2(50),  special_info_type    VARCHAR2(2),  action_type VARCHAR2(2),  risk_event VARCHAR2(20),  promised_dt DATE,  promised_amt NUMBER(12,2),  pipeline_amt NUMBER(20,2),  pipeline_dt DATE,  pipeline_proj_bucket VARCHAR2(500));" },
            { TableId: 229, TableName: 'PDANEW_PROP_CLASS', CreateSql: "create table IF NOT EXISTS PDANEW_PROP_CLASS(lac_no NUMBER(10),class_code VARCHAR2(20),specific_value VARCHAR2(20),ldap_id VARCHAR2(20),deleted_flag VARCHAR2(1),timestamp DATE,  mobile_srno INTEGER PRIMARY KEY AUTOINCREMENT,uploaded_flag  VARCHAR2(1));" },
            { TableId: 230, TableName: 'PDANEW_NEW_COMM_OTH_DETAILS', CreateSql: "create table IF NOT EXISTS PDANEW_NEW_COMM_OTH_DETAILS(lac_no NUMBER,  name VARCHAR2(65),  relation  VARCHAR2(30),  address1 VARCHAR2(500),  address2 VARCHAR2(500),  mobile1 VARCHAR2(20),  mobile2 VARCHAR2(20),  email_id      VARCHAR2(500),  off_tel_no    VARCHAR2(20),  res_tel_no    VARCHAR2(20),  fax VARCHAR2(20),  ldap_id   VARCHAR2(20),  deleted_flag  VARCHAR2(1),  timestamp DATE, mobile_srno  INTEGER PRIMARY KEY AUTOINCREMENT,  uploaded_flag VARCHAR2(1));" }
        ];
        this.refreshData = [{ TableId: 200, TableName: 'PDANEW_LAC_MASTER' },
            { TableId: 204, TableName: 'PDANEW_LAC_FU_ACTION' },
            { TableId: 205, TableName: 'PDANEW_LAC_DETAILS' },
            { TableId: 206, TableName: 'PDANEW_EMI_TRANS' }
        ];
    }
    /******************************************** APP-LAUNCH *****************************************************/
    DbProvider.prototype.setAppMasterUserID = function (sUserId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for setAppMasterUserID");
                var sInsertAppMasterScript = "INSERT INTO App_Master(UserID) values(?)";
                console.log(sInsertAppMasterScript + sUserId);
                db.executeSql(sInsertAppMasterScript, [sUserId])
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (e) { console.log(e); reject(e); });
            })
                .catch(function (e) { return alert(e); });
        });
    };
    // getData() {
    //     this.sqlite.create({
    //       name: 'logindb.db',
    //       location: 'default'
    //     }).then((db: SQLiteObject) => {
    //       db.executeSql('SELECT user_info FROM login_details',null)
    //       .then(res => {
    //         if(res.rows.length>0) {
    //             this.UserID =res.rows.item(0).user_info
    //           console.log();
    //         //  this.balance = this.totalIncome-this.totalExpense;
    //         }
    //       })
    //     }).catch(e => console.log(e));
    //   }
    DbProvider.prototype.getAppMasterUserID = function () {
        var _this = this;
        //this.userid=sUserId;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sInsertAppMasterScript = "SELECT UserID from App_Master";
                db.executeSql(sInsertAppMasterScript, [])
                    .then(function (res) {
                    _this.userid = res.rows.item(0);
                    resolve(res.rows.item(0));
                })
                    .catch(function (e) { console.log(e); reject(e); });
            })
                .catch(function (e) { return alert(e); });
        });
    };
    DbProvider.prototype.getsessionid = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sInsertAppMasterScript = "SELECT SessionId from App_Master";
                db.executeSql(sInsertAppMasterScript, [])
                    .then(function (res) {
                    _this.sessionid = res.rows.item(0);
                    resolve(res.rows.item(0));
                })
                    .catch(function (e) { console.log(e); reject(e); });
            })
                .catch(function (e) { return alert(e); });
        });
    };
    DbProvider.prototype.sCreateTableScript = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for sCreateTableScript");
                var SqlOut = [];
                var sCreateAppMasterScript = "CREATE TABLE IF NOT EXISTS App_Master(UserID TEXT PRIMARY KEY, Password TEXT, Version TEXT, SubVersion TEXT, SessionId TEXT)";
                var sCreateAppTableMasterScript = "CREATE TABLE IF NOT EXISTS App_Table_Master(TABLE_ID INT PRIMARY KEY, TABLE_NAME TEXT, TABLE_TYPE TEXT, MAXTIMESTAMP TEXT, SPECIAL_ACTION TEXT, LAST_SYNC_ON TEXT, ROW_CNT NUMERIC)";
                db.executeSql(sCreateAppMasterScript, {})
                    .then(function (res) {
                    SqlOut.push(res);
                }).catch(function (e) { console.log(e); reject(e); });
                db.executeSql(sCreateAppTableMasterScript, {})
                    .then(function (res) {
                    SqlOut.push(res);
                    return resolve(SqlOut);
                })
                    .catch(function (e) { console.log(e); reject(e); });
            });
        });
    };
    DbProvider.prototype.sDropTableSAVEPHOTO = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //this.createDatabase();
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for sDropTable");
                var resolveObj = [];
                var sDropSql = "DROP TABLE IF EXISTS PhotoUpload";
                db.executeSql(sDropSql, {})
                    .then(function (res) { resolveObj.push(res); })
                    .catch(function (e) { console.log(e); reject(e); });
                resolve(resolveObj);
            });
        });
    };
    DbProvider.prototype.DeleteTablePhotoUpld = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql1 = "DELETE FROM PhotoUpload";
                db.executeSql(UpdateSql1, []).then(function (res) {
                    console.log(res);
                    resolve(res);
                });
            });
        });
    };
    DbProvider.prototype.CreateTablePhotoSave = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for sCreateTableScript");
                var SqlOut1 = [];
                var sCreateAppMasterScript = "CREATE TABLE IF NOT EXISTS PhotoUpload(LAC_NO numeric, PhotoType TEXT, Path TEXT,Photourl TEXT,prop_no numeric)";
                db.executeSql(sCreateAppMasterScript, {})
                    .then(function (res) {
                    SqlOut1.push(res);
                }).catch(function (e) { console.log(e); reject(e); });
                return resolve(SqlOut1);
            })
                .catch(function (e) { console.log(e); reject(e); });
        });
    };
    DbProvider.prototype.InsertIntoPhotoUpload = function (lacno, phototype, filename, photourl, propno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sInsertAppMasterScript = "INSERT INTO PhotoUpload(LAC_NO,PhotoType,Path,Photourl,prop_no) values(?,?,?,?,?)";
                db.executeSql(sInsertAppMasterScript, [lacno, phototype, filename, photourl, propno])
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (e) { console.log(e); reject(e); });
            })
                .catch(function (e) { return alert(e); });
        });
    };
    DbProvider.prototype.selectPhotoUpload = function () {
        var _this = this;
        var listItems = []; // --selecting values if userid is not null from App_Master //
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for sSelectApp_MasterScript");
                var sSqlScript = "SELECT count(*) as totuplcnt,LAC_NO,PhotoType,Path,Photourl,prop_no FROM PhotoUpload";
                db.executeSql(sSqlScript, []).then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            listItems.push({
                                LAC_NO: res.rows.item(i).LAC_NO,
                                PhotoType: res.rows.item(i).PhotoType,
                                Path: res.rows.item(i).Path,
                                Photourl: res.rows.item(i).Photourl,
                                prop_no: res.rows.item(i).prop_no,
                                photoupcnt: res.rows.item(i).totuplcnt
                            });
                        }
                    }
                    return resolve(listItems);
                }).catch(function (e) { console.log(e); reject(e); });
            });
        });
    };
    DbProvider.prototype.PhotoUploadcount = function () {
        var _this = this;
        var countphotoupld = []; // --selecting values if userid is not null from App_Master //
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for sSelectApp_MasterScript");
                var sSqlScript = "SELECT count(*) as totuplcnt FROM PhotoUpload";
                db.executeSql(sSqlScript, []).then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            countphotoupld.push({
                                photoupcnt: res.rows.item(i).totuplcnt
                            });
                        }
                    }
                    return resolve(countphotoupld);
                }).catch(function (e) { console.log(e); reject(e); });
            });
        });
    };
    DbProvider.prototype.sSelectApp_MasterScript = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for sSelectApp_MasterScript");
                var sSqlScript = "SELECT * FROM App_Master where UserID is not null";
                db.executeSql(sSqlScript, []).then(function (res) {
                    console.log(res);
                    return resolve(res);
                }).catch(function (e) { console.log(e); reject(e); });
            });
        });
    };
    DbProvider.prototype.createSyncTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for createSyncTable");
                for (var i = 0; i < _this.tableScript.length; i++) {
                    db.executeSql(_this.tableScript[i].CreateSql, {})
                        .then(function (res) {
                        console.log("Connection close for createSyncTable");
                    }).catch(function (e) { console.log(e); reject(e); });
                }
                resolve();
            });
        });
    };
    /**************************************************** LOGIN ********************************************************/
    DbProvider.prototype.sDropTable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //this.createDatabase();
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for sDropTable");
                var resolveObj = [];
                var sDropSql = "DROP TABLE IF EXISTS App_Master";
                db.executeSql(sDropSql, {})
                    .then(function (res) { resolveObj.push(res); })
                    .catch(function (e) { console.log(e); reject(e); });
                sDropSql = "DROP TABLE IF EXISTS App_Table_Master ";
                db.executeSql(sDropSql, {})
                    .then(function (res) { resolveObj.push(res); })
                    .catch(function (e) { console.log(e); reject(e); });
                for (var i = 0; i < _this.tableScript.length; i++) {
                    var sDropSql_1 = "DROP TABLE IF EXISTS " + _this.tableScript[i].TableName;
                    db.executeSql(sDropSql_1, {})
                        .then(function (res) {
                        resolveObj.push(res);
                    })
                        .catch(function (e) { console.log(e); reject(e); });
                }
                resolve(resolveObj);
            });
        });
    };
    DbProvider.prototype.updateApp_MasterData = function (sPwd, sVersion, sSubVersion, sUserId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                console.log("Connection open for updateApp_MasterData");
                var sUpdAppMasterScript = "UPDATE App_Master SET Password=?, Version=?, SubVersion=? WHERE UserID=?";
                db.executeSql(sUpdAppMasterScript, [sPwd, sVersion, sSubVersion, sUserId])
                    .then(function (res) {
                    console.log(' Update App_Master Details  SQL');
                    resolve(res);
                })
                    .catch(function (e) { return reject(e); });
            });
        });
    };
    /**************************************************** HOME *******************************************************/
    DbProvider.prototype.updateSessionID = function (sSessionID, sUserId) {
        var _this = this;
        console.log(sSessionID, sUserId);
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sUpdateAppMasterScript = "UPDATE App_Master SET SessionId=? WHERE UserID=?";
                db.executeSql(sUpdateAppMasterScript, [sSessionID, sUserId])
                    .then(function (res) {
                    console.log(res);
                    resolve(res);
                });
            }).catch(function (e) { return reject(e); });
        });
    };
    DbProvider.prototype.insertIntoAppTableMaster = function (sTableID, sTableName, sTableType, sMaxTime, sSpecialAction) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var SelectSql = "SELECT * FROM App_Table_Master WHERE TABLE_ID = " + sTableID;
                db.executeSql(SelectSql, [])
                    .then(function (res) {
                    if (res.rows.length == 0) {
                        var sInsertAppTableMasterScript = "INSERT INTO App_Table_Master(TABLE_ID, TABLE_NAME, TABLE_TYPE, MAXTIMESTAMP, SPECIAL_ACTION) VALUES(?,?,?,?,?)";
                        db.executeSql(sInsertAppTableMasterScript, [sTableID, sTableName, sTableType, sMaxTime, sSpecialAction])
                            .then(function () {
                            var sSql = "select LAST_SYNC_ON from App_Table_Master WHERE TABLE_ID=" + sTableID;
                            db.executeSql(sSql, []).then(function (res) { return resolve(res); });
                        });
                    }
                    else {
                        var sInsertAppTableMasterScript = "UPDATE App_Table_Master SET LAST_SYNC_ON = MAXTIMESTAMP, MAXTIMESTAMP ='" + sMaxTime + "' WHERE TABLE_ID=" + sTableID;
                        db.executeSql(sInsertAppTableMasterScript, [])
                            .then(function () {
                            var sSql = "select LAST_SYNC_ON from App_Table_Master WHERE TABLE_ID=" + sTableID;
                            db.executeSql(sSql, []).then(function (res) { return resolve(res); });
                        });
                    }
                })
                    .catch(function (e) { reject(e); console.log(e); });
            });
        });
    };
    /************************************************ TABLE LIST *************************************************/
    DbProvider.prototype.executeDownloadScript = function (DownloadDataObj) {
        var promises = [];
        var DownloadDatLength;
        if (typeof (DownloadDataObj.DownloadTable_v1) != 'undefined') {
            DownloadDatLength = DownloadDataObj.DownloadTable_v1.length;
        }
        this.sqlite.create(this.options)
            .then(function (db) {
            var _loop_1 = function (i) {
                promises.push(new Promise(function (resolve, reject) {
                    db.executeSql(DownloadDataObj.DownloadTable_v1[i].SQL_INS_SCRIPT, {}).then(function (res) {
                        resolve(res);
                    });
                }));
            };
            for (var i = 0; i < DownloadDatLength; i++) {
                _loop_1(i);
            }
        });
        return Promise.all(promises);
    };
    DbProvider.prototype.updateTableRowCount = function (tableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var queryscript = "UPDATE  App_Table_Master SET ROW_CNT = (select count (*)from(select distinct * from " + tableName + " )) WHERE TABLE_NAME='" + tableName + "'";
                db.executeSql(queryscript, {});
                console.log("updateTableRowCount executed");
                resolve();
            });
        });
    };
    DbProvider.prototype.updateRowCount_v1 = function (sTableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var queryscript = "UPDATE  App_Table_Master SET  ROW_CNT =(select count(1) from " + sTableName + ") WHERE TABLE_NAME='" + sTableName + "'";
                db.executeSql(queryscript, {})
                    .then(function () {
                    resolve();
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.TablelistAppTableMaster = function () {
        var _this = this;
        var listItems = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT * FROM App_Table_Master WHERE TABLE_TYPE = 'D'";
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            listItems.push({
                                TABLE_ID: res.rows.item(i).TABLE_ID,
                                TABLE_NAME: res.rows.item(i).TABLE_NAME,
                                ROW_COUNT: res.rows.item(i).ROW_CNT,
                                SYNC_FLAG: 1,
                                LAST_SYNC_ON: res.rows.item(i).LAST_SYNC_ON
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(listItems);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.getTableIdDetails = function (tablename) {
        var _this = this;
        var listItems = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT * FROM App_Table_Master WHERE TABLE_TYPE IN('D','S') AND TABLE_NAME ='" + tablename + "'";
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        listItems.push({
                            TABLE_ID: res.rows.item(0).TABLE_ID,
                            TABLE_NAME: res.rows.item(0).TABLE_NAME,
                            ROW_COUNT: res.rows.item(0).ROW_CNT,
                            LAST_SYNC_ON: res.rows.item(0).LAST_SYNC_ON,
                            SYNC_FLAG: 1
                        });
                        console.log(listItems);
                    }
                    return resolve(listItems);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.clearsynctable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                for (var i = 0; i < _this.tableScript.length; i++) {
                    var sDeleteSyncTablesData_1 = "DELETE FROM " + _this.tableScript[i].TableName;
                    console.log("DELETE FROM " + _this.tableScript[i].TableName);
                    db.executeSql(sDeleteSyncTablesData_1, {})
                        .then(function (res) {
                        console.log("Clear Sync Table Data");
                        resolve(res);
                    })
                        .catch(function (e) { console.log(e); reject(e); });
                }
                var sDeleteSyncTablesData = "UPDATE app_table_master set ROW_CNT=NULL,MAXTIMESTAMP=NULL,LAST_SYNC_ON=NULL";
                db.executeSql(sDeleteSyncTablesData, {})
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (e) { console.log(e); reject(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterTableDetails = function () {
        var _this = this;
        //var tableItems=[];
        var length = this.tableItems.length;
        console.log(length);
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                //console.log(len);
                var sSelectSqlstmt = "SELECT lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket FROM PDANEW_LAC_MASTER LIMIT 15 OFFSET " + length + " ;";
                console.log(sSelectSqlstmt);
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            //length=res.rows.length;
                            _this.tableItems.push({
                                LAC_NO: res.rows.item(i).lac_no,
                                BORR_NAME: res.rows.item(i).borr_name,
                                FOLLOW_UP_IND: res.rows.item(i).follow_up_ind,
                                PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
                                MONTHS_OS: res.rows.item(i).months_os,
                                AREA_DESC: res.rows.item(i).area_desc,
                                CUSTOMER_GRADE: res.rows.item(i).customer_grade,
                                PROP_AREA_DESC: res.rows.item(i).prop_area_desc,
                                PROP_NAME: res.rows.item(i).prop_name,
                                EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
                                M_OS: res.rows.item(i).plt,
                                FOLLOW_UP: res.rows.item(i).fu_area_desc,
                                EMP_AREA: res.rows.item(i).emp_area_desc,
                                difficulty_level: res.rows.item(i).difficulty_level,
                                my_basket: res.rows.item(i).my_basket
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(_this.tableItems);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.getFollowuoFlag = function (lacno) {
        var _this = this;
        var followupflaglist = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                //console.log(len);
                var sSelectSqlstmt = "SELECT lac_no,followupflag FROM PDANEW_LAC_MASTER where lac_no=" + lacno;
                console.log(sSelectSqlstmt);
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            followupflaglist.push({
                                LAC_NO: res.rows.item(i).lac_no,
                                followupflag: res.rows.item(i).followupflag,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(followupflaglist);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.ClearLevelUpdate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                db.executeSql("UPDATE PDANEW_LAC_MASTER SET difficulty_level=?,level_remarks=?", ['', ''])
                    .then(function (res) {
                    resolve(res);
                    //alert('level cleared');
                    console.log(res);
                }).catch(function (e) { return console.log(e); });
            });
        });
    };
    DbProvider.prototype.SelectLacMasterAcDetails = function (lacno) {
        var _this = this;
        var lacmasteracdetails = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT lac_no,to_date,plt,last_rcbl_dt,prin_os_last_tr_comb FROM PDANEW_LAC_MASTER where LAC_NO =" + lacno;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            lacmasteracdetails.push({
                                TO_DATE: (res.rows.item(i).to_date).toString().slice(0, 10),
                                LAC_NO: res.rows.item(i).lac_no,
                                last_rcbl_dt: (res.rows.item(i).last_rcbl_dt).toString().slice(0, 10),
                                prin_os_last_tr_comb: res.rows.item(i).prin_os_last_tr_comb,
                                plt: res.rows.item(i).plt
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(lacmasteracdetails);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.SelectLacMasterPltSum = function () {
        var _this = this;
        var plt = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT SUM(plt) as plttot FROM PDANEW_LAC_MASTER ";
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            plt.push({
                                plt: res.rows.item(i).plttot
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(plt);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterTableDetailsPhotoUpload = function (lacno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                //console.log(len);
                var sSelectSqlstmt = "SELECT lac_no,file_no,prop_no,srno,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket,followupflag FROM PDANEW_LAC_MASTER where lac_no=" + lacno;
                console.log(sSelectSqlstmt);
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            _this.tableItems_v1.push({
                                LAC_NO: res.rows.item(i).lac_no,
                                BORR_NAME: res.rows.item(i).borr_name,
                                FOLLOW_UP_IND: res.rows.item(i).follow_up_ind,
                                PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
                                MONTHS_OS: res.rows.item(i).months_os,
                                AREA_DESC: res.rows.item(i).area_desc,
                                CUSTOMER_GRADE: res.rows.item(i).customer_grade,
                                PROP_AREA_DESC: res.rows.item(i).prop_area_desc,
                                PROP_NAME: res.rows.item(i).prop_name,
                                EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
                                M_OS: res.rows.item(i).plt,
                                FOLLOW_UP: res.rows.item(i).fu_area_desc,
                                EMP_AREA: res.rows.item(i).emp_area_desc,
                                difficulty_level: res.rows.item(i).difficulty_level,
                                my_basket: res.rows.item(i).my_basket,
                                followupflag: res.rows.item(i).followupflag,
                                file_no: res.rows.item(i).file_no,
                                prop_no: res.rows.item(i).prop_no,
                                srno: res.rows.item(i).srno
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(_this.tableItems_v1);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterTableDetails_v1 = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.tableItems_v1 = [];
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT os_months_emi,os_months_pmi,lac_no,file_no,prop_no,srno,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket,followupflag FROM PDANEW_LAC_MASTER;";
                //"SELECT os_months_emi,os_months_pmi,lac_no,file_no,prop_no,srno,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket,followupflag FROM PDANEW_LAC_MASTER;"
                console.log(sSelectSqlstmt);
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            if (res.rows.item(i).lac_no != "") {
                                _this.tableItems_v1.push({
                                    LAC_NO: res.rows.item(i).lac_no,
                                    BORR_NAME: res.rows.item(i).borr_name,
                                    FOLLOW_UP_IND: res.rows.item(i).follow_up_ind,
                                    PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
                                    MONTHS_OS: res.rows.item(i).months_os,
                                    AREA_DESC: res.rows.item(i).area_desc,
                                    CUSTOMER_GRADE: res.rows.item(i).customer_grade,
                                    PROP_AREA_DESC: res.rows.item(i).prop_area_desc,
                                    PROP_NAME: res.rows.item(i).prop_name,
                                    EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
                                    M_OS: res.rows.item(i).plt,
                                    FOLLOW_UP: res.rows.item(i).fu_area_desc,
                                    EMP_AREA: res.rows.item(i).emp_area_desc,
                                    difficulty_level: res.rows.item(i).difficulty_level,
                                    my_basket: res.rows.item(i).my_basket,
                                    followupflag: res.rows.item(i).followupflag,
                                    file_no: res.rows.item(i).file_no,
                                    prop_no: res.rows.item(i).prop_no,
                                    srno: res.rows.item(i).srno,
                                    os_months_emi: res.rows.item(i).os_months_emi,
                                    os_months_pmi: res.rows.item(i).os_months_pmi
                                });
                            }
                        }
                    }
                    resolve(_this.tableItems_v1);
                    console.log(res);
                })
                    .then(function (res) {
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetPropName = function (lacno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var proplist = [];
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT prop_name FROM PDANEW_LAC_MASTER where lac_no=" + lacno;
                //"SELECT os_months_emi,os_months_pmi,lac_no,file_no,prop_no,srno,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket,followupflag FROM PDANEW_LAC_MASTER;"
                console.log(sSelectSqlstmt);
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            if (res.rows.item(i).lac_no != "") {
                                proplist.push({
                                    PROP_NAME: res.rows.item(i).prop_name,
                                });
                            }
                        }
                    }
                    resolve(proplist);
                    console.log(res);
                })
                    .then(function (res) {
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.Updatefollowupflag = function (fflag, lacno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "UPDATE PDANEW_LAC_MASTER SET followupflag ='" + fflag + "'WHERE  lac_no =" + lacno;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterTableDFilter = function () {
        var _this = this;
        var table = [];
        console.log(length);
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                //console.log(len);
                var sSelectSqlstmt = "SELECT lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket FROM PDANEW_LAC_MASTER ;";
                console.log(sSelectSqlstmt);
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            table.push({
                                LAC_NO: res.rows.item(i).lac_no,
                                BORR_NAME: res.rows.item(i).borr_name,
                                FOLLOW_UP_IND: res.rows.item(i).follow_up_ind,
                                PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
                                MONTHS_OS: res.rows.item(i).months_os,
                                AREA_DESC: res.rows.item(i).area_desc,
                                CUSTOMER_GRADE: res.rows.item(i).customer_grade,
                                PROP_AREA_DESC: res.rows.item(i).prop_area_desc,
                                PROP_NAME: res.rows.item(i).prop_name,
                                EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
                                M_OS: res.rows.item(i).plt,
                                FOLLOW_UP: res.rows.item(i).fu_area_desc,
                                EMP_AREA: res.rows.item(i).emp_area_desc,
                                difficulty_level: res.rows.item(i).difficulty_level,
                                my_basket: res.rows.item(i).my_basket
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(table);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterTableBasketFilter = function (basketname) {
        var _this = this;
        var table1 = [];
        console.log(length);
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                //console.log(len);
                var sSelectSqlstmt = "SELECT lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level,my_basket FROM PDANEW_LAC_MASTER where my_basket='" + basketname + "'";
                console.log(sSelectSqlstmt);
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            if (res.rows.item(i).lac_no != "") {
                                table1.push({
                                    LAC_NO: res.rows.item(i).lac_no,
                                    BORR_NAME: res.rows.item(i).borr_name,
                                    FOLLOW_UP_IND: res.rows.item(i).follow_up_ind,
                                    PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
                                    MONTHS_OS: res.rows.item(i).months_os,
                                    AREA_DESC: res.rows.item(i).area_desc,
                                    CUSTOMER_GRADE: res.rows.item(i).customer_grade,
                                    PROP_AREA_DESC: res.rows.item(i).prop_area_desc,
                                    PROP_NAME: res.rows.item(i).prop_name,
                                    EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
                                    M_OS: res.rows.item(i).plt,
                                    FOLLOW_UP: res.rows.item(i).fu_area_desc,
                                    EMP_AREA: res.rows.item(i).emp_area_desc,
                                    difficulty_level: res.rows.item(i).difficulty_level,
                                    my_basket: res.rows.item(i).my_basket
                                });
                            }
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(table1);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterTableInfo = function (lac_no) {
        var _this = this;
        console.log(lac_no); //displaying the lac details table page
        var Items = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT emi,os_months_emi,asset_classification,bal_term,roi,rcd_dt,last_tr_dt,sanction,cumdisb,normal_pay_mode,fraud_ind,prop_class,gr_no,origin_place,thru_whom,lac_no FROM PDANEW_LAC_DETAILS where LAC_NO =" + lac_no;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            Items.push({
                                EMI: res.rows.item(i).emi,
                                M0NTH_OS: res.rows.item(i).os_months_emi,
                                ASSET_CLASS: res.rows.item(i).asset_classification,
                                BAL_TERM: res.rows.item(i).bal_term,
                                ROI: res.rows.item(i).roi,
                                RCD: (res.rows.item(i).rcd_dt).toString().slice(0, 10),
                                LAST_TRANS_DATE: (res.rows.item(i).last_tr_dt).toString().slice(0, 10),
                                SANCTION: res.rows.item(i).sanction,
                                DISBAMT: res.rows.item(i).cumdisb,
                                PAY_MODE: res.rows.item(i).normal_pay_mode,
                                FRAUD_CLASS: res.rows.item(i).fraud_ind,
                                PROP_CLASS: res.rows.item(i).prop_class,
                                GROUP_NO: res.rows.item(i).gr_no,
                                LOAN_ORIGIN: res.rows.item(i).origin_place,
                                THROUGH_WHOM: res.rows.item(i).thru_whom,
                                TO_DATE: res.rows.item(i).timestamp,
                                LAC_NO: res.rows.item(i).lac_no,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(Items);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetPropertyDetails = function (lac_no) {
        var _this = this;
        var Prop = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT prop_latitude,prop_longitude,prop_no,prop_addr_line1,prop_addr_line2,prop_pin,prop_city,prop_state,prop_area,no_of_owners,prop_val_cost,reserve_price,master_fileno,docket_location,ta_remarks,tot_plot_area FROM PDANEW_PROP_DETAILS where LAC_NO =" + lac_no;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            Prop.push({
                                prop_no: res.rows.item(i).prop_no,
                                prop_addr_line1: res.rows.item(i).prop_addr_line1,
                                prop_addr_line2: res.rows.item(i).prop_addr_line2,
                                prop_pin: res.rows.item(i).prop_pin,
                                prop_city: res.rows.item(i).prop_city,
                                prop_state: res.rows.item(i).prop_state,
                                prop_area: res.rows.item(i).prop_area,
                                no_of_owners: res.rows.item(i).no_of_owners,
                                prop_val_cost: res.rows.item(i).prop_val_cost,
                                reserve_price: res.rows.item(i).reserve_price,
                                master_fileno: res.rows.item(i).master_fileno,
                                docket_location: res.rows.item(i).docket_location,
                                ta_remarks: res.rows.item(i).ta_remarks,
                                tot_plot_area: res.rows.item(i).tot_plot_area,
                                prop_longi: res.rows.item(i).prop_longitude,
                                prop_lat: res.rows.item(i).prop_latitude
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(Prop);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetDisbDetails = function (lac_no) {
        var _this = this;
        var Disb = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT disb_dt,disb_no,payable_to,doc_amt,doc_no,status FROM PDANEW_DISB_DETAILS where LAC_NO = " + lac_no + " ORDER BY disb_dt";
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            Disb.push({
                                disb_dt: (res.rows.item(i).disb_dt).toString().slice(0, 10),
                                disb_no: res.rows.item(i).disb_no,
                                payable_to: res.rows.item(i).payable_to,
                                doc_amt: res.rows.item(i).doc_amt,
                                doc_no: res.rows.item(i).doc_no,
                                status: res.rows.item(i).status,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(Disb);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetDisbAmtDetails = function (lac_no) {
        var _this = this;
        var amt = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT doc_amt,SUM(doc_amt) AS Total_Disbursed_amount FROM PDANEW_DISB_DETAILS where LAC_NO =" + lac_no;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            amt.push({
                                Total_disbursed_amount: res.rows.item(i).Total_Disbursed_amount,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(amt);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetUniqueIdDetails = function (lac_no) {
        var _this = this;
        var Uid = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT laf_no,cur_emios,cur_mros,lac_no,total,plt_comb,months_comb,origin_branch,cur_osadd FROM pdanew_unique_id_accounts where LAC_NO =" + lac_no;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            Uid.push({
                                laf_no: res.rows.item(i).laf_no,
                                cur_emios: res.rows.item(i).cur_emios,
                                cur_mros: res.rows.item(i).cur_mros,
                                lac_no: res.rows.item(i).lac_no,
                                total: res.rows.item(i).total,
                                plt_comb: res.rows.item(i).plt_comb,
                                months_comb: res.rows.item(i).months_comb,
                                origin_branch: res.rows.item(i).origin_branch,
                                cur_osadd: res.rows.item(i).cur_osadd
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(Uid);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetFileReminder = function (file_no) {
        var _this = this;
        var reminder = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT updation_date,reminder,user_id FROM PDANEW_FILE_REMINDERS where FILE_NO =" + file_no;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            reminder.push({
                                updation_date: (res.rows.item(i).updation_date).toString().slice(0, 10),
                                reminder: res.rows.item(i).reminder,
                                user_id: res.rows.item(i).user_id
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(reminder);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetBuilderDetails = function (file_no) {
        var _this = this;
        var detail = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "select * from PDANEW_LAC_MASTER LM JOIN PDANEW_PROPERTY_MST PM WHERE LM.LAC_NO =" + file_no + " AND LM.LAC_NO = PM.FILE_NO";
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            detail.push({
                                builder_no: res.rows.item(i).BUILDER_NO,
                                builder_name: res.rows.item(i).BUILDER_NAME,
                                builder_contact: res.rows.item(i).builder_contact,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(detail);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetACDetails = function (lac_no) {
        var _this = this;
        var acdetails = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT LY_OS_EMI,LY_OS_PMI,LY_OS_ADD_INT,LY_OS_MR,LY_OS_PPC,LY_OS_SI,LY_OS_TOT,emi_recble,pmi_recble,add_int_recble,mr_recble,ppc_recble,si_recble,tot_recble,ppc_recd,tot_recd,mr_recd,emi_recd,pmi_recd,si_recd,add_int_recd,emi_curos,pmi_curos,add_curos,mr_curos,cur_ppcos,cur_sios,tot_curos FROM PDANEW_LAC_DETAILS where LAC_NO =" + lac_no;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            acdetails.push({
                                LY_OS_EMI: res.rows.item(i).ly_os_emi,
                                LY_OS_PMI: res.rows.item(i).ly_os_pmi,
                                LY_OS_ADD_INT: res.rows.item(i).ly_os_add_int,
                                LY_OS_MR: res.rows.item(i).ly_os_mr,
                                LY_OS_PPC: res.rows.item(i).ly_os_ppc,
                                LY_OS_SI: res.rows.item(i).ly_os_si,
                                LY_OS_TOTAL: res.rows.item(i).ly_os_tot,
                                emi_recble: res.rows.item(i).emi_recble,
                                pmi_recble: res.rows.item(i).pmi_recble,
                                add_int_recble: res.rows.item(i).add_int_recble,
                                mr_recble: res.rows.item(i).mr_recble,
                                ppc_recble: res.rows.item(i).ppc_recble,
                                si_recble: res.rows.item(i).si_recble,
                                tot_recble: res.rows.item(i).tot_recble,
                                emi_recd: res.rows.item(i).emi_recd,
                                pmi_recd: res.rows.item(i).pmi_recd,
                                add_int_recd: res.rows.item(i).add_int_recd,
                                mr_recd: res.rows.item(i).mr_recd,
                                ppc_recd: res.rows.item(i).ppc_recd,
                                si_recd: res.rows.item(i).si_recd,
                                tot_recd: res.rows.item(i).tot_recd,
                                emi_curos: res.rows.item(i).emi_curos,
                                pmi_curos: res.rows.item(i).pmi_curos,
                                add_curos: res.rows.item(i).add_curos,
                                mr_curos: res.rows.item(i).mr_curos,
                                cur_ppcos: res.rows.item(i).cur_ppcos,
                                cur_sios: res.rows.item(i).cur_sios,
                                tot_curos: res.rows.item(i).tot_curos,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(acdetails);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetCustContact = function (lac_no) {
        var _this = this;
        var contact = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "SELECT cust_number,contact_type,contact_det FROM PDANEW_CUST_CONTACT WHERE LAC_NO =" + lac_no;
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            contact.push({
                                cust_number: res.rows.item(i).cust_number,
                                contact_type: res.rows.item(i).contact_type,
                                contact_det: res.rows.item(i).contact_det,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(contact);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetCommDetails_1 = function (file_no) {
        var _this = this;
        var commdetails = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt = "select cust_name,capacity,cust_number,addr_type,addr_line1,addr_line2,addr_line3,addr_line4,city,tel_no,spec_addr,mobile_no,email from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO =" + file_no + " AND CAPACITY ='B'";
                db.executeSql(sSelectSqlstmt, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            commdetails.push({
                                cust_name: res.rows.item(i).cust_name,
                                addr_type: res.rows.item(i).addr_type,
                                addr_line1: res.rows.item(i).addr_line1,
                                addr_line2: res.rows.item(i).addr_line2,
                                addr_line3: res.rows.item(i).addr_line3,
                                addr_line4: res.rows.item(i).addr_line4,
                                city: res.rows.item(i).city,
                                tel_no: res.rows.item(i).tel_no,
                                spec_addr: res.rows.item(i).spec_addr,
                                mobile_no: res.rows.item(i).mobile_no,
                                email: res.rows.item(i).email,
                                capacity: res.rows.item(i).capacity,
                                comm_custno: res.rows.item(i).cust_number,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(commdetails);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetCommDetails_2 = function (file_no) {
        var _this = this;
        var common = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select cust_name,capacity,cust_number,addr_type,addr_line1,addr_line2,addr_line3,addr_line4,city,tel_no,spec_addr,mobile_no,email from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO =" + file_no + " AND CAPACITY ='C'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            common.push({
                                cust_name: res.rows.item(i).cust_name,
                                addr_type: res.rows.item(i).addr_type,
                                addr_line1: res.rows.item(i).addr_line1,
                                addr_line2: res.rows.item(i).addr_line2,
                                addr_line3: res.rows.item(i).addr_line3,
                                addr_line4: res.rows.item(i).addr_line4,
                                city: res.rows.item(i).city,
                                tel_no: res.rows.item(i).tel_no,
                                spec_addr: res.rows.item(i).spec_addr,
                                mobile_no: res.rows.item(i).mobile_no,
                                email: res.rows.item(i).email,
                                capacity: res.rows.item(i).capacity,
                                comm_custno: res.rows.item(i).cust_number,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(common);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetCommDetails_3 = function (file_no) {
        var _this = this;
        var guarantor = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select cust_name,capacity,cust_number,addr_type,addr_line1,addr_line2,addr_line3,addr_line4,city,tel_no,spec_addr,mobile_no,email from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO =" + file_no + " AND CAPACITY ='G'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            guarantor.push({
                                cust_name: res.rows.item(i).cust_name,
                                addr_type: res.rows.item(i).addr_type,
                                addr_line1: res.rows.item(i).addr_line1,
                                addr_line2: res.rows.item(i).addr_line2,
                                addr_line3: res.rows.item(i).addr_line3,
                                addr_line4: res.rows.item(i).addr_line4,
                                city: res.rows.item(i).city,
                                tel_no: res.rows.item(i).tel_no,
                                spec_addr: res.rows.item(i).spec_addr,
                                mobile_no: res.rows.item(i).mobile_no,
                                email: res.rows.item(i).email,
                                capacity: res.rows.item(i).capacity,
                                comm_custno: res.rows.item(i).cust_number,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(guarantor);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    // GetCommDetailsaddrstype(file_no){
    // 	var commndtls=[];
    //  	return new Promise((resolve,reject)=>{
    // 			this.sqlite.create(this.options)
    // 			.then((db : SQLiteObject) => {
    // 				let sSelectSqlstmt1= "select addr_type,capacity from PDANEW_CUSTOMER_ADDRESS WHERE FILE_NO ="+file_no
    // 				db.executeSql(sSelectSqlstmt1, {})
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
    DbProvider.prototype.UpdateCustomerDetails = function (fileno, latitude_desc, langtitude_desc, capacity, latitude, longitude, srno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "UPDATE PDANEW_CUSTOMER_ADDRESS_NEW SET '" + latitude_desc + "'='" + latitude + "','" + langtitude_desc + "'='" + longitude +
                    "'  WHERE file_no = '" + fileno + "' AND srno='" + srno + "' AND capacity='" + capacity + "';";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetCustomerAddress = function (file_no) {
        var _this = this;
        var address = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select distinct lfa.addr_type,lfa.capacity,lfa.cust_number,lfa.file_no,fa.address,fa.comm_address,fa.srno,fa.prop_address,fa.empl_address,fa.file_no,fa.comm_custno,fa.empl_latitude,fa.empl_longitude,fa.comm_longitude,fa.comm_latitude,fa.prop_latitude,fa.prop_longitude from PDANEW_CUSTOMER_ADDRESS_NEW fa JOIN PDANEW_CUSTOMER_ADDRESS lfa WHERE fa.file_no = '" + file_no + "'and fa.file_no = lfa.file_no and lfa.cust_number=fa.comm_custno";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            var address1 = "";
                            var latitude = "";
                            var longitude = "";
                            var addresstype = "";
                            if (res.rows.item(i).addr_type == "C") {
                                latitude = res.rows.item(i).comm_latitude,
                                    longitude = res.rows.item(i).comm_longitude,
                                    address1 = res.rows.item(i).comm_address,
                                    addresstype = "C";
                            }
                            else if (res.rows.item(i).addr_type == "E") {
                                latitude = res.rows.item(i).empl_latitude,
                                    longitude = res.rows.item(i).empl_longitude,
                                    address1 = res.rows.item(i).empl_address,
                                    addresstype = "E";
                            }
                            else {
                                latitude = res.rows.item(i).prop_latitude,
                                    longitude = res.rows.item(i).prop_longitude,
                                    address1 = res.rows.item(i).prop_address,
                                    addresstype = "P";
                            }
                            address.push({
                                addresstype: res.rows.item(i).addr_type,
                                capacity: res.rows.item(i).capacity,
                                comm_custno: res.rows.item(i).cust_number,
                                file_no: res.rows.item(i).file_no,
                                address: address1,
                                empl_latitude: res.rows.item(i).empl_latitude,
                                empl_longitude: res.rows.item(i).empl_longitude,
                                comm_longitude: res.rows.item(i).comm_longitude,
                                comm_latitude: res.rows.item(i).comm_latitude,
                                prop_latitude: res.rows.item(i).prop_latitude,
                                prop_longitude: res.rows.item(i).prop_longitude,
                                comm_address: res.rows.item(i).comm_address,
                                prop_address: res.rows.item(i).prop_address,
                                empl_address: res.rows.item(i).empl_address,
                                latitude: latitude,
                                longitude: longitude,
                                addtype: addresstype,
                                srno: res.rows.item(i).srno
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(address);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetFu_actionPopoverDetails = function (lac_no, sr_no) {
        var _this = this;
        var faction = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select action,date_of_action,response,def_observ,opr_id,remark,srno from PDANEW_LAC_FU_ACTION WHERE LAC_NO = " + lac_no + " AND SRNO ='" + sr_no + "'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            faction.push({
                                action: res.rows.item(i).action,
                                date_of_action: (res.rows.item(i).date_of_action).toString().slice(0, 10),
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
                    .then(function (res) {
                    resolve(faction);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetFu_actionDetails_1 = function (lac_no) {
        var _this = this;
        console.log(lac_no);
        var faction = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select action,date_of_action,response,def_observ,opr_id,remark,srno from PDANEW_LAC_FU_ACTION WHERE LAC_NO = " + lac_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            faction.push({
                                action: res.rows.item(i).action,
                                date_of_action: (res.rows.item(i).date_of_action).toString().slice(0, 10),
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
                    .then(function (res) {
                    resolve(faction);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetLegalAction = function (lac_no) {
        var _this = this;
        var legalaction = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select lfa.date_of_action,fa.remark,lfa.action,fa.activity_type from PDANEW_FULG_ACTIONS fa GetCustomerAddress PDANEW_LAC_FU_ACTION lfa WHERE fa.lac_no = " + lac_no + " and fa.lac_no = lfa.lac_no";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            legalaction.push({
                                action: res.rows.item(i).action,
                                date_of_action: (res.rows.item(i).date_of_action).toString().slice(0, 10),
                                remark: res.rows.item(i).remark,
                                activity_type: res.rows.item(i).activity_type,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(legalaction);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetEmiTrans = function (lac_no) {
        var _this = this;
        var EmiTrans = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select rcbl,rcvd,os,tr_desc,bank_nm,bnc_reason,tran_dt from PDANEW_EMI_TRANS WHERE lac_no = " + lac_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            EmiTrans.push({
                                rcbl: res.rows.item(i).rcbl,
                                rcvd: res.rows.item(i).rcvd,
                                os: res.rows.item(i).os,
                                tr_desc: res.rows.item(i).tr_desc,
                                bank_nm: res.rows.item(i).bank_nm,
                                bnc_reason: res.rows.item(i).bnc_reason,
                                tran_dt: res.rows.item(i).tran_dt.toString().slice(0, 10),
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(EmiTrans);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetEmiTransTotal = function (lac_no) {
        var _this = this;
        var EmiTranst = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "Select rcbl ,rcvd ,os  FROM PDANEW_EMI_TRANS  t  where t.LAC_NO= '" + lac_no + "' and  t.tran_dt='1666-01-30T12:00:00';";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            EmiTranst.push({
                                rcbl: res.rows.item(i).rcbl,
                                rcvd: res.rows.item(i).rcvd,
                                os: res.rows.item(i).rcbl - res.rows.item(i).rcvd,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(EmiTranst);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetPmiTrans = function (lac_no) {
        var _this = this;
        var PmiTrans = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select rcbl,rcvd,os,effective_dt,tr_type,timestamp,bnc_reason from PDANEW_PMI_TRANS  WHERE lac_no = " + lac_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            PmiTrans.push({
                                rcbl: res.rows.item(i).rcbl,
                                rcvd: res.rows.item(i).rcvd,
                                os: res.rows.item(i).os,
                                tr_type: res.rows.item(i).tr_type,
                                bnc_reason: res.rows.item(i).bnc_reason,
                                effective_dt: (res.rows.item(i).effective_dt).toString().slice(0, 10),
                                timestamp: (res.rows.item(i).timestamp).toString().slice(0, 10),
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(PmiTrans);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetPmiTransTotal = function (lac_no) {
        var _this = this;
        var EmiTranst = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT sum(ifnull(RCBL,0)) as a, sum(ifnull(RCVD,0)) as b, sum(ifnull(OS,0)) as c  FROM PDANEW_PMI_TRANS t where t.LAC_NO= '" + lac_no + "'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            EmiTranst.push({
                                rcbl: res.rows.item(i).a,
                                rcvd: res.rows.item(i).b,
                                os: res.rows.item(i).a - res.rows.item(i).b,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(EmiTranst);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetAITrans = function (lac_no) {
        var _this = this;
        var AITrans = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select tran_dt,ai_rcbl,ai_rcvd,ai_out,mr_rcbl,mr_rcvd,mr_out from PDANEW_AI_IC WHERE lac_no = " + lac_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            AITrans.push({
                                tran_dt: (res.rows.item(i).tran_dt).toString().slice(0, 10),
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
                    .then(function (res) {
                    resolve(AITrans);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetIlpsRemarks = function (file_no) {
        var _this = this;
        var IlpsRemarks = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select REMARKS,UPD_DATE from PDANEW_ILPS_REMARKS WHERE FILE_NO =" + file_no + " ORDER BY UPD_DATE DESC ";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            IlpsRemarks.push({
                                remarks: res.rows.item(i).REMARKS,
                                upd_date: (res.rows.item(i).UPD_DATE).toString().slice(0, 10),
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(IlpsRemarks);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetLacRemarks = function (file_no) {
        var _this = this;
        var LacRemarks = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select REMARKS,LAST_UPD,OPR_ID from PDANEW_LAC_REMARKS WHERE LAC_NO =" + file_no + " ORDER BY last_upd DESC ";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            LacRemarks.push({
                                remarks: res.rows.item(i).REMARKS,
                                last_upd: (res.rows.item(i).LAST_UPD).toString().slice(0, 10),
                                opr_id: res.rows.item(i).OPR_ID,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(LacRemarks);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetTabAlerts = function (file_no) {
        var _this = this;
        var tabalert = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select ALERT_DATE,BORR_NAME,ALERT_NAME,ALERT_TEXT,REMARKS from TAB_DAILY_ALERTS WHERE LAC_NO =" + file_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    console.log(file_no);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            tabalert.push({
                                BORR_NAME: res.rows.item(i).BORR_NAME,
                                ALERT_DATE: (res.rows.item(i).ALERT_DATE).toString().slice(0, 10),
                                ALERT_NAME: res.rows.item(i).ALERT_NAME,
                                ALERT_TEXT: res.rows.item(i).ALERT_TEXT,
                                REMARKS: res.rows.item(i).REMARKS,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(tabalert);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetLacTerms = function (file_no) {
        var _this = this;
        var LacTerms = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select TO_DT,AMT,T_TYPE,ROI,UPD_DATE,FROM_DT,PERIODICITY from PDANEW_LAC_TERMS WHERE LAC_NO =" + file_no + " ORDER BY TO_DT DESC ";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            LacTerms.push({
                                AMT: res.rows.item(i).AMT,
                                TO_DT: (res.rows.item(i).TO_DT).toString().slice(0, 10),
                                FROM_DT: (res.rows.item(i).FROM_DT).toString().slice(0, 10),
                                UPD_DATE: (res.rows.item(i).UPD_DATE).toString().slice(0, 10),
                                T_TYPE: res.rows.item(i).T_TYPE,
                                ROI: res.rows.item(i).ROI,
                                PERIODICITY: res.rows.item(i).PERIODICITY
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(LacTerms);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetLacTerAmrt = function (file_no) {
        var _this = this;
        var LacTerAmrt = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select AMRT_FR_DT,DT_OF_AMRT,AMRT_TO_DT,YYYYYY from PDANEW_LAC_AMRT WHERE LAC_NO =" + file_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            LacTerAmrt.push({
                                AMRT_FR_DT: (res.rows.item(i).AMRT_FR_DT).toString().slice(0, 10),
                                DT_OF_AMRT: (res.rows.item(i).DT_OF_AMRT).toString().slice(0, 10),
                                AMRT_TO_DT: (res.rows.item(i).AMRT_TO_DT).toString().slice(0, 10),
                                YYYYYY: (res.rows.item(i).YYYYYY),
                                PERIODICITY: res.rows.item(i).PERIODICITY
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(LacTerAmrt);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetLacDinfo = function (file_no) {
        var _this = this;
        var LacDinfo = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select RISK_EVENT,UPDATED_BY,UPDATED_DATE from PDANEW_LAC_DEFAULT_INFO WHERE LAC_NO =" + file_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            LacDinfo.push({
                                RISK_EVENT: res.rows.item(i).RISK_EVENT,
                                UPDATED_BY: res.rows.item(i).UPDATED_BY,
                                UPDATED_DATE: (res.rows.item(i).UPDATED_DATE).toString().slice(0, 10),
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(LacDinfo);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetActRe = function (file_no) {
        var _this = this;
        var ActRe = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select NXT_ACTION,DEF_OBSERV,NAME from PDANEW_FU_ACT_REMINDER WHERE LAC_NO =" + file_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            ActRe.push({
                                NXT_ACTION: (res.rows.item(i).NXT_ACTION).toString().slice(0, 10),
                                DEF_OBSERV: res.rows.item(i).DEF_OBSERV,
                                NAME: res.rows.item(i).NAME,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(ActRe);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetLgDocs = function (file_no) {
        var _this = this;
        var LgDocs = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select original,doc_code,action_date from PDANEW_LG_DOCUMENTS WHERE file_no =" + file_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            LgDocs.push({
                                original: res.rows.item(i).original,
                                doc_code: res.rows.item(i).doc_code,
                                action_date: (res.rows.item(i).action_date).toString().slice(0, 10),
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(LgDocs);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetFuActdetails = function (file_no) {
        var _this = this;
        var Fuaction_info = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select DATE_OF_ACTION,ACTION,AMOUNT_TOBECHG,ACTION_DESC from PDACRM_FULG_ACTIONS WHERE LAC_NO =" + file_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            Fuaction_info.push({
                                DATE_OF_ACTION: (res.rows.item(i).DATE_OF_ACTION).toString().slice(0, 10),
                                ACTION_DESC: res.rows.item(i).ACTION_DESC,
                                ACTION: res.rows.item(i).ACTION,
                                AMOUNT_TOBECHG: res.rows.item(i).AMOUNT_TOBECHG,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(Fuaction_info);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetCriticalInfo = function (file_no) {
        var _this = this;
        var criticalinfo = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select DATE_OF_ACTION,UPD_DATE,SPECIAL_INFO_TYPE from PDANEW_CRITICAL_INFO WHERE LAC_NO =" + file_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            criticalinfo.push({
                                DATE_OF_ACTION: (res.rows.item(i).DATE_OF_ACTION).toString().slice(0, 10),
                                UPD_DATE: (res.rows.item(i).UPD_DATE).toString().slice(0, 10),
                                SPECIAL_INFO_TYPE: res.rows.item(i).SPECIAL_INFO_TYPE,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(criticalinfo);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.GetAITransTotal = function (lac_no) {
        var _this = this;
        var AITranstot = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT sum(ifnull(AI_RCBL,0)) as a, sum(ifnull(AI_RCVD,0)) as b, sum(ifnull(AI_OUT,0)) as c, sum(ifnull(MR_RCBL,0)) as d, sum(ifnull(MR_RCVD,0)) as e, sum(ifnull(MR_OUT,0)) as f FROM PDANEW_AI_IC t where t.LAC_NO= '" + lac_no + "'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            AITranstot.push({
                                total_rcbl: res.rows.item(i).a,
                                total_rcvd: res.rows.item(i).b,
                                total_out: res.rows.item(i).a - res.rows.item(i).b,
                                mr_rcbl: res.rows.item(i).d,
                                mr_rcvd: res.rows.item(i).e,
                                mr_out: res.rows.item(i).d - res.rows.item(i).e,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(AITranstot);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterDetailsSort = function (sortorder, sorttype) {
        var _this = this;
        var sortitems = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select followupflag,my_basket,lac_no,borr_name,follow_up_ind,prin_os_last_tr_comb,months_os,area_desc,customer_grade,prop_area_desc,fu_area_desc,emp_area_desc,selfemp_company_name,plt,prop_name,difficulty_level from PDANEW_LAC_MASTER where lac_no !='' ORDER BY " + sorttype + " " + sortorder;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            sortitems.push({
                                LAC_NO: res.rows.item(i).lac_no,
                                BORR_NAME: res.rows.item(i).borr_name,
                                FOLLOW_UP_IND: res.rows.item(i).follow_up_ind,
                                PRIN_OS_LAST_TR_COMB: res.rows.item(i).prin_os_last_tr_comb,
                                MONTHS_OS: res.rows.item(i).months_os,
                                AREA_DESC: res.rows.item(i).area_desc,
                                CUSTOMER_GRADE: res.rows.item(i).customer_grade,
                                PROP_AREA_DESC: res.rows.item(i).prop_area_desc,
                                PROP_NAME: res.rows.item(i).prop_name,
                                EMP_COMPANY_NAME: res.rows.item(i).selfemp_company_name,
                                M_OS: res.rows.item(i).plt,
                                FOLLOW_UP: res.rows.item(i).fu_area_desc,
                                EMP_AREA: res.rows.item(i).emp_area_desc,
                                difficulty_level: res.rows.item(i).difficulty_level,
                                my_basket: res.rows.item(i).my_basket,
                                followupflag: res.rows.item(i).followupflag,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(sortitems);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterSetLevel = function (lac_no, level, remark) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "UPDATE PDANEW_LAC_MASTER SET difficulty_level ='" + level + "',level_remarks ='" + remark +
                    "' WHERE  lac_no =" + lac_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterMyBasket = function (lac_no, basketname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "UPDATE PDANEW_LAC_MASTER SET my_basket='" + basketname + "' WHERE  lac_no =" + lac_no;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    // LacMasterSelectMyBasket(){
    // 	return new Promise((resolve,reject)=>{
    // 			this.sqlite.create(this.options)
    // 			.then((db : SQLiteObject) => {
    // 				let sSelectSqlstmt1= "select distinct my_basket as basket_name from PDANEW_LAC_MASTER where my_basket !=''"
    // 				db.executeSql(sSelectSqlstmt1, {})
    // 					.then(res =>
    // 					{
    // 					console.log(res);
    // 				 }).catch(e=>console.log(e))
    // 			}).catch(e=>console.log(e))
    // 		})
    // }
    DbProvider.prototype.LacMasterSelectMyBasket = function () {
        var _this = this;
        var SelectMyBasket = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select distinct my_basket from PDANEW_LAC_MASTER where my_basket !='' and my_basket!='undefined'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            SelectMyBasket.push({
                                basket: res.rows.item(i).my_basket
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(SelectMyBasket);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.LacMasterInsertMyBasket = function (basketname) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sInsertAppMasterScript = "INSERT INTO PDANEW_LAC_MASTER(lac_no ,  my_basket) values(?,?)";
                db.executeSql(sInsertAppMasterScript, ["", basketname])
                    .then(function (res) {
                    resolve(res);
                })
                    .catch(function (e) { console.log(e); reject(e); });
            })
                .catch(function (e) { return alert(e); });
        });
    };
    DbProvider.prototype.GetReminders = function () {
        var _this = this;
        var Reminders = [];
        return new Promise(function (resolve, reject) {
            if (_this.reminders.length == 0) {
                _this.sqlite.create(_this.options)
                    .then(function (db) {
                    //console.log(len);
                    var sSelectSqlstmt = "select LAC_NO,NAME,DEF_OBSERV,NXT_ACTION from PDANEW_FU_ACT_REMINDER";
                    console.log(sSelectSqlstmt);
                    db.executeSql(sSelectSqlstmt, {})
                        .then(function (res) {
                        console.log(res.rows.length);
                        if (res.rows.length > 0) {
                            for (var i = 0; i < res.rows.length; i++) {
                                //length=res.rows.length;
                                if (res.rows.item(i).lac_no != "") {
                                    _this.reminders.push({
                                        LAC_NO: res.rows.item(i).LAC_NO,
                                        NAME: res.rows.item(i).NAME,
                                        DEF_OBSERV: (res.rows.item(i).DEF_OBSERV).toString().slice(0, 10),
                                        NXT_ACTION: res.rows.item(i).NXT_ACTION,
                                    });
                                }
                            }
                        }
                        console.log(res);
                    })
                        .then(function (res) {
                        resolve(_this.reminders);
                    }).catch(function (e) { return console.log(e); });
                }).catch(function (e) { return console.log(e); });
            }
            else {
                resolve(_this.reminders);
            }
        });
        // var Reminders =[];
        // return new Promise((resolve,reject)=>{
        // 		this.sqlite.create(this.options)
        // 		.then((db : SQLiteObject) => {
        // 			let sSelectSqlstmt1= "select LAC_NO,NAME,DEF_OBSERV,NXT_ACTION from PDANEW_FU_ACT_REMINDER"
        // 			db.executeSql(sSelectSqlstmt1, {})
        // 				.then(res =>
        // 				{
        // 					console.log(res);
        // 				if (res.rows.length > 0) {
        // 				    for (let i=0; i < res.rows.length; i++){
        // 						Reminders.push({
        // 							LAC_NO:res.rows.item(i).LAC_NO,
        // 							NAME:res.rows.item(i).NAME,
        // 							DEF_OBSERV:(res.rows.item(i).DEF_OBSERV).toString().slice(0,10),
        // 							NXT_ACTION:res.rows.item(i).NXT_ACTION,
        // 	                    }); 
        // 	                }
        // 			    }
        //      			console.log(res);
        // 				})
        // 				.then(res => {
        //             	resolve(Reminders);
        // 			}).catch(e=>console.log(e))
        // 		}).catch(e=>console.log(e))
        // 	})
    };
    DbProvider.prototype.fuaction_ci_type = function () {
        var _this = this;
        var ci_type = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT para_desc,para_value FROM PDANEW_LAC_USER_PARA WHERE para_code = 'CI_TYPE'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            ci_type.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_value: res.rows.item(i).para_value
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(ci_type);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.fuaction_risk_event = function () {
        var _this = this;
        var risk_event = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "Select para_code,para_value,para_desc From pdanew_lac_user_para Where PARA_CODE='RISK'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            risk_event.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_code: res.rows.item(i).para_code,
                                para_value: res.rows.item(i).para_value,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(risk_event);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.f_action_search = function (action, actionvaldata) {
        var _this = this;
        var f_search = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT para_code,para_value,para_desc,para_value FROM PDANEW_LAC_USER_PARA WHERE para_code = '" + action + "' AND para_desc like '%" +
                    actionvaldata + "%'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            f_search.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_code: res.rows.item(i).para_code,
                                para_value: res.rows.item(i).para_value,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(f_search);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.f_action_searchareacode = function (action, actionvaldata) {
        var _this = this;
        var f_searchlist = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '" + action + "'  AND para_desc like '%" +
                    actionvaldata + "%'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            f_searchlist.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_code: res.rows.item(i).para_code,
                                para_value: res.rows.item(i).para_value,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(f_searchlist);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.f_action_response_cd = function (action, actionvaldata) {
        var _this = this;
        var f_response_cd = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '" + action + "'  AND para_desc like '%" +
                    actionvaldata + "%'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            f_response_cd.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_code: res.rows.item(i).para_code,
                                para_value: res.rows.item(i).para_value,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(f_response_cd);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.f_action_DEF_OBS_CD = function (action, actionvaldata) {
        var _this = this;
        var f_DEF_OBS_CD = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '" + action + "'  AND para_desc like '%" +
                    actionvaldata + "%'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            f_DEF_OBS_CD.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_code: res.rows.item(i).para_code,
                                para_value: res.rows.item(i).para_value,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(f_DEF_OBS_CD);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.f_ACTION_TO_BE_CD = function (action, actionvaldata) {
        var _this = this;
        var f_ACTION_TO_BE_CD = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = '" + action + "'  AND para_desc like '%" +
                    actionvaldata + "%'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            f_ACTION_TO_BE_CD.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_code: res.rows.item(i).para_code,
                                para_value: res.rows.item(i).para_value,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(f_ACTION_TO_BE_CD);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.getBorrDetails = function () {
        var _this = this;
        var borr_details = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT para_code,para_value,para_desc FROM PDANEW_LAC_USER_PARA WHERE para_code = 'BORR_RELATION'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            borr_details.push({
                                para_desc: res.rows.item(i).para_desc,
                                para_value: res.rows.item(i).para_value
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(borr_details);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    //////////////////////////////insert into upload tables ////////////////////////////////////////////////////////////////////////////////////
    DbProvider.prototype.insertIntoProp_Class = function (classcode, lacno, specificvalue, ldapid) {
        var _this = this;
        var PDANEW_PROP_CLASS_DATA = [];
        //--select values from App_Table_Master,insert into app_table_master and update last_sync_on=last maxtimestamp and current timestamp into maxtimestamp
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                //this.getAppMasterUserID();
                var sInsertAppTableMasterScript = "INSERT INTO PDANEW_PROP_CLASS(class_code,lac_no,specific_value,ldap_id) VALUES(?,?,?,?)";
                db.executeSql(sInsertAppTableMasterScript, [classcode, lacno, specificvalue, ldapid]).then(function () {
                    // let UpdateSql="UPDATE PDANEW_PROP_CLASS SET UPLOADED_FLAG='N' where lac_no="+lacno;
                    // 	db.executeSql(UpdateSql,[]).then(res=>{
                    // 	console.log(res);
                    // })
                    var SelectSql = "SELECT * FROM PDANEW_PROP_CLASS where lac_no=" + lacno;
                    db.executeSql(SelectSql, []).then(function (res) {
                        console.log(res);
                        for (var i = 0; i < res.rows.length; i++) {
                            PDANEW_PROP_CLASS_DATA.push(res.rows.item(i));
                        }
                        resolve(PDANEW_PROP_CLASS_DATA);
                    });
                });
            })
                .catch(function (e) { reject(e); console.log(e); });
        });
    };
    DbProvider.prototype.Delete_Class = function (lacno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "DELETE FROM PDANEW_PROP_CLASS  where lac_no=" + lacno;
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                });
            });
        });
    };
    DbProvider.prototype.deleteallPropClass = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "DELETE FROM PDANEW_PROP_CLASS ";
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    resolve(res);
                });
            });
        });
    };
    DbProvider.prototype.SelectProp_Class = function (lacno) {
        var _this = this;
        var propclass = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT * FROM  PDANEW_PROP_CLASS where lac_no=" + lacno;
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        propclass.push(res.rows.item(i));
                    }
                    resolve(propclass);
                });
            });
        });
    };
    DbProvider.prototype.selectPropClassCode = function (lacno) {
        var _this = this;
        var classcode = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT class_code from  PDANEW_PROP_CLASS where lac_no=" + lacno;
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        classcode.push(res.rows.item(i));
                    }
                    resolve(classcode);
                });
            });
        });
    };
    DbProvider.prototype.selectallPropClass = function () {
        var _this = this;
        var propclassall = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT * FROM  PDANEW_PROP_CLASS";
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        propclassall.push(res.rows.item(i));
                    }
                    resolve(propclassall);
                });
            });
        });
    };
    DbProvider.prototype.insertIntonew_fu_action = function (lac_no, action_type, risk_event, area_code, amount_spent, action, response, action_to_be, def_observ, action_to_be_dt, special_info_type, amount_tobechg, remark, actndate, ldapid, version_no) {
        var _this = this;
        var PDANEW_NEW_FU_ACTION_DATA = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sInsertAppTableMasterScript = "INSERT INTO PDANEW_NEW_FU_ACTION(lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,date_of_action,ldap_id,version_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                db.executeSql(sInsertAppTableMasterScript, [lac_no, action_type, risk_event, area_code, amount_spent, action, response, action_to_be, def_observ, action_to_be_dt, special_info_type, amount_tobechg, remark, actndate, ldapid, version_no]).then(function () {
                    var SelectSql = "SELECT * FROM PDANEW_NEW_FU_ACTION where lac_no=" + lac_no;
                    db.executeSql(SelectSql, []).then(function (res) {
                        console.log(res);
                        for (var i = 0; i < res.rows.length; i++) {
                            PDANEW_NEW_FU_ACTION_DATA.push(res.rows.item(i));
                        }
                        resolve(PDANEW_NEW_FU_ACTION_DATA);
                    });
                });
            })
                .catch(function (e) { reject(e); console.log(e); });
        });
    };
    DbProvider.prototype.insertIntonew_fu_action1 = function (lac_no, action_type, risk_event, area_code, amount_spent, action, response, action_to_be, def_observ, action_to_be_dt, special_info_type, amount_tobechg, remark, actndate, ldapid, version_no) {
        var _this = this;
        var PDANEW_NEW_FU_ACTION_DATA = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sInsertAppTableMasterScript = "INSERT INTO PDANEW_NEW_FU_ACTION(lac_no,action_type,risk_event,area_code,amount_spent,action,response,action_to_be,def_observ,action_to_be_dt,special_info_type,amount_tobechg,remark,date_of_action,ldap_id,version_no) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                db.executeSql(sInsertAppTableMasterScript, [lac_no, action_type, risk_event, area_code, amount_spent, action, response, action_to_be, def_observ, action_to_be_dt, special_info_type, amount_tobechg, remark, actndate, ldapid, version_no]).then(function () {
                    var SelectSql = "SELECT * FROM PDANEW_NEW_FU_ACTION where lac_no=" + lac_no;
                    db.executeSql(SelectSql, []).then(function (res) {
                        console.log(res);
                        for (var i = 0; i < res.rows.length; i++) {
                            PDANEW_NEW_FU_ACTION_DATA.push(res.rows.item(i));
                        }
                        resolve(PDANEW_NEW_FU_ACTION_DATA);
                    });
                });
            })
                .catch(function (e) { reject(e); console.log(e); });
        });
    };
    DbProvider.prototype.Delete_new_fu_action = function (lacno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "DELETE FROM PDANEW_NEW_FU_ACTION  where lac_no=" + lacno;
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                });
            });
        });
    };
    DbProvider.prototype.Selectnew_fu_action = function (lacno) {
        var _this = this;
        var fuact = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT * FROM  PDANEW_NEW_FU_ACTION where lac_no=" + lacno;
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        fuact.push(res.rows.item(i));
                    }
                    resolve(fuact);
                });
            });
        });
    };
    DbProvider.prototype.selectallnew_fu_action = function () {
        var _this = this;
        var propclassall = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT * FROM PDANEW_NEW_FU_ACTION  ";
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        propclassall.push(res.rows.item(i));
                    }
                    resolve(propclassall);
                });
            });
        });
    };
    DbProvider.prototype.deleteallnew_fu_action = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "DELETE FROM PDANEW_NEW_FU_ACTION ";
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    resolve(res);
                });
            });
        });
    };
    DbProvider.prototype.insertIntoContact_Update = function (lac_no, name, relation, address1, address2, mobile1, mobile2, email_id, off_tel_no, res_tel_no, fax, ldap_id) {
        var _this = this;
        var PDANEW_NEW_COMMN_DETAILS = [];
        console.log(lac_no, name, relation, address1, address2, mobile1, mobile2, email_id, off_tel_no, res_tel_no, fax, ldap_id);
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sInsertAppTableMasterScript = "INSERT INTO PDANEW_NEW_COMM_OTH_DETAILS(lac_no,name,relation,address1,address2,mobile1,mobile2,email_id,off_tel_no,res_tel_no,fax,ldap_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
                db.executeSql(sInsertAppTableMasterScript, [lac_no, name, relation, address1, address2, mobile1, mobile2, email_id, off_tel_no, res_tel_no, fax, ldap_id]).then(function () {
                    var SelectSql = "SELECT * FROM PDANEW_NEW_COMM_OTH_DETAILS where lac_no=" + lac_no;
                    db.executeSql(SelectSql, []).then(function (res) {
                        console.log(res);
                        for (var i = 0; i < res.rows.length; i++) {
                            PDANEW_NEW_COMMN_DETAILS.push(res.rows.item(i));
                        }
                        resolve(PDANEW_NEW_COMMN_DETAILS);
                        console.log(PDANEW_NEW_COMMN_DETAILS);
                    });
                });
            })
                .catch(function (e) { reject(e); console.log(e); });
        });
    };
    DbProvider.prototype.Delete_Contact_Update = function (lacno) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "DELETE FROM PDANEW_NEW_COMM_OTH_DETAILS  where lac_no=" + lacno;
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                });
            });
        });
    };
    DbProvider.prototype.SelectContact_Update = function (lacno) {
        var _this = this;
        var Contact_Update = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT * FROM  PDANEW_NEW_COMM_OTH_DETAILS where lac_no=" + lacno;
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        Contact_Update.push(res.rows.item(i));
                    }
                    resolve(Contact_Update);
                });
            });
        });
    };
    DbProvider.prototype.selectallContact_Update = function () {
        var _this = this;
        var propclassall = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT * FROM PDANEW_NEW_COMM_OTH_DETAILS ";
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        propclassall.push(res.rows.item(i));
                    }
                    resolve(propclassall);
                });
            });
        });
    };
    DbProvider.prototype.deleteallContact_Update = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "DELETE FROM PDANEW_NEW_COMM_OTH_DETAILS ";
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    resolve(res);
                });
            });
        });
    };
    DbProvider.prototype.GlobalUpload = function () {
        var _this = this;
        var totalrows = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var UpdateSql = "SELECT (Select COUNT(*) AS MyCount FROM PDANEW_PROP_CLASS) + (SELECT COUNT(*) AS MyCount FROM PDANEW_NEW_FU_ACTION) + (SELECT COUNT(*) AS MyCount FROM PDANEW_NEW_COMM_OTH_DETAILS) as total_rows";
                db.executeSql(UpdateSql, []).then(function (res) {
                    console.log(res);
                    for (var i = 0; i < res.rows.length; i++) {
                        totalrows.push({ totalcount: res.rows.item(i).total_rows });
                    }
                    resolve(totalrows);
                });
            });
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
        });
    };
    DbProvider.prototype.updatefollowupflag = function (gflag, lacno) {
        var _this = this;
        console.log(lacno, gflag);
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sUpdateAppMasterScript = "UPDATE PDANEW_LAC_MASTER SET followupflag =? WHERE lac_no=?";
                db.executeSql(sUpdateAppMasterScript, [gflag, lacno])
                    .then(function (res) {
                    console.log(res);
                    resolve(res);
                });
            }).catch(function (e) { return reject(e); });
        });
    };
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
    DbProvider.prototype.SelectCrossLinkDetails = function (lacno) {
        var _this = this;
        var detailscrosslinks = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT lac_no1 FROM PDANEW_UNIQUE_ID_ACCOUNTS WHERE lac_no='" + lacno + "' and lac_no1!='" + lacno + "'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            detailscrosslinks.push({
                                lac_no1: res.rows.item(i).lac_no1,
                                action_cl: "",
                                amount_cr_cl: ""
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(detailscrosslinks);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    ///////////////////////select difficulty level,my basket before syncing/////////////////
    DbProvider.prototype.SelectSyncLacMaster = function () {
        var _this = this;
        var selectsync = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT difficulty_level,my_basket FROM PDANEW_LAC_MASTER";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            selectsync.push({
                                difficulty_level: res.rows.item(i).difficulty_level,
                                my_basket: res.rows.item(i).my_basket
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(selectsync);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.SelectLevelUpd = function () {
        var _this = this;
        var levelupd = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "select lac_no,difficulty_level,level_remarks from PDANEW_LAC_MASTER where difficulty_level !=''";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            levelupd.push({
                                LEVEL1: res.rows.item(i).difficulty_level,
                                REMARK: res.rows.item(i).level_remarks,
                                LAC_NO: res.rows.item(i).lac_no,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(levelupd);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.TechDetails = function (fileno) {
        var _this = this;
        var techdtls = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT prop_name,builder_name,val_done,mode_of_apr FROM PDANEW_PROPERTY_MST where file_no=" + fileno;
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            techdtls.push({
                                prop_name: res.rows.item(i).prop_name,
                                builder_name: res.rows.item(i).builder_name,
                                val_done: res.rows.item(i).val_done,
                                mode_of_apr: res.rows.item(i).mode_of_apr
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    resolve(techdtls);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider.prototype.SelectFromViewDocs = function (lac_no) {
        var _this = this;
        var selectviewdocs = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create(_this.options)
                .then(function (db) {
                var sSelectSqlstmt1 = "SELECT srno,lac_no, doc_desc, doc_type, filename, offline_flag,downloaded_flag FROM PDANEW_VIEW_DOCS  WHERE LAC_NO='" + lac_no +
                    "'";
                db.executeSql(sSelectSqlstmt1, {})
                    .then(function (res) {
                    console.log(res);
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            selectviewdocs.push({
                                SRNO: res.rows.item(i).srno,
                                DOC_DESC: res.rows.item(i).doc_desc,
                                DOC_TYPE: res.rows.item(i).doc_type,
                                FILENAME: res.rows.item(i).filename,
                                OFFLINE_FLAG: res.rows.item(i).offline_flag,
                                DOWNLOADED_FLAG: res.rows.item(i).downloaded_flag,
                                lac_no: res.rows.item(i).lac_no,
                            });
                        }
                    }
                    console.log(res);
                })
                    .then(function (res) {
                    console.log(selectviewdocs);
                    resolve(selectviewdocs);
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        });
    };
    DbProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            Platform,
            SQLite])
    ], DbProvider);
    return DbProvider;
}());
export { DbProvider };
//# sourceMappingURL=db.js.map