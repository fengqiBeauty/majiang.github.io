import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,AlertController} from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { TCommonPage }from '../../basic-page';
import { PrecentfilterPipe } from '../../../pipes/precentfilter/precentfilter';
/**
 * Generated class for the GamerBindPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-gamer-bind',
  templateUrl: 'gamer-bind.html',
})
export class GamerBindPage extends TCommonPage{
	public new_gamer_id;
	public limit_num;
	public tax_rate = 0;
  public changetax_rate ;

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
    this.limit_num = 2000;
    console.log('ionViewDidLoad GamerBindPage');
  }
  /*��������*/
  bindGamer(){
    this.changetax_rate = this.tax_rate/100;
    this.auth.postbindgamer(
    	'',
      this.limit_num,
      this.new_gamer_id,
      this.changetax_rate
    ).then(
      data => this.bindGamerFinish(data),
      error => console.log(error)
    );
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
  /*������������*/
  bindGamerFinish(data){

    if ((this.new_gamer_id == '') || (this.new_gamer_id == undefined))
    {
      this.ShowToast('����ID����Ϊ�գ�');
      return;
    }
    if ((this.tax_rate == 0))
    {
      this.ShowToast('��ˮ�Ȳ���Ϊ�գ�');
      return;
    }
    if ((this.limit_num == '') || (this.limit_num == undefined))
    {
      this.ShowToast('���Ȳ���Ϊ�գ�');
      return;
    }
    this.ShowToast('�󶨳ɹ�');
  }
}
