import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-socket-list',
  templateUrl: './socket-list.component.html',
  styleUrls: ['./socket-list.component.scss']
})
export class SocketListComponent implements OnInit {

  
  @Input() socketlist:Array<String>=[];

  constructor() { }

  ngOnInit(): void {
  }

}
