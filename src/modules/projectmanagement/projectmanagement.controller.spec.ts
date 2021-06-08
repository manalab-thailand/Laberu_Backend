import { Test, TestingModule } from '@nestjs/testing';
import { ProjectmanagementController } from './projectmanagement.controller';
import { ProjectmanagementService } from './projectmanagement.service';

describe('ProjectmanagementController', () => {
  let controller: ProjectmanagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectmanagementController],
      providers: [ProjectmanagementService],
    }).compile();

    controller = module.get<ProjectmanagementController>(ProjectmanagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
