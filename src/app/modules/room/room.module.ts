import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { ThreeJsModule } from '../three.js/three.js.module';
import { RoomTemplateComponent } from './components/room-template/room-template.component';



@NgModule({
  declarations: [
    RoomTemplateComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    ThreeJsModule,
    
  ]
})
export class RoomModule { }
