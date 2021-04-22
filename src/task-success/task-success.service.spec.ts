import { Test, TestingModule } from '@nestjs/testing';
import { TaskSuccessService } from './task-success.service';

describe('TaskSuccessService', () => {
  let service: TaskSuccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskSuccessService],
    }).compile();

    service = module.get<TaskSuccessService>(TaskSuccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
