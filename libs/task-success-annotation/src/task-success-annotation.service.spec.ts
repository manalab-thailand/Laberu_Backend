import { Test, TestingModule } from '@nestjs/testing';
import { TaskSuccessAnnotationService } from './task-success-annotation.service';

describe('TaskSuccessAnnotationService', () => {
  let service: TaskSuccessAnnotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskSuccessAnnotationService],
    }).compile();

    service = module.get<TaskSuccessAnnotationService>(TaskSuccessAnnotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
