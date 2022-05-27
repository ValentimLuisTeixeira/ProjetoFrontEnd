import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderLobyComponent } from './components/render-loby/render-loby.component';


const scenes = [RenderLobyComponent,]
@NgModule({
  declarations: [
    ...scenes,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ...scenes
  ]
})
export class ThreeJsModule { }
