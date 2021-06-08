import { Test, TestingModule } from '@nestjs/testing';
import { TaskimageService } from './taskimage.service';

describe('TaskimageService', () => {
  let service: TaskimageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskimageService],
    }).compile();

    service = module.get<TaskimageService>(TaskimageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
