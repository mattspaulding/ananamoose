import {Component, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';

@Component({
  selector: 'page-eula',
  templateUrl: 'eula.html'
})
export class EulaPage {
  @ViewChild(Content) content: Content;

  constructor( public navCtrl: NavController) {

  }


}
