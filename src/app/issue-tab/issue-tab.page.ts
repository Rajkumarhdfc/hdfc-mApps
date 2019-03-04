import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-issue-tab',
  templateUrl: './issue-tab.page.html',
  styleUrls: ['./issue-tab.page.scss'],
})
export class IssueTabPage implements OnInit {

  constructor( private navCtrl: NavController ) { }


  homePage() {
    this.navCtrl.navigateForward('home');
  }


  ngOnInit() {
  }


}
