import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inner-details',
  templateUrl: './inner-details.page.html',
  styleUrls: ['./inner-details.page.scss'],
})
export class InnerDetailsPage implements OnInit {

  constructor( private navCtrl: NavController ) { }

  homePage() {
    this.navCtrl.navigateForward('home');
  }

  ngOnInit() {
  }

}
