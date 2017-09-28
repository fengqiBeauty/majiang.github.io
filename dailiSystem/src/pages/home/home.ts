import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MesPage } from '../mes/mes';
import { MyPage } from '../my/my';
import { MainPage } from '../main/main';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  mes: any;
  my: any;
  main: any;
  isAndroid: boolean = false;
  constructor(platform: Platform,
    public navCtrl: NavController,
    public auth:AuthProvider,
    ) {
      this.isAndroid = platform.is('android');
      this.mes = MesPage;
      this.my = MyPage;
      this.main = MainPage;
    }
}

