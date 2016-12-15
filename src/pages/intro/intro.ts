import { NavController} from 'ionic-angular';
import {Component} from '@angular/core';

import {Storage} from '@ionic/storage';
import {MessagesPage} from '../../pages/messages/messages'
import {EulaPage} from '../../pages/eula/eula'

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
  mySlideOptions = {
   pager:true
  };

  constructor(public nav: NavController,public storage:Storage){

  }

  goToHome(){
    // this.storage.set('location_accepted', false);
    this.nav.setRoot(MessagesPage);
  }
  goToEula(){
    // this.storage.set('location_accepted', false);
    this.nav.push(EulaPage);
  }
}
