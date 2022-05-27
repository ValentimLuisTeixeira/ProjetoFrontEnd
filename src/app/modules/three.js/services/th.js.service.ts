import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class ThJsService {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera();

  constructor() { }

  getElementSize(object:{ elementId: string }): { width: number; height: number; } {
    const element = document.getElementById(object.elementId);
    const divW = element!.clientWidth;
    const divH = element!.clientHeight;
    return { width: divW, height: divH };
  }

  appendChild(object:{ elementId: string }): void {
    document.getElementById(object.elementId)!.appendChild( this.renderer.domElement );
  }

  remove(object:{ elementId: string }): void {
    document.getElementById(object.elementId)!.remove();
  }
    }

