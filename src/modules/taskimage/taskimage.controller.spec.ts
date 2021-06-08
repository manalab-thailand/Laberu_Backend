import { Test, TestingModule } from '@nestjs/testing';
import { TaskimageController } from './taskimage.controller';
import { TaskimageService } from './taskimage.service';

describe('TaskimageController', () => {
  let controller: TaskimageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskimageController],
      providers: [TaskimageService],
    }).compile();

    controller = module.get<TaskimageController>(TaskimageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
