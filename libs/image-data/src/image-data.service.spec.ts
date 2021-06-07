import { Test, TestingModule } from '@nestjs/testing';
import { ImageDataService } from './image-data.service';

describe('ImageDataService', () => {
  let service: ImageDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageDataService],
    }).compile();

    service = module.get<ImageDataService>(ImageDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
