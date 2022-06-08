import { Component, Input, OnInit } from '@angular/core';
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
import { Loader } from 'three';


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

  @Input() roomname:string|undefined;
  idNameDiv = 'renderxpto';


  private _Socket:LobbySocketService |undefined;

  constructor(private _th:ThJsService , 
    //private _Socket:LobbySocketService, 
    private _cookie:CookieService) 
  { 

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
      this.RenderFrame();
      this.createSkyBox();
      this.createGround();
     // this.AddBox();
    }, );

  }




  private createSkyBox(): void {
    const loader = new THREE.CubeTextureLoader();
    loader.load([
      '/assets/png/skybox-green/right.png',
      '/assets/png/skybox-green/left.png',
      '/assets/png/skybox-green/top.png',
      '/assets/png/skybox-green/bottom.png',
      '/assets/png/skybox-green/front.png',
      '/assets/png/skybox-green/back.png',
    ], async (texture) => {
      this._th.scene.background = texture;

    });
  }


  private createGround():void{
    const groundzero = new THREE.Mesh( new THREE.BoxGeometry( 1,1,1,6,1 ), new THREE.MeshPhysicalMaterial()  );
    groundzero.scale.set(20,0.1,20);
    groundzero.material.color = new THREE.Color('#338256');
    groundzero.material.metalness = 1;
    this._th.scene.add(groundzero);
    this._Socket = new LobbySocketService();
this.startListenEvents();
  }


  socketList: Array<string> = [];

  private startListenEvents(): void {

    this._Socket?.listenEvent('connect').subscribe({
      next: () => {
        console.log('Connected to backend');
        this._Socket?.emitEvent({ eventName: 'join', data: { room: this.roomname } });
        this._Socket?.emitEvent({ eventName: 'socket-list', data: { room: this.roomname } });
      }
    });
    this._Socket?.listenEvent('disconnect').subscribe({
      next: () => {
        console.log('Disconnected from backend');
        this._Socket?.emitEvent({ eventName: 'socket-list', data: { room: this.roomname } });
      }
    });
    this._Socket?.listenEvent('new-join').subscribe({
      next: (socketId) => {
        console.log('New socketId', socketId);
        this._Socket?.emitEvent({ eventName: 'socket-list', data: { room: this.roomname } });
      }
    });

    this._Socket?.listenEvent('socket-list').subscribe({
      next: (socketList: Array<string>) => {
        console.log('Socket list', socketList);
        this.socketList = socketList;
      }
    });

  }


conrols: OrbitControls|undefined;

  private RenderFrame():void{
   
   this.conrols = new OrbitControls(this._th.camera, this._th.renderer.domElement  )
   this.conrols.minDistance = 20;
   this.conrols.maxDistance=50;
   this.conrols.enablePan= false;
   
   const render = ()=>{
     requestAnimationFrame(render);
     this.conrols?.update();
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
    console.log('RenderBox');


    const decoded: any = jwtDecode(this._cookie.get('token')!);
    const uuid = decoded['identification'];

    if(uuid == socketData.identification){

      this.conrols?.target.set(caixa.position.x,caixa.position.y,caixa.position.z);

    }

    
  }

  ngOnInit(): void {
  }

  onMouseclick(event: MouseEvent): void {
    event.preventDefault();
    const mouse = new THREE.Vector3();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, this._th.camera );
    var intersects = raycaster.intersectObjects( this._th.scene.children, true );
    if ( intersects.length > 0 ) {
      const obj = intersects[0].object;
      console.log( 'Mouse click on obj:', obj );
      const caixa = new THREE.Mesh( new THREE.BoxGeometry( 1,1,1,6,1 ), new THREE.MeshPhysicalMaterial()  );
      caixa.material.color = new THREE.Color('brown');
      const point = intersects[0].point;
      console.log('Real vector point raycaster', point);
      caixa.position.set(point.x, point.y, point.z);
      

      caixa.name = 'cube';

      if(this._th.scene.getObjectByName('cube')) {
        this._th.scene.children.slice().forEach(object => { if(object.name == 'cube') { this._th.scene.remove(object); } });
      }
      this._th.scene.add(caixa);
    }

    





}
onKeydown(event:any){
console.log(event.code);
}

}