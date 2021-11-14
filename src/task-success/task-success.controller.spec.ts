import { Test, TestingModule } from '@nestjs/testing';
import { TaskSuccessController } from './task-success.controller';
import { TaskSuccessService } from './task-success.service';

describe('TaskSuccessController', () => {
  let controller: TaskSuccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskSuccessController],
      providers: [TaskSuccessService],
    }).compile();

    controller = module.get<TaskSuccessController>(TaskSuccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
