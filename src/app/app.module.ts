import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

import { MessagesPage } from '../pages/messages/messages';
import { RoomsPage } from '../pages/rooms/rooms';
import { LocalPage } from '../pages/local/local';
import {IntroPage} from '../pages/intro/intro';
import {EulaPage} from '../pages/eula/eula';

import {DataService} from '../providers/data';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import {GoogleMaps} from "../providers/google-maps";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCPyEmfdVreTf02UwG7YDFt5214bMp-8qg",
    authDomain: "ananamoose-e5051.firebaseapp.com",
    databaseURL: "https://ananamoose-e5051.firebaseio.com",
    storageBucket: "ananamoose-e5051.appspot.com",
    messagingSenderId: "408076828278"
};


@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    MessagesPage,
    RoomsPage,
    LocalPage,
    EulaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    MessagesPage,
    RoomsPage,
    LocalPage,
    EulaPage
  ],
  providers: [GoogleMaps,DataService,Storage]
})
export class AppModule {}
