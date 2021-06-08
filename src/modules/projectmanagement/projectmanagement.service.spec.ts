import { Test, TestingModule } from '@nestjs/testing';
import { ProjectmanagementService } from './projectmanagement.service';

describe('ProjectmanagementService', () => {
  let service: ProjectmanagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectmanagementService],
    }).compile();

    service = module.get<ProjectmanagementService>(ProjectmanagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
