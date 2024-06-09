import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, Message, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable()
export class RandomwordService implements OnDestroy {

  private client: Client;
  private wordSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private subscription: StompSubscription | null = null;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      onConnect: this.onConnect
    });
    this.client.activate();
  }

  private onConnect = () => {
    this.subscription = this.client.subscribe('/topic/words', (message: Message) => {
      this.wordSubject.next(message.body);
    });
  }

  getWord(): Observable<string> {
    return this.wordSubject.asObservable();
  }

  start(): void {
    if (this.client.connected) {
      this.client.publish({ destination: '/app/start' });
    }
  }

  stop(): void {
    if (this.client.connected) {
      this.client.publish({ destination: '/app/stop' });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.client.deactivate();
  }
}
