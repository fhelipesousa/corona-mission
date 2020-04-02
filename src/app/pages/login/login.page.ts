import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController, Platform } from '@ionic/angular';
import { FirebaseGoogleAuthService } from 'src/app/services/firebase/firebase-google-auth.service';
import { CoronaToast } from 'src/app/shared/corona-toast';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private googleAuth: FirebaseGoogleAuthService,
    private coronaToast: CoronaToast,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        console.log('click:', res);
        let msg = res.data ? res.data.mydata : '';        
        this.showAlert(res.title, res.text, msg);
      });
    });

   }

  ngOnInit() {
  }

  async loginFacebook() {
    this.coronaToast.showInfo('TODO - Login Facebook');
  }

  async loginGoogle() {
    this.googleAuth
    .doAuth()
    .then(this.goToHome.bind(this))
    .catch(error =>{
      console.error(error)
      this.coronaToast.showError("Não foi possível fazer o login.");
    })
  }

  loginEmail() {
    this.scheduleNotification();
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('/login/login-email');
  }

  private goToHome(){
    this.navCtrl.navigateForward('/home');
  }

  scheduleNotification(){    
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Corona Mission - Scheduling',
      data: { mydata: 'My hidden message this is'},
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
      // page: 'https://ionicframework.com/docs/native/local-notifications'},      
      // , trigger: { at: new Date(new Date().getTime() + 5 * 1000)}
    });
  }

  recurringNotification() {
    this.localNotifications.schedule({
      id: 2,
      title: 'Attention',
      text: 'Corona Mission - Recurring',
      data: { mydata: 'My hidden message this is'},
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE}
    });
  }

  repeatingDaily(){
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Corona Mission - Good morning',
      data: { mydata: 'Cuide do seu idoso!'},
      trigger: { every: {hour:17, minute:1}}
    });
  }  

  showAlert(header, sub, msg){
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    });
  }

}
