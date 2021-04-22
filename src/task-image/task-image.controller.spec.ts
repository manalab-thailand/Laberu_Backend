import { Test, TestingModule } from '@nestjs/testing';
import { TaskImageController } from './task-image.controller';
import { TaskImageService } from './task-image.service';

describe('TaskImageController', () => {
  let controller: TaskImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskImageController],
      providers: [TaskImageService],
    }).compile();

    controller = module.get<TaskImageController>(TaskImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
