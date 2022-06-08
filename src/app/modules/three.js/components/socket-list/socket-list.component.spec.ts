import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketListComponent } from './socket-list.component';

describe('SocketListComponent', () => {
  let component: SocketListComponent;
  let fixture: ComponentFixture<SocketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
