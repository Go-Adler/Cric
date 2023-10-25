import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.addEventListener('open', (event) => {
      console.log('WebSocket is open now.');
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket is closed now.', event);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event);
    });
  }

  sendMessage(message: any) {
    console.log(15);
    message = { hi: 'sss' };
    this.socket.send(JSON.stringify(message));
  }

  onMessage() {
    console.log(19, 'received response.');

    return new Observable((observer) => {
      this.socket.onmessage = (event) => observer.next(event.data);
    });
  }
}
