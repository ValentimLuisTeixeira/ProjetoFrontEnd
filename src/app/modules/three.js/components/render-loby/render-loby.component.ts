import { Component, OnInit } from '@angular/core';
import { provideRoutes } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {ThJsService} from '../../services/th.js.service';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment';
import { LobbySocketService } from '../../services/lobby-socket.service';
import { CookieModule, CookieService } from 'ngx-cookie';
import { Token } from '@angular/compiler';
import jwtDecode from 'jwt-decode';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'render-loby',
  templateUrl: './render-loby.component.html',
  styleUrls: ['./render-loby.component.scss'],
  providers:[
    ThJsService,
    LobbySocketService,
  ]
})
export class RenderLobyComponent implements OnInit {


  idNameDiv = 'renderxpto';

  constructor(private _th:ThJsService , private _Socket:LobbySocketService, private _cookie:CookieService) 
  { 
    this._Socket.listenEvent('toma-la').subscribe({
      next:(response:string)=>{
        console.log(response);

        const decoded: any = jwtDecode(response);
        /**
         * Este toke nexpira em X
         */
        const tokenExp: Date = new Date(new Date(0).setUTCSeconds(decoded['exp']));

        this._cookie.put('token', response, { expires: tokenExp });
    }
  
    });
  this._Socket.listenEvent('novo-user').subscribe({
    next:(response:{idade:Date , identification: string})=>{
      this.addBox(response);
  }

  });

  this._Socket.listenEvent('user_Saiu').subscribe({
    next:(response:{idade:Date , identification: string})=>{
      console.log('Este', response.identification , 'Bazou');
    }
  });
  this._Socket.listenEvent('user_msg').subscribe({
  next:(response:any)=>{
    
  }
});


  this._Socket.listenEvent('disconnect').subscribe({
    next:(reason:any)=>{
      console.log('BackEnd Caiu', reason);
    }
  });

  
  this._Socket.listenEvent('connect').subscribe({
    next:(response:any)=>{
     console.log('connectado ao BackEnd', response);
    // if(!this._cookie.hasKey('token')){
       this._Socket.emitEvent({eventName:'join'})
     //}
    }
  });




  }
  ngAfterViewInit():void{
    setTimeout(() => {
      const divSize = this._th.getElementSize({elementId: this.idNameDiv})
      console.log(divSize)
      this._th.camera=new THREE.PerspectiveCamera(50,(divSize.width/divSize.height),0.1,500);
      this._th.camera.position.set(1,1,1);
      this._th.renderer = new THREE.WebGL1Renderer({alpha:true, antialias:true});
      this._th.renderer.setSize(divSize.width , divSize.height);
      this._th.appendChild({elementId: this.idNameDiv});
      const env = new THREE.PMREMGenerator(this._th.renderer);
      this._th.scene.environment = env.fromScene(new RoomEnvironment(),0.1).texture
      this.RenderFrame()
     // this.AddBox();
    }, );

  }

  private RenderFrame():void{
   new OrbitControls(this._th.camera, this._th.renderer.domElement  )
   const render = ()=>{
     requestAnimationFrame(render);
     this._th.renderer.render(this._th.scene,this._th.camera)
   }
   render();
  }

  private addBox(socketData: { idade: Date; identification: string; }): void {
    const caixa = new THREE.Mesh( new THREE.BoxGeometry( 1,1,1,6,1 ), new THREE.MeshPhysicalMaterial()  );
    caixa.material.color = new THREE.Color('brown');
    caixa.position.set(Math.floor(Math.random() * 20), 0,0);
    caixa.userData = socketData;
    this._th.scene.add(caixa);
  }

  ngOnInit(): void {
  }

}