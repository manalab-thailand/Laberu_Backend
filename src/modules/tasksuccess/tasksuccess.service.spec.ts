import { Test, TestingModule } from '@nestjs/testing';
import { TasksuccessService } from './tasksuccess.service';

describe('TasksuccessService', () => {
  let service: TasksuccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksuccessService],
    }).compile();

    service = module.get<TasksuccessService>(TasksuccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
