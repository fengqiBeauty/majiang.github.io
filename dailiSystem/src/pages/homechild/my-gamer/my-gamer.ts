import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController,PopoverController,ToastController,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { GamerchildPage } from '../../gamer/gamer-child/gamer-child';
import { GamerAddPage } from '../../gamer/gamer-add/gamer-add';
import { GamerBindPage } from '../../gamer/gamer-bind/gamer-bind';
import { FilterPipe } from '../../../pipes/filter/filter';
import { ItemSliding } from 'ionic-angular';
import { TCommonPage }from '../../basic-page';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-my-gamer',
  templateUrl: 'my-gamer.html',
})
export class MyGamerPage extends TCommonPage{
  public gamerList;
  public length;
  public gList;
  public gaming;
  public new_gamer_id;
  public freezetext;
  public show;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public actionsheetCtrl: ActionSheetController) {
       super(navCtrl, navParams);
  }
  ngOnInit():void{
    this.Loading();
    this.show = false;
    this.auth.getmygamer().then(
      data => this.AfterGamer(data),
      error => console.log(error)
    )
  }
  
  freeafter(slidingItem: ItemSliding){
    //进行冻结
    if(slidingItem['forbidden'] == 0){
      let prompt = this.alertCtrl.create({
      title: '冻结',
      subTitle: '您确定要冻结该用户吗？',
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
            this.auth.freezegamer(slidingItem['gamer_id']).then(
              data => this.Afterfree(data),
              error => console.log(error)
            )
          }
        }
      ],
      cssClass:'f-moal'
    });
    prompt.present();
    }
    //进行解冻
    else if(slidingItem['forbidden'] == 1){
      let prompt = this.alertCtrl.create({
      title: '解冻',
      subTitle: '您确定要解冻该用户吗？',
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
            this.auth.unfreezegamer(slidingItem['gamer_id']).then(
              data => this.Afterunfree(data),
              error => console.log(error)
          )
          }
        }
      ],
      cssClass:'f-moal'
    });
    prompt.present();
    }
    else{
     this.ShowToast("系统出错");
    }
    console.log(slidingItem);
  }
  Afterfree(data){
    console.log(data);
    if(data.result == 0){
      this.ShowToast("冻结成功");
    }
    else{
      this.ShowToast("冻结失败");
    }
  }
  Afterunfree(data){
    if(data.result == 0){
      this.ShowToast("解冻成功");
    }
    else{
      this.ShowToast("解冻失败");
    }
  }
  AfterGamer(data){
    console.log(data);
    this.gamerList = (data.result);
    this.length = this.gamerList.length;
    this.gList = this.gamerList;
    // this.freezetext ="冻结~";
    // console.log(data);
    if(data.forbidden == 0){
       this.freezetext ="解冻";
    }
    if(data.forbidden == 1){
       this.freezetext ="冻结";
    }
    // if(3>2){
    //   this.freezetext ="解冻~";
    // }
  }
  lookUpGamer(item){
    this.navCtrl.push(GamerchildPage);
    item = JSON.stringify(item);
    localStorage.setItem('item',item);
  }
  ionViewDidLoad() {
    // this.gaming = "n64";
    //console.log('ionViewDidLoad MyGamerPage');
  }
  initializeItems(){
    this.auth.getmygamer().then(
      data => this.AfterGamer(data)
    )
  }
  /*得到我的玩家的列表*/
  getItems(ev){
    var val = ev.target.value;
    if(val && val.trim() != ''){
      //console.log('val'+val);
      this.gamerList = this.gList.filter((item) => {
        //console.log(item);
        return (item.nickname.indexOf(val) > -1 || item.gamer_id.toString().indexOf(val) > -1);
      });
      this.length = this.gamerList.length;
    }else{
      this.initializeItems()
    }
  }
   presentPopover(myEvent) {
     alert(12456);
     alert(myEvent);
    // let popover = this.popoverCtrl.create(PopoverPage);
    // popover.present({
    //   ev: myEvent
    // });
  }
  /*添加玩家*/
  addgamer(){
    var addAngle = document.getElementById("add-angle");
    var addMenu = document.getElementById("add-menu");
    var gide = document.getElementById("gide");
    addAngle.style.display = "none";
    addMenu.style.display = "none";
    gide.style.display = "none";
    this.navCtrl.push(GamerAddPage);
    this.auth.getgamerId().then(
      data => this.AfterGamerId(data),
      error => console.log(error)
    )
  }
  AfterGamerId(data){
   this.new_gamer_id = data.data.new_gamer_id;
   localStorage.setItem('new_gamer_id',this.new_gamer_id);
  }
  /*绑定玩家*/
  bindgamer(){
    var addAngle = document.getElementById("add-angle");
    var addMenu = document.getElementById("add-menu");
    var gide = document.getElementById("gide");
    addAngle.style.display = "none";
    addMenu.style.display = "none";
    gide.style.display = "none";
    this.navCtrl.push(GamerBindPage);
  }
  showMenu(){
    //alert(1);
    var addAngle = document.getElementById("add-angle");
    var addMenu = document.getElementById("add-menu");
    var gide = document.getElementById("gide");
     if(this.show){
      addAngle.style.display = "none";
      addMenu.style.display = "none";
      gide.style.display = "none";
      this.show = !this.show
    }else{
      addAngle.style.display = "block";
      addMenu.style.display = "block";
      gide.style.display = "block";
      this.show = !this.show
    };
    console.log(this.show);
  }
  hideMenu(){
    var addAngle = document.getElementById("add-angle");
    var addMenu = document.getElementById("add-menu");
    var gide = document.getElementById("gide");
    addAngle.style.display = "none";
    addMenu.style.display = "none";
    gide.style.display = "none";
    this.show = !this.show;
  }
}
