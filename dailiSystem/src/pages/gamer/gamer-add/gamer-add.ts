import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,AlertController} from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { TCommonPage }from '../../basic-page';
import { PrecentfilterPipe } from '../../../pipes/precentfilter/precentfilter';
import { MyGamerPage } from '../..//homechild/my-gamer/my-gamer';
/**
 * Generated class for the GamerAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-gamer-add',
  templateUrl: 'gamer-add.html',
})
export class GamerAddPage extends TCommonPage{
	public new_gamer_id;
	public limit_num;
	public pswd;
  public limit_rate;
	public tax_rate = 0;
  public proId;
  public step;
  public nickname;
  public exchange_rate;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public auth: AuthProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) 
  {
  	 super(navCtrl, navParams);
  }
 
  ionViewDidLoad() {
       this.auth.getgamerId().then(
      data => this.AfterGamerId(data),
      error => console.log(error)
    )
  }
  AfterGamerId(data){
    this.new_gamer_id =1000;
    this.new_gamer_id = data.data.new_gamer_id;
    this.limit_num = data.data.limit_num;
  }
  /*添加玩家*/
  addGamer(){
    this.exchange_rate = this.tax_rate/100;
    this.auth.postgamer(
      this.pswd,
      this.limit_num,
      this.new_gamer_id,
      this.exchange_rate,
      this.nickname
    ).then(
      data => this.addGamerFinish(data),
      error => console.log(error)
    );
  }
  /*完成玩家添加*/
  addGamerFinish(data){

    if ((this.pswd == '') || (this.pswd == undefined))
    {
      this.ShowToast('密码不能为空！');
      return;
    }
    if (this.tax_rate == 0)
    {
      this.ShowToast('抽水比不能为空！');
      return;
    }
    if(this.nickname == '')
    {
      this.ShowToast('昵称不能为空！');
      return;
    }
    if ((this.limit_num == '') || (this.limit_num == undefined))
    {
      this.ShowToast('额度不能为空！');
      return;
    }
    if(data['status'] == 0){
       this.ShowToast('添加成功');
     this.navCtrl.push(MyGamerPage);
    }
    else{
      this.ShowToast("添加失败");
    }
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
