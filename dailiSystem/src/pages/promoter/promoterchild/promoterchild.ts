import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController, ToastController} from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { TCommonPage } from '../../basic-page';
/**
 * Generated class for the PromoterchildPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-promoterchild',
  templateUrl: 'promoterchild.html',
})
export class PromoterchildPage extends TCommonPage{
  public promoter;
  public obj;
  public nickname;
  public credit;
  public limit_num;
  public rep_id;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController)
 {
    super(navCtrl, navParams);
  }
  ngOnInit(){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoterchildPage');
    this.promoter =localStorage.getItem('item');
    this.obj = eval('(' + this.promoter + ')');
    //console.log(typeof (this.obj)+"obj"+this.obj.nickname);
    this.nickname = this.obj.nickname;
    this.credit = this.obj.credit;
    this.limit_num = this.obj.limit_num;
    this.rep_id = this.obj.rep_id;
  }
  
  AfterReset(data){
    if(data.status == 0){
      this.ShowToast('重置密码成功');
    }
   else{
     this.ShowToast('重置密码失败'); 
   }
  }
   doPrompt() {
    let prompt = this.alertCtrl.create({
      title: '重置密码',
      subTitle:'您确定要重置该代理的密码？',
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
                this.rep_id
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
}
