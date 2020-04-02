import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, AlertController, Platform } from '@ionic/angular';
import { FirebaseGoogleAuthService } from 'src/app/services/firebase/firebase-google-auth.service';
import { CoronaToast } from 'src/app/shared/corona-toast';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
      text: 'Corona Mission',
      data: { page: 'https://ionicframework.com/docs/native/local-notifications'},
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND}
    });
  }

  recurringNotification() {

  }

  repeatingDaily(){

  }

  getAll(){

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
