import { TestBed } from '@angular/core/testing';

import { LobbySocketService } from './lobby-socket.service';

describe('LobbySocketService', () => {
  let service: LobbySocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbySocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
