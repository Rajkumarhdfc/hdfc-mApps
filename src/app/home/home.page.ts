import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private navCtrl: NavController) {
  }

  listPage() {
    this.navCtrl.navigateForward('list');
  }

  DashboardPage() {
    this.navCtrl.navigateForward('dashboard');
  }

  IssuesPage() {
    this.navCtrl.navigateForward('issue');
  }

}
