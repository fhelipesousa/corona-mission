import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthFirebaseService } from './services/firebase/firebase-auth.service';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authFirebaseService: AuthFirebaseService,
    public fcm: FCM
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then((token) => {
        console.log(token);
      }), (err) => {
        console.log(JSON.stringify(err));
      }

      this.fcm.onNotification().subscribe((data) => {
        if(data.wasTapped)
        {
          console.log("Was tapped");
        }
        else
        {
          console.log(data.message);
        }
      });

      this.fcm.onTokenRefresh().subscribe((token) =>{
        console.log(token);
      });

    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Sobre",
        url   : "/about",
        icon  : "information-circle-outline"
      }
    ]
  }

  logout() {
    this.authFirebaseService.doSignOutEmail();
  }
}
