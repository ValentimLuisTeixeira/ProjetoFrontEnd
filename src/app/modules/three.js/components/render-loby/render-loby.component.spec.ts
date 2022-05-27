import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderLobyComponent } from './render-loby.component';

describe('RenderLobyComponent', () => {
  let component: RenderLobyComponent;
  let fixture: ComponentFixture<RenderLobyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderLobyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderLobyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
