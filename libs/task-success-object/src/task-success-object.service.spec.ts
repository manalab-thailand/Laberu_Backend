import { Test, TestingModule } from '@nestjs/testing';
import { TaskSuccessObjectService } from './task-success-object.service';

describe('TaskSuccessObjectService', () => {
  let service: TaskSuccessObjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskSuccessObjectService],
    }).compile();

    service = module.get<TaskSuccessObjectService>(TaskSuccessObjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
