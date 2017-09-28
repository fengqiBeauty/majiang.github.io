import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the MesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-mes',
  templateUrl: 'mes.html',
})
export class MesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesPage');
  }
  /*点击每一行消息弹出消息详情*/
  doAlert(item){
    console.log(item);
    let alert = this.alertCtrl.create({
      title: '我的消息',
      message: 'Your friend, Obi wan Kenobi, just approved your friend request!',
      buttons: ['关闭']
    });
    alert.present()
  }

}
