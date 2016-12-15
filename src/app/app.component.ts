import {Component, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform, MenuController, Nav} from 'ionic-angular';

import {StatusBar} from 'ionic-native';

import {IntroPage} from '../pages/intro/intro';
import {MessagesPage} from '../pages/messages/messages';
import {RoomsPage} from '../pages/rooms/rooms';
import {LocalPage} from '../pages/local/local';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make UsersPage the root (or first) page
  rootPage: any = IntroPage;
  pages: Array<{title: string,icon: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController, public storage: Storage) {

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

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
