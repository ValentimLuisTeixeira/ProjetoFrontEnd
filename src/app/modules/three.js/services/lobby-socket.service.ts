import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SocketLobbySpace } from 'src/app/app.module';

@Injectable()
export class LobbySocketService {

  spaceSocket: SocketLobbySpace;

  constructor() {
    this.spaceSocket = new SocketLobbySpace();
  }

  emitEvent(object: { eventName: string; data?: any }) {
    this.spaceSocket.emit(object.eventName, object.data);
  }

  listenEvent(eventName: string): Observable<any> {
    return this.spaceSocket.fromEvent(eventName).pipe(map((data: any) => data));
  }
}