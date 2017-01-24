import {Component, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform, MenuController, Nav,AlertController} from 'ionic-angular';

import {StatusBar,Push} from 'ionic-native';

import {IntroPage} from '../pages/intro/intro';
import {MessagesPage} from '../pages/messages/messages';
import {RoomsPage} from '../pages/rooms/rooms';
import {LocalPage} from '../pages/local/local';

import * as firebase from "firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make UsersPage the root (or first) page
  rootPage: any = IntroPage;
  pages: Array<{title: string,icon: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController, public storage: Storage,
              public alertCtrl: AlertController) {

    this.storage.get('location_accepted').then((result) => {
      if (result) {
        this.rootPage = LocalPage;
      } else {
        this.storage.get('intro_shown').then((result) => {
          if (result) {
            this.rootPage = MessagesPage;
          } else {
            this.storage.set('intro_shown', true);
            this.rootPage = IntroPage;
          }
        })
      }
    });

    // set our app's pages
    this.pages = [
      {title: 'ananamoose', icon: 'planet', component: MessagesPage},
      {title: 'localmoose', icon: 'pin', component: LocalPage},
      {title: 'rooms', icon: 'home', component: RoomsPage},
      {title: 'about', icon: 'information', component: IntroPage},
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      let push = Push.init({
        android: {
          senderID: "YOUR_SENDER_ID"
        },
        ios: {
          alert: "true",
          badge: false,
          sound: "true"
        },
        windows: {}
      });

      push.on('registration', (data) => {
        console.log("device token ->", data.registrationId);
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.registrationId,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            }
          }]
        });
        confirmAlert.present();
        //TODO - send device token to server
      });
      push.on('notification', (data) => {
        console.log('message', data.message);
        let self = this;
        //if user using app and push notification comes
        if (data.additionalData.foreground) {
          // if application open, show popup
          let confirmAlert = this.alertCtrl.create({
            title: 'New Notification',
            message: data.message,
            buttons: [{
              text: 'Ignore',
              role: 'cancel'
            }, {
              text: 'View',
              handler: () => {
                //TODO: Your logic here
                self.nav.push(MessagesPage, {message: data.message});
              }
            }]
          });
          confirmAlert.present();
        } else {
          //if user NOT using app and push notification comes
          //TODO: Your logic on click of push notification directly
          self.nav.push(MessagesPage, {message: data.message});
          console.log("Push notification clicked");
        }
      });
      push.on('error', (e) => {
        console.log(e.message);
      });
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
