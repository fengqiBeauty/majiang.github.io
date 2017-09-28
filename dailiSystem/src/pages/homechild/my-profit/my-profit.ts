import { Component,ViewChild,ElementRef,ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth';
import { GamerchildPage } from '../../gamer/gamer-child/gamer-child';
import { PromoterchildPage } from '../../promoter/promoterchild/promoterchild';
import { HisProfitPage } from '../../his-profit/his-profit';
import { TCommonPage }from '../../basic-page';
declare var echarts;
@Component({
  selector: 'page-my-profit',
  templateUrl: 'my-profit.html',
})
export class MyProfitPage extends TCommonPage {
  @ViewChild('container') container: ElementRef;
  chart :any;  
  chartcircle : any;
  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public toastCtrl: ToastController,
    public cd: ChangeDetectorRef) {
 super(navCtrl, navParams, loadingCtrl, toastCtrl); 
}   
  hidetable(){
   if(this.myprofit_table =="sub_detail"){
     var container =document.getElementById('container');
      container.style.display="none";
      return
    }
  }
  showtable(){
      var container =document.getElementById('container');
      container.style.display="block";
      return
  }
  AfterGetData(data,number){
      console.log("调用了一次")
      if(number == "0"){
           this.subList = data["detail_of_rep"];       
      }
      else if(number == "1"){
          this.subList = data["detail_of_gamer"];        
      }
      else{
         this.subList = data["detail"];   
      }
      this.ydata = [];
      var xAxis = ['周一','周二','周三','周四','周五','周六','周日'];
      for(var i = 0, len = xAxis.length; i < len; i++){
          this.ydata.push(data.day[xAxis[i]]);
      }     
      this.mydata = data;
      this.from_gamer = data.from_gamer;
      this.from_rep = data.from_rep;
      console.log(data);
      if(this.from_rep =="None"){
          this.from_rep ="无代理"
      }
      if(this.from_gamer =="None"){
          this.from_gamer ="无玩家"
      }
      this.margin = data.margin;
      this.credit = data.credit;

      console.log("ydata"+this.ydata)
            //第一个周报的柱状图
            let ctx = this.container.nativeElement;
            this.chart = echarts.init(ctx);
            this.chart.setOption({
            color:[' rgb(234,86,72)'],
            tooltip: {
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'     
                }
            },
        grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : xAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'我的收益',
                    type:'bar',
                    barWidth: '60%',
                    data:this.ydata
                }
            ]
        })
    
  }
   lookUpGamer(item){
    //判断是玩家还是代理
    if(this.role == 'gamer'){      
        this.navCtrl.push(GamerchildPage);
        item = JSON.stringify(item);
        localStorage.setItem('item',item);
    }
   else if(this.role == 'promoter'){    
        this.navCtrl.push(PromoterchildPage);
        console.log(item);
        item = JSON.stringify(item);
        localStorage.setItem('item',item);
   }
   else{
      
   }
  }
  showRole(){
    var addAngle = document.getElementById("add-angle");
    var addMenu = document.getElementById("add-menu");
    if(this.show){
      addAngle.style.display = "none";
      addMenu.style.display = "none";
      this.show = !this.show
    }else{
      addAngle.style.display = "block";
      addMenu.style.display = "block";
      this.show = !this.show
    };
    
  }
  showPromoter(role){
      //获得周报的接口显示代理
    this.auth.getprofitdata().then(
      data => this.AfterGetData(data,"0"),
      error => console.log(error)
    )
    var addAngle = document.getElementById("add-angle");
    var addMenu = document.getElementById("add-menu");
    var promoterSpan = document.getElementById("promoterSpan");
    var gamerSpan = document.getElementById("gamerSpan");
    addAngle.style.display = "none";
    addMenu.style.display = "none";
    promoterSpan.style.color = "red";
    gamerSpan.style.color = "#666666";
    this.show = !this.show
    this.role = role;
    this.myprofit_table ="sub_detail";
    this.titletext = "代理";
  }
  showGamer(role){
      //获得周报的接口显示玩家
    this.auth.getprofitdata().then(
      data => this.AfterGetData(data,"1"),
      error => console.log(error)
    )
    var addAngle = document.getElementById("add-angle");
    var addMenu = document.getElementById("add-menu");
    var promoterSpan = document.getElementById("promoterSpan");
    var gamerSpan = document.getElementById("gamerSpan");
    addAngle.style.display = "none";
    addMenu.style.display = "none";
    promoterSpan.style.color = "#666666";
    gamerSpan.style.color = "red";
    this.show = !this.show;
    this.role = role;
    console.log(this.role);
    this.myprofit_table ="sub_detail";
    this.titletext = "玩家";
  }
  ionViewDidLoad() {
    this.show = false;
    this.myprofit_table ="week_table";
    //获得周报的接口
    this.auth.getprofitdata().then(
      data => {
          this.AfterGetData(data,"2");
          
    },
      error => console.log(error)
    )
}
/*查看历史周报*/
  showhisProfit(item){
    let member_id = item.rep_id;
    let gamer_id = item.gamer_id;
    let nickname = item.nickname;
    if(item.role == 0){
       localStorage.setItem('member_id',member_id);
     }else if(item.role == 1){
       localStorage.setItem('member_id',gamer_id);
     }
    localStorage.setItem('member_name',nickname);
    this.navCtrl.push(HisProfitPage);
  }
private myprofit_table;
private margin;
private from_rep;
private from_gamer;
private credit;
public show;
private role;
private subList;
private mydata;
private ydata = [];
private titletext ="本周";
public wdwcolor;
}