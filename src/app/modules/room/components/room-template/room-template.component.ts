import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-room-template',
  templateUrl: './room-template.component.html',
  styleUrls: ['./room-template.component.scss']
})
export class RoomTemplateComponent implements OnInit {


   roomname:string|undefined;

  constructor(
    private _root:ActivatedRoute,
  ) { 
    this._root.params.subscribe({
      next:(Response:Params|{name : string})=>{
        this.roomname = Response.name;
      }
    })
  }

  ngOnInit(): void {
  }

}
