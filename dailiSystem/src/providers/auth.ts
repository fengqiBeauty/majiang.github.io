import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BasicServiceProvider } from './basic-service';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider extends BasicServiceProvider{

  constructor(public http: Http) {
   super(http);
  }
  login(uid : string,pwd : string)
  {
    return this.Post({},'login?uid=' + uid + '&pswd=' + pwd);    
  }
  /*获得个人信息*/
  getperInfo()
  {
    return this.Get('myinfo');
  }
  /*得到我的代理*/
  getmypromoter(){
    return this.Get('mypromoter');
  }
  /*得到我的玩家*/
  getmygamer(){
    return this.Get('mygamer');
  }
  /*获取添加玩家的Id*/
  getgamerId(){
    return this.Get('mygamer/add/1');
  }
  get openId(): string
  {
    return localStorage.getItem('openId');
  }
  /*得到添加的代理ID*/
  getpromoterId(){
    return this.Get('mypromoter/add/1');
  }
  
  /*添加代理*/
  postpromoter(pswd,limit_num,rep_id,rep_nickname){
    return this.Post({},'mypromoter/add/2?pswd='+ pswd +"&limit_num="+limit_num + "&rep_id=" + rep_id +"&nickname="+rep_nickname);
  }
   /*添加玩家*/
  postgamer(pswd,limit_num,new_gamer_id,tax_rate,nickname){
    return this.Post({},'mygamer/add/2?pswd='+ pswd +"&limit_num="+limit_num + "&gamer_id=" + new_gamer_id + '&tax_rate=' + tax_rate +"&nickname="+ nickname);
  }
  /*绑定玩家*/
  postbindgamer(pswd,limit_num,new_gamer_id,tax_rate){
    return this.Post({},'mygamer/add/2?pswd='+ pswd +"&limit_num="+limit_num + "&gamer_id=" + new_gamer_id + '&tax_rate=' + tax_rate);
  }
  set openId(value: string)
  {    
    localStorage.setItem('openId', value);
  }
  /*重置代理密码*/
  postresetPswd(rep_id){
    return this.Post({},'mypromoter/resetpassword?promoter='+ rep_id);
  }
  /*得到周报红榜的数据*/
  getprofitdata(){
     return this.Get('weekly');
  }
  /*冻结玩家*/
  freezegamer(gamer_id: string){
    return this.Post({},'mygamer/freeze?gamer_id='+ gamer_id);
  }
  /*解冻玩家*/ 
  unfreezegamer(gamer_id: string){
    return this.Post({},'mygamer/unfreeze?gamer_id='+ gamer_id);
  }
  /*修改密码*/
  postupdatePswd(old_pswd, new_pswd){
    return this.Post({},'changepswd?old_pswd='+ old_pswd + '&new_pswd=' + new_pswd);
  }
  /*查看历史周报*/
  posthisProfit(member_id){
    return this.Post({},'checkhistory?member_id='+ member_id);
  }
}
