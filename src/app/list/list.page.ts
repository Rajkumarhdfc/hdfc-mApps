import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public buttonClicked = false;

  public onButtonClick() {
      this.buttonClicked = !this.buttonClicked;
  }


  constructor( private navCtrl: NavController) {
  }

  innerPage() {
    this.navCtrl.navigateForward('inner-details');
  }

  IssuePage() {
    this.navCtrl.navigateForward('issue-tab/create');
  }

  ngOnInit() {
  }
}
