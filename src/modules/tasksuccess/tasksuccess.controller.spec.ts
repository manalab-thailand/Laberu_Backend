import { Test, TestingModule } from '@nestjs/testing';
import { TasksuccessController } from './tasksuccess.controller';
import { TasksuccessService } from './tasksuccess.service';

describe('TasksuccessController', () => {
  let controller: TasksuccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksuccessController],
      providers: [TasksuccessService],
    }).compile();

    controller = module.get<TasksuccessController>(TasksuccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
