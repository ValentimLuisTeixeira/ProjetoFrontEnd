import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderLobyComponent } from './components/render-loby/render-loby.component';
import { SocketListComponent } from './components/socket-list/socket-list.component';


const scenes = [RenderLobyComponent,];
const components = [SocketListComponent,];
@NgModule({
  declarations: [
    ...components,
    ...scenes,
    SocketListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ...scenes,
    ...components,
  ]
})
export class ThreeJsModule { }
