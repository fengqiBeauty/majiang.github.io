import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { LoginPage }from '../../login/login';
import { MyHelpPage } from '../my-help/my-help';
import { MyAboutPage } from '../my-about/my-about';
import { UpdatePwdPage } from '../../update-pwd/update-pwd';
/**
 * Generated class for the MySetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-set',
  templateUrl: 'my-set.html',
})
export class MySetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySetPage');
  }
  SignOut(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
  helpSelected(){
    this.navCtrl.push(MyHelpPage);
  }
  aboutSelected(){
    this.navCtrl.push(MyAboutPage);
  }
  updatemypassword(){
    this.navCtrl.push(UpdatePwdPage);
  }
}
