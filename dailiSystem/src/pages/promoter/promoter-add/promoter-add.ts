import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,AlertController,} from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { TCommonPage }from '../../basic-page';
import { Md5 } from 'ts-md5/dist/md5';
import { MyPromoterPage } from '../../homechild/my-promoter/my-promoter';
/**
 * Generated class for the PromoteraddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-promoter-add',
  templateUrl: 'promoter-add.html',
})
export class PromoteraddPage extends TCommonPage{
  private rep_id;
  private pswd;
  private limit_num;
  private rep_nickname;
  private md5password;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public Md5:Md5,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  )
  {
    super(navCtrl, navParams);
  }
  AfterPromoterId(data){
    this.rep_id = data.data.new_pro_id;
    this.limit_num = data.data.limit_num;
  }
  ionViewDidLoad() {
    this.auth.getpromoterId().then(
      data => this.AfterPromoterId(data),
      error => console.log(error)
    )
  }
  /*添加代理*/
  addPromoter(){
    this.md5password = Md5.hashStr(this.pswd).toString();
    this.auth.postpromoter(
      this.md5password,
      this.limit_num,
      this.rep_id,
      this.rep_nickname
    ).then(
      data => this.addPromoterFinish(data),
      error => console.log(error)
    );
  }
  /*完成代理添加*/
  addPromoterFinish(data){

    if ((this.pswd == '') || (this.pswd == undefined))
    {
      this.ShowToast('密码不能为空！');
      return;
    }
    else if(this.rep_nickname == ''){
      this.ShowToast('用户昵称不能为空！');
      return
    }
    else if(data.status == 0 ){
       this.ShowToast('添加成功');
       this.navCtrl.push(MyPromoterPage);
    }
    else{
       this.ShowToast('添加失败');
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