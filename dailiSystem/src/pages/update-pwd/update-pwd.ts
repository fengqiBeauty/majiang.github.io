import { Component } from '@angular/core';
import { NavController, NavParams , ToastController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { TCommonPage }from '../basic-page';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the UpdatePwdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-pwd',
  templateUrl: 'update-pwd.html',
})
export class UpdatePwdPage extends TCommonPage{

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider, public toastCtrl:ToastController, public Md5:Md5) {
  	super(navCtrl, navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePwdPage');
  }
  UpdatePwd(){
  	let openPswd = localStorage.getItem('openPswd');
  	if(this.old_pswd == "" || this.old_pswd == undefined)
    {
      this.ShowToast('������ԭʼ���룡');
      return;
    }
    if(this.new_pswd == "" || this.new_pswd == undefined)
    {
      this.ShowToast('�����������룡');
      return;
    }
    if(this.new_pswd == this.old_pswd )
    {
      this.ShowToast('��ԭʼ������ͬ�����������룡');
      return;
    }
    if(this.old_pswd != openPswd )
    {
      this.ShowToast('ԭʼ����������������룡');
      return;
    }
    
    this.md5old_pswd = Md5.hashStr(this.old_pswd).toString();
    this.md5new_pswd = Md5.hashStr(this.new_pswd).toString();
  	this.auth.postupdatePswd(
      this.md5old_pswd,
      this.md5new_pswd
    ).then(
      data => this.AfterupdatePswd(data),
      error => console.log(error)
    );
    console.log(this.md5old_pswd);
		
  }
  AfterupdatePswd(data){
  	if(data.result == 0){
  		this.ShowToast('�����޸ĳɹ���');
  	}else if(data.result == 1){
  		this.ShowToast('�����޸�ʧ�ܣ�');
  	}
  }
  public md5old_pswd;
  public md5new_pswd;
  public old_pswd;
  public new_pswd;
}
