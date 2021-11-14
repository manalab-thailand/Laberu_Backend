import { Test, TestingModule } from '@nestjs/testing';
import { TaskImageService } from './task-image.service';

describe('TaskImageService', () => {
  let service: TaskImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskImageService],
    }).compile();

    service = module.get<TaskImageService>(TaskImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
