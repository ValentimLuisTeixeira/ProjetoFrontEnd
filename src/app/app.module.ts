import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as THREE from 'three';
import { RenderLobyComponent } from './modules/three.js/components/render-loby/render-loby.component';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { CookieModule } from 'ngx-cookie';

const scenes = [RenderLobyComponent,]

@Injectable()
export class SocketRootSpace extends Socket{
  constructor(){
    super({url:'http://192.168.1.69/',options:{}})
  }
}
@Injectable()
export class SocketLobbySpace extends Socket{
  constructor(){
    super({url:'http://192.168.1.69/lobby',options:{}})
  }
}


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    CookieModule.withOptions(),

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
