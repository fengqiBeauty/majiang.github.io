import { Component } from '@angular/core';
import { AuthProvider } from '../../../providers/auth';
import { NavController, NavParams,AlertController, ToastController, } from 'ionic-angular';
import { TCommonPage } from '../../basic-page';

@Component({
  selector: 'page-gamerchild',
  templateUrl: 'gamer-child.html',
})
export class GamerchildPage extends TCommonPage{
  public gamer;
  public obj;
  public gamer_id;
  public credit;
  public limit_num;
  public tax_rate;
  constructor(
    public navCtrl: NavController,          
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
      super(navCtrl, navParams);
  }

  ionViewDidLoad() {
    this.gamer =localStorage.getItem('item');
    this.obj = eval('(' + this.gamer + ')');
    this.gamer_id = this.obj.gamer_id;
    this.credit = this.obj.credit;
    this.limit_num = this.obj.limit_num;
    this.tax_rate = this.obj.tax_rate;
  }
  updatemypassword(){
    this.auth.postresetPswd(
      this.gamer_id
    ).then(
      data  => this.AfterReset(data),
      error => console.log(error)
    );
  }
  AfterReset(data){
    if(data.status == 0){
      this.ShowToast('重置密码成功');
    }
   else{
     this.ShowToast('重置密码失败'); 
   }
  }
  doPromptpwd() {
    let prompt = this.alertCtrl.create({
      title: '重置密码',
      subTitle:'您确定要重置该玩家的密码？',
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: data => {
             this.auth.postresetPswd(
                this.gamer_id
              ).then(
                data  => this.AfterReset(data),
                error => console.log(error)
              );
          }
        }
      ],
      cssClass:'f-moal'
    });
    prompt.present();
  }
  doPrompt() {
    let prompt = this.alertCtrl.create({
      title: '额度',
      inputs: [
        {
          name: 'title',
          value: this.limit_num,
          placeholder: '请输入额度'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: data => {
            this.limit_num = data.title;
          }
        }
      ],
      cssClass:'f-moal'
    });
    prompt.present();
  }
}
