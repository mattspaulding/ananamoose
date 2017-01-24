import {Injectable} from '@angular/core';
import {Device} from 'ionic-native';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class DataService {
  af:AngularFire;
  messages: FirebaseListObservable<any[]>;
  rooms: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.af=af;
    this.messages = af.database.list('messages/-qwerty', {
      query: {
        limitToLast: 100,
      }
    });
    let name = Device.uuid || 'web';
    this.rooms = af.database.list('room_names');

   }

  getMessages(room: string) {
    this.messages= this.af.database.list('messages/' + room, {
      query: {
        limitToLast: 100,
      }
    });
  }

}
