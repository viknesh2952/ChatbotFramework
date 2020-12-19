import { TestBed } from '@angular/core/testing';

import { ChatbotContainerService } from './chatbot-container.service';

describe('ChatbotContainerService', () => {
  let service: ChatbotContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
