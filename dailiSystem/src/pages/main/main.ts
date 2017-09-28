import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyProfitPage } from '../homechild/my-profit/my-profit';
import { MyGamerPage } from '../homechild/my-gamer/my-gamer';
import { MyPromoterPage } from '../homechild/my-promoter/my-promoter';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  afterpromoter(){
   this.navCtrl.push(MyPromoterPage);
  }
  aftergamer(){
   this.navCtrl.push(MyGamerPage);
  }
  afterprofit(){
   this.navCtrl.push(MyProfitPage);
  }

}
