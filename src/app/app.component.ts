import { Component } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 private serverUrl = 'http://localhost:7001/chat'
  title = 'WebSockets chat';
  private stompClient;
  private num = 1;

  constructor(){
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });

      that.stompClient.subscribe("/chat/1", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });

      that.stompClient.subscribe("/chat/sako/1", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });

      that.stompClient.subscribe("/chat/aa/1", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });

      that.stompClient.subscribe("/user/" + 2 + "/queue/messages", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });

      that.stompClient.subscribe("/topic/mural", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    message = message + " " + (++this.num);
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }

  sendMessage1(message) {
    message = message + " " + (++this.num);
    this.stompClient.send("/app/send/message/1" , {}, message);
    $('#input').val('');
  }

  sendMessage2(message) {
    message = message + " " + (++this.num);
    this.stompClient.send("/app/send/messages/1" , {}, message);
    $('#input').val('');
  }

  sendMessage3(message) {
    message = message + " " + (++this.num);
    this.stompClient.send("/app/send/sako/1" , {}, JSON.stringify({"message": message, "name": "Yusuf Musa Yusuf"}));
    $('#input').val('');
  }

  sendMessage4(message) {
    message = message + " " + (++this.num);
    this.stompClient.send("/app/send/aa/1" , {}, JSON.stringify({"message": "I love you", "name": "Yusuf Musa Yusuf"}));
    $('#input').val('');
  }

  sendMessage5(message) {
    message = message + " " + (++this.num);
    this.stompClient.send("/app/send/gamo" , {}, JSON.stringify({"message": "I love you", "name": "Yusuf Musa Yusuf"}));
    $('#input').val('');
  }

  sendMessage6(message) {
    message = message + " " + (++this.num);
    this.stompClient.send("/app/send/message" , {}, "Hello World");
    $('#input').val('');
  }
}
