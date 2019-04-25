import { Component,ViewChild,ViewContainerRef } from '@angular/core';
import { Platform,Nav,ViewController,App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen} from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { DbProvider } from '../providers/db/db';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AddetailsPage } from '../pages/addetails/addetails';
import { RemarkPage } from '../pages/remark/remark';
import { TransPage } from '../pages/trans/trans';
import { CommnPage } from '../pages/commn/commn';
import { FupPage } from '../pages/fup/fup';
import { AcDetailsPage } from '../pages/ac-details/ac-details';
import { RestProvider } from '../providers/rest/rest';
import { AlertsPage} from '../pages/alerts/alerts';
import { DocPage } from '../pages/doc/doc';
//import { CapturePhotoPage } from '../pages/capture-photo/capture-photo';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: string = 'AppLaunchPage';
    pages: Array < {
        title: string,
        icon: string,
        component: any,
		    comp_name:any

    } > ;

    footerpages: Array < {
        title: string,
        icon: string,
        component: any,
		    comp_name:any
    } > ;

    current_page_name=""
    name: any;
    lac: any;
    footerstatus: any;
    borrname: any;
    menustatus: any;
    headerstatus:any;
	  navheaderstat:any;
   _timer:any;
    sub2$:any;
    sub1$:any;
    pages1:any;
    ldap_id:any;

   constructor(
     public  platform: Platform,
     statusBar: StatusBar, 
     splashScreen: SplashScreen, 
     public events: Events,
     public appCtrl: App,
     private viewContainer: ViewContainerRef,
     public dbProvider:DbProvider,
     public iab:InAppBrowser,
     public restprvider:RestProvider
) {
        this.menustatus = true;
        this.footerstatus = false;
		this.headerstatus=false;
        this.navheaderstat=false;
        
        events.subscribe('hideHeader', (data) => {
            this.footerstatus = data.footerstatus;
            this.lac = data.lac;
            this.borrname = data.borrname;
            console.log(this.lac);
        })
        events.subscribe('hidemenu', (data) => {
            this.menustatus = data.menustatus;
            console.log(this.menustatus);
        })
        events.subscribe('hideheader', (data) => {
            this.headerstatus = data.headerstatus;
            this.navheaderstat =data.navheaderstat;
            console.log(this.headerstatus);
        })
        events.subscribe('map_page', (data) => {
            this.lac = data.lac;
            this.borrname = data.borrname;
            this.current_page_name = data.current_page_name;
          
        })
        events.subscribe('goback', (data) => {
            const browser = this.iab.create('http://localhost/#/list-master', '_self', {
                clearcache: 'yes',
                clearsessioncache: 'yes'
            });
        })

        platform.registerBackButtonAction(() => {
            if(this.nav.canGoBack() && this.nav.length() >=3){

                if(this.current_page_name=="map_page"){
                    this.nav.push(CommnPage, {
                        name: "CommnPage",
                        item: this.lac,
                        item2: this.borrname
                    }).then(() => {
                        this.current_page_name="";
                        const index = this.nav.getActive().index;
                        this.nav.remove(index - 1)///removes previous page from stack
    
                    });
                }else{
                    this.nav.pop();
                }
               
            }else{
                
                const browser = this.iab.create('http://localhost/#/list-master', '_self', {
                    clearcache: 'yes',
                    clearsessioncache: 'yes'
                });
            
            }
          });

this.pages = [{
                title: 'Home',
                icon: 'home',
                component: 'MenuPage',
                comp_name:'MenuPage'

            },
            {
                title: 'Dashboard',
                icon: 'list-box',
                component: 'LacDetailsPage',
                comp_name:'LacDetailsPage'
            },
            {
                title: 'Reminders',
                icon: 'alarm',
                component: 'RemindersPage',
                 comp_name:'RemindersPage'
            }
        ];
////footer navigation///////////////
        this.footerpages = [{
                title: 'Commn',
                icon: 'call',
                component: CommnPage,
                comp_name:'CommnPage'

            },
            {
                title: 'Fup',
                icon: 'reorder',
                component: FupPage,
                  comp_name:'FupPage'
            },
        
            {
                title: 'Alerts',
                icon: 'alert',
                component: "AlertsPage",
                 comp_name:'AlertsPage'
            },
            
            {
                title: 'Take Photo',
                icon: 'camera',
                component: "CapturePhotoPage",
                 comp_name:'CapturePhotoPage'
            }


        ];

        /////////////header////////////


 this.pages1 = [

             {
                title: 'A/C',
                component: AcDetailsPage,
                   comp_name:'AcDetailsPage'
            },
        
            {
                title: 'PROP',
                component: "PropertyDetailsPage",
                 comp_name:'PropertyDetailsPage'
            },
        
            {
                title: 'Disb',
                component: "DisbursementPage",
                 comp_name:'DisbursementPage'
            },
            
            {
                title: 'UID',
                component: "UniqueIdPage",
                comp_name:'UniqueIdPage'
            },
            {
                title: 'Remark',
                component: RemarkPage,
                comp_name:'RemarkPage'
            },


             {
                title: 'Trans',
                component: TransPage,
                comp_name:'TransPage'
            },

            {
                title: 'S Docs',
                component: "ViewDocPage",
                 comp_name:'ViewDocPage'
            },
            {
                title: 'L Docs',
                component: "DocPage",
                 comp_name:'DocPage'
            },
             {
                title: 'Ad',
                component: AddetailsPage,
                 comp_name:'AddetailsPage'
            },


        ];



        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

              this.sub1$ = this.platform.pause.subscribe(() => {
              console.log('****UserdashboardPage PAUSED****');
              this._timer = setTimeout(function(){ 
             const browser = this.iab.create('http://localhost/#/list-master', '_self', {
                clearcache: 'yes',
                clearsessioncache: 'yes'
            });
        
        });
          }, 30000);


          });
          this.sub2$ = this.platform.resume.subscribe(() => {
          });
    
    }


    openPage(page) { // --- for menu
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component, {
            name: page.title
        });
     
    }
   

    openPagecomm(){

        this.nav.push(CommnPage, {
            item: this.lac,
            item2: this.borrname
        })
    }


    openPageFup(){

         this.nav.push(FupPage, {
            item: this.lac,
            item2: this.borrname
        })
    }

    openPagealerts(){

        this.nav.push(AlertsPage, {

            item: this.lac,
            item2: this.borrname
        })
    }

    openPagephotocapture(){

        this.nav.push('CapturePhotoPage', {

            item: this.lac,
            item2: this.borrname
        })
    }


    openFooterPage(p,event) {  // ---- for footer
        ////if it not lacdetailspage then push the page and remove the back history on back button click
       // event.target.classList.remove('footer_btn'); // To Remove
        event.target.classList.add('footer_btna'); // To ADD
        if (this.nav.getPrevious().name != "LacDetailsPage")
        {
             this.nav.push(p.component, {
                  name: p.title,
                  item: this.lac,
                  item2: this.borrname
              }).then(() => {
                  const index = this.nav.getActive().index;
                    this.nav.remove(index - 1)///removes previous page from stack
                  });

        }  
        else 
        {
          this.nav.push(p.component, {
            name: p.title,
            item: this.lac,
            item2: this.borrname
        })
       }
        console.log(this.lac + " " + this.borrname);
        }
			
			openPage1(p) 
      { // --- for menu
           this.nav.push(p.component, {
                            name: p.title,
                            item: this.lac,
                            item2: this.borrname
                        })
                       .then(() => {
                            const index = this.nav.getActive().index;
                            this.nav.remove(index - 1)///removes previous page from stack
                        });
      }
      	            
    goBack(){
           this.nav.pop();
      	    }

//  gobackhome()
// {

// }	
			
 myConst = {
  blackboardApp: {
    ios: {
      storeUrl: 'itms-apps://itunes.apple.com/nl/app/blackboard-mobile-learn/id376413870?mt=8',
      appId: 'bblearn://'
    },

    
    android: {
     // storeUrl: 'market://details?id=com.google.android.calculator',
      storeUrl:'market://details?id=com.android2.calculator3' ,
      appId: 'com.android2.calculator3'
    }
  }
}



openBB() {
    if (this.platform.is('android')) {
      let appId =this.myConst.blackboardApp.android.appId;
      var appStarter = (window as any).startApp.set
      ({
      "application": appId,
      "intentstart": "startActivity",
      "package":appId
      });

      appStarter.start(function (msg) {
         console.log('starting BB app: ' + msg);
      }, function (err) {
        console.log('BB app not installed', err);
       console.log(JSON.stringify(err));
       alert("This App is not installed,go to playstore to download Xlythe calculator");
      window.open(this.myConst.blackboardApp.android.storeUrl, '_system');
      });
    } else if (this.platform.is('ios')) {
      let appId = this.myConst.blackboardApp.ios.appId;
      let appStarter = (window as any).startApp.set(appId);
      appStarter.start(function (msg) {
        console.log('starting BB app: ' + msg);

      }, function (err) {
        console.log('BB app not installed', err);
        alert(JSON.stringify(err));
      });
    } else {
      let msg_err = "Platform not supported";
      alert(msg_err);
      console.log(msg_err);
    }
  }


ngOnInit(){
this.dbProvider.sSelectApp_MasterScript().then((res)=>{
    this.ldap_id=res['rows']['item'](0)['UserID'];
    console.log(this.ldap_id);
     })
}
          

  }