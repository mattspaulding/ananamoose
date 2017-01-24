import {Component, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {MessagesPage} from '../messages/messages';

import {Geolocation} from 'ionic-native';
import {GoogleMaps} from '../../providers/google-maps';
import {DataService} from '../../providers/data';
import {FirebaseListObservable} from "angularfire2";



@Component({
  selector: 'page-local',
  templateUrl: 'local.html'
})
export class LocalPage {
  @ViewChild(Content) content: Content;
  message: string;
  rooms: FirebaseListObservable< any[]>;
  data: DataService;
  googleMaps: GoogleMaps;
  loading: boolean = false;
  mySlideOptions = {
    pager: true
  };

  constructor(public navCtrl: NavController, private _data: DataService, private _googleMaps: GoogleMaps, public storage: Storage) {
    this.googleMaps = _googleMaps;

    this.storage.get('location_accepted').then((result) => {
      if (result) {
        this.allowGeolocation();
      }
    });

  }

  allowGeolocation() {
    this.loading = true;
    Geolocation.getCurrentPosition().then((position) => {

        this.storage.set('location_accepted', true);

        this.googleMaps.load(position.coords.latitude, position.coords.longitude).then(response => {
          let locale = '';
          var metro = response.results.filter(
            result => {
              return result.formatted_address.includes('Metropolitan')
            }
          );
          if (metro.length > 0) {
            locale = metro[0].formatted_address;
          }
          else {
            var county = response.results.filter(
              result => {
                return result.formatted_address.includes('County')
              }
            );
            if (county.length > 0) {
              locale = county[0].formatted_address;
            }
            else {
              alert('cannot find locale');
            }

          }

          // clean up the name
          locale = locale.split('.').join('');

          let room = locale;
          let roomName = locale.split(',')[0].split(' Metropolitan')[0];

          this.navCtrl.setRoot(MessagesPage, {room, roomName}, {animate: true, direction: "forward"});
        })
      }, error => {
        alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      });

  }

  cancel() {
    this.navCtrl.setRoot(MessagesPage, {}, {animate: true, direction: "forward"});

  }


  //
  // ionViewDidLoad() {
  //
  // }

}
