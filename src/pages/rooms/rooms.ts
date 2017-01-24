import {Component, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';

import {MessagesPage} from '../messages/messages';


import {GoogleMaps} from '../../providers/google-maps';
import {DataService} from '../../providers/data';
import {FirebaseListObservable} from "angularfire2";



@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html'
})
export class RoomsPage {
  @ViewChild(Content) content: Content;
  message: string;
  rooms: FirebaseListObservable< any[]>;
  data: DataService;

  constructor(public navCtrl: NavController, private _data: DataService, private _googleMaps: GoogleMaps) {
    this.data = _data;
    this.rooms = _data.rooms;
//
//     // onSuccess Callback
//     // This method accepts a Position object, which contains the
//     // current GPS coordinates
//     //
//     var onSuccess = function (position) {
//       // alert('Latitude: '          + position.coords.latitude          + '\n' +
//       //   'Longitude: '         + position.coords.longitude         + '\n' +
//       //   'Altitude: '          + position.coords.altitude          + '\n' +
//       //   'Accuracy: '          + position.coords.accuracy          + '\n' +
//       //   'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//       //   'Heading: '           + position.coords.heading           + '\n' +
//       //   'Speed: '             + position.coords.speed             + '\n' +
//       //   'Timestamp: '         + position.timestamp                + '\n');
//
//       var x = _googleMaps.load().then(response => {
// let locale='';
//         var metro = response.results.filter(
//           result=> {
//             return result.formatted_address.includes('Metropolitan')
//           }
//         );
//         if(metro.length>0){
//          locale=  metro[0].formatted_address;
//         }
//         else {
//           debugger;
//           var county = response.results.filter(
//             result=> {
//               return result.formatted_address.includes('County')
//             }
//           );
//           if(county.length>0){
//              locale=  county[0].formatted_address;
//           }
//           else{
//             alert('cannot find locale');
//           }
//
//         }
//
//         _data.messages(locale);
//        })
//     };
//
//     // onError Callback receives a PositionError object
//     //
//     function onError(error) {
//       alert('code: ' + error.code + '\n' +
//         'message: ' + error.message + '\n');
//     }
//
//     navigator.geolocation.getCurrentPosition(onSuccess, onError);
//

    _data.rooms.subscribe((data)=> {


    });

  }

  goToMessages(room: string, roomName: string) {
    this.navCtrl.push(MessagesPage, {room, roomName});
  }


  //
  // ionViewDidLoad() {
  //
  // }

}
