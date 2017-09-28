import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MySetPage } from '../SetChild/my-set/my-set';
import { AuthProvider } from '../../providers/auth';
/**
 * Generated class for the MyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(
    public navCtrl: NavController, 
    public auth:AuthProvider,
    public navParams: NavParams){
  }

  ionViewDidLoad() 
  {
    let myProfit = document.getElementById('my-profit').innerHTML;
    let bool = myProfit.indexOf('-')==0;
    //console.log(bool);
    let myProfit2 = document.getElementById('my-profit');
    //console.log(bool);
    if(bool){
      myProfit2.style.color = 'green';
    }else{
      myProfit2.style.color = 'red';
    }
    //console.log('ionViewDidLoad MyPage');
  }
 setting(){
    this.navCtrl.push(MySetPage);
  }
   ngOnInit(): void
  {
    this.auth.getperInfo().then(
      data => this.AfterPerInfo(data),
      error =>console.log(error)
    )
  }
  AfterPerInfo(data)
  {
    console.log(data);
    this.personid = data.rep_id;
    this.limitnum = data.limit_num;
    this.credit = data.rep_id;
  }
  private personid:string;
  private limitnum:string;
  private credit:string;
}
