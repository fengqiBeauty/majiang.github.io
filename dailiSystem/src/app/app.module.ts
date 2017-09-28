import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MesPage } from '../pages/mes/mes';
import { MyPage } from '../pages/my/my';
import { MainPage } from '../pages/main/main';
import { MyProfitPage } from '../pages/homechild/my-profit/my-profit';
import { MyGamerPage } from '../pages/homechild/my-gamer/my-gamer';
import { MyPromoterPage } from '../pages/homechild/my-promoter/my-promoter';
import { MyAboutPage } from '../pages/SetChild/my-about/my-about';
import { MyHelpPage } from '../pages/SetChild/my-help/my-help';
import { MySetPage } from '../pages/SetChild/my-set/my-set';
import { PromoterchildPage } from '../pages/promoter/promoterchild/promoterchild';
import { GamerchildPage } from '../pages/gamer/gamer-child/gamer-child';
import { PromoteraddPage } from '../pages/promoter/promoter-add/promoter-add';
import { GamerAddPage } from '../pages/gamer/gamer-add/gamer-add';
import { GamerBindPage } from '../pages/gamer/gamer-bind/gamer-bind';
import { AuthProvider } from '../providers/auth';
import { BasicServiceProvider } from '../providers/basic-service';
import { UpdatePwdPage } from '../pages/update-pwd/update-pwd';
import { HisProfitPage } from '../pages/his-profit/his-profit';
import { Md5 } from 'ts-md5/dist/md5';
import { FilterPipe } from '../pipes/filter/filter';
import { PrecentfilterPipe } from '../pipes/precentfilter/precentfilter';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    MesPage,
    MyPage,
    MainPage,
    MyProfitPage,
    MyGamerPage,
    MyPromoterPage,
    MyAboutPage,
    MyHelpPage,
    MySetPage,
    PromoterchildPage,
    GamerchildPage,
    PromoteraddPage,
    GamerAddPage,
    GamerBindPage,
    UpdatePwdPage,
    FilterPipe,
    PrecentfilterPipe,
    HisProfitPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '', // ���÷��ذ�ť������
      backButtonIcon: 'ios-arrow-back' ,// ���÷��ذ�ť��ͼ��
      //backButtonColor: '#000'
      mode:'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    MesPage,
    MyPage,
    MainPage,
    MyProfitPage,
    MyGamerPage,
    MyPromoterPage,
    MyAboutPage,
    MyHelpPage,
    MySetPage,
    PromoterchildPage,
    GamerchildPage,
    PromoteraddPage,
    GamerAddPage,
    GamerBindPage,
    UpdatePwdPage,
    HisProfitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Md5,
    FilterPipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    BasicServiceProvider
  ]
})
export class AppModule {}
