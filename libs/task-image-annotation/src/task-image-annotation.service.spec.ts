import { Test, TestingModule } from '@nestjs/testing';
import { TaskImageAnnotationService } from './task-image-annotation.service';

describe('TaskImageAnnotationService', () => {
  let service: TaskImageAnnotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskImageAnnotationService],
    }).compile();

    service = module.get<TaskImageAnnotationService>(TaskImageAnnotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
