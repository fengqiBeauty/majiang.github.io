import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth';
import { TCommonPage }from '../basic-page';
import { HomePage }from '../home/home';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends TCommonPage{
 
  constructor(
    public navCtrl: NavController, 
    public auth:AuthProvider,
    public loadingCtrl:LoadingController,
    public toastCtrl: ToastController,
    public Md5:Md5,
    public navParams: NavParams)
  {   
    super(navCtrl, navParams, loadingCtrl, toastCtrl);
  } 
   ngOnInit(): void
  {
    //判断是否登录过openId是用户名
    if(this.auth.openId != null){
       this.navCtrl.push(HomePage);
     }
       this.btndisable = true;
  }
  btnAddColor(){
    console.log(this.username+","+this.password)
      if(this.username != "" && this.password !=""){
         this.btndisable = false;   
      }  
      else{
         this.btndisable = true;
      }       
  }
  
  login()
  {
    if(this.username == "" && this.username == undefined)
    {
      this.ShowToast('请输入账号和密码');
      return;
    }
    if(this.username == "" || this.username == undefined)
    {
      this.ShowToast('用户名不能为空');
      return;
    }
    if(this.password == "" || this.password == undefined)
    {
      this.ShowToast('密码不能为空');
      return;
    }
   
    //判断账号和密码只能为数字，不提交到服务器
    if(!this.username.match('^[0-9]*$')||!this.password.match('^[0-9]*$')||this.username.length>=6)
    {
      this.ShowToast('账号或密码错误~');
      return;
    }
      this.Loading("正在登录中~",1000);   
      this.md5password = Md5.hashStr(this.password).toString();
      this.auth.login(this.username,this.md5password).then(
      data => this.AfterLogin(data),
      error => console.log(error)
    )
  }

  AfterLogin(data){
    if(data.status == 0){
      localStorage.setItem('openId', this.username);
      this.ShowToast('登录成功');
      this.navCtrl.push(HomePage);          
    }
    else if(data.status == 1){
      this.ShowToast('账号或密码错误');
    }
     else if(data.status == 2){
      this.ShowToast('您的用户名不存在');
    }
    else if(data.status == 3){
      this.ShowToast('跳转到修改密码部分');
    }
    else if(data.status == '冻结')
    {
      this.ShowToast("您的账户已经冻结，请联系代理");
    }
    else{
      this.ShowToast('账号或密码错误');
    }
  }
  public username = '';
  public password = '';
  public md5password:string;
  public btndisable:boolean;
}
