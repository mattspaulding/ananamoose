import {Component, ViewChild} from '@angular/core';
import {Content, NavParams,NavController, AlertController} from 'ionic-angular';
import {Device,LocalNotifications} from 'ionic-native';

import {DataService} from '../../providers/data';
import {FirebaseListObservable} from "angularfire2";

import * as firebase from "firebase";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  @ViewChild(Content) content: Content;
  room: string;
  roomName: string;
  message: string;
  messages: FirebaseListObservable< any[]>;
  metaMessages: any[];
  rooms: FirebaseListObservable<any[]>;
  data: DataService;

  constructor(private _data: DataService, public navCtrl: NavController, public params: NavParams,public Alert:AlertController) {
    this.room = params.get('room');
    this.roomName = params.get('roomName');
    if (this.room === undefined) {
      this.room = 'ananamoose';
      this.roomName = 'ananamoose';
    }
    this.data = _data;
    this.message = '';
    _data.getMessages(this.room);
    this.messages = _data.messages;
    this.rooms = _data.rooms;

    _data.messages.subscribe((data)=> {
      this.metaMessages = data;
      setTimeout(() => {
        this.content.scrollToBottom(1000);
      }, 10);
    });
    // setTimeout(() => {
    //   this.content.scrollToBottom(1000);
    // }, 1000);

    // LocalNotifications.on("click", (notification, state) => {
    //   let alert = Alert.create({
    //     title: "Notification Clicked",
    //     subTitle: "You just clicked the scheduled notification",
    //     buttons: ["OK"]
    //   });
    //   alert.present();
    // });
  }

  //  schedule() {
  //    debugger;
  //   LocalNotifications.schedule({
  //     title: "Test Title",
  //     text: "Delayed Notification",
  //     at: new Date(new Date().getTime() + 5 * 1000),
  //     sound: null
  //   });
  // }
  addMessage(text: string) {
    if (text !== '') {
      let name = Device.device.uuid || 'web';
      this.messages.push({
        name: name,
        message: text,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
    }
    this.message = '';

  }


  flag(key: string) {
    this.messages.update(key, {'isFlagged': true});
    this.metaMessages.filter(x=>x.$key == key)[0].isShow = false;
   }

  show(key: string) {
    this.metaMessages.filter(x=>x.$key == key)[0].isShow = true;
  }


  public open(itemSlide: any) {
    // reproduce the slide on the click
     if(itemSlide.isOpen)
    {
      itemSlide.isOpen=false;
      itemSlide.setElementClass("active-sliding", true);
      itemSlide.setElementClass("active-slide", true);
      itemSlide.setElementClass("active-options-right", true);
      itemSlide.item.setElementStyle("transform", "translate3d(0px, 0px, 0px)");
    }
    else
    {
  itemSlide.isOpen=true;
    itemSlide.setElementClass("active-sliding", true);
    itemSlide.setElementClass("active-slide", true);
    itemSlide.setElementClass("active-options-right", true);
    itemSlide.item.setElementStyle("transform", "translate3d(-65px, 0px, 0px)");
  }}

  // public close(item: any) {
  //   item.close();
  //   item.setElementClass("active-sliding", false);
  //   item.setElementClass("active-slide", false);
  //   item.setElementClass("active-options-right", false);
  // }

  //
  // addRoom(text: string) {
  //   if (text !== '') {
  //     this.rooms.push({
  //       name: text
  //     }).then(result=> {
  //       let room = result.path.o[1];
  //
  //       this.navCtrl.push(MessagesPage, {room});
  //     });
  //
  //   }
  //   this.message = '';
  //
  // }

  // ionViewDidLoad() {
  //
  // }

}
