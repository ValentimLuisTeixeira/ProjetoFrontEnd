import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomTemplateComponent } from './components/room-template/room-template.component';

const routes: Routes = [{
  path:'',
  component: RoomTemplateComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
