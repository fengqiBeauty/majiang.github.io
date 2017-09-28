import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
/**
 * Generated class for the HisProfitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-his-profit',
  templateUrl: 'his-profit.html',
})
export class HisProfitPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    this.member_id = localStorage.getItem('member_id');
    this.member_name = localStorage.getItem('member_name');
    this.auth.posthisProfit(
    	this.member_id
    ).then(
      data => this.getHis(data),
      error => console.log(error)
    )
  }
  getHis(data){
  	this.hisArr = data.result;
  	console.log(this.hisArr);
  	/*hisArr.forEach(function(item){
  		console.log(item);
  	})*/
  }
  public member_id;
  public member_name;
  public hisArr;
}
