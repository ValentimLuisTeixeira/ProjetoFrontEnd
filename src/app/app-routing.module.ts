import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path :'list',
  loadChildren:()=> import('./modules/list/list.module').then(m=>m.ListModule),

  
},
{
  path :'room/:name',
  loadChildren:()=> import('./modules/room/room.module').then(m=>m.RoomModule),
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
