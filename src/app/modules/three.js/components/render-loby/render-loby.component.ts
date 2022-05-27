import { Component, OnInit } from '@angular/core';
import { provideRoutes } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {ThJsService} from '../../services/th.js.service';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment';


@Component({
  selector: 'render-loby',
  templateUrl: './render-loby.component.html',
  styleUrls: ['./render-loby.component.scss'],
  providers:[
    ThJsService,
  ]
})
export class RenderLobyComponent implements OnInit {


  idNameDiv = 'renderxpto';

  constructor(private _th:ThJsService ) { }
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
      this.AddBox();
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

  private AddBox():void{
const caixa = new THREE.Mesh(new THREE.BoxGeometry( 1,1,1,6,1),new THREE.MeshPhysicalMaterial())
console.log(caixa);
caixa.material.color = new THREE.Color('red');
this._th.scene.add(caixa);
  }
  ngOnInit(): void {
  }

}