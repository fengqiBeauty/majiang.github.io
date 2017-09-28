import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { PromoterchildPage } from '../../promoter/promoterchild/promoterchild';
import { PromoteraddPage } from '../../promoter/promoter-add/promoter-add';
import { LoadingController } from 'ionic-angular';
import { TCommonPage }from '../../basic-page';

@Component({
  selector: 'page-my-promoter',
  templateUrl: 'my-promoter.html',
})
export class MyPromoterPage extends TCommonPage{
  private promoterList;
  private length;
  public  pList;
  public proId;
  public limitnum;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider) {
    super(navCtrl, navParams);
  }
  ngOnInit():void{
    this.Loading();
    this.auth.getmypromoter().then(
      data => this.AfterPromoter(data),
      error => console.log(error)
    )
  }
  /*查看代理详细信息*/
  lookUpPromoter(item){
    this.navCtrl.push(PromoterchildPage);
    console.log(item);
    item = JSON.stringify(item);
    localStorage.setItem('item',item);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPromoterPage');
  }
  AfterPromoter(data){
    this.promoterList = (data.result);
    this.length = this.promoterList.length;
    this.pList = this.promoterList;
  }
  initializeItems(){
    this.auth.getmypromoter().then(
      data => this.AfterPromoter(data)
    )
  }
  /*搜索我的代理功能*/
  getItems(ev){
    var val = ev.target.value;
    if(val && val.trim() != ''){
      //console.log('val'+val);
      this.promoterList = this.pList.filter((item) => {
        //console.log(item);
        return (item.nickname.indexOf(val) > -1 || item['rep_id'].toString().indexOf(val) > -1);
      });
      this.length = this.promoterList.length;
    }else{
      this.initializeItems()
    }
  }
  /*添加代理*/
  addPromoter(){
    this.navCtrl.push(PromoteraddPage); 
  }
}
