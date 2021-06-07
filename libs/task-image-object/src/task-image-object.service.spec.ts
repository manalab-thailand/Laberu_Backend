import { Test, TestingModule } from '@nestjs/testing';
import { TaskImageObjectService } from './task-image-object.service';

describe('TaskImageObjectService', () => {
  let service: TaskImageObjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskImageObjectService],
    }).compile();

    service = module.get<TaskImageObjectService>(TaskImageObjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
