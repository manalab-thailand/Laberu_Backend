import { Test, TestingModule } from '@nestjs/testing';
import { ImagedataService } from './imagedata.service';

describe('ImagedataService', () => {
  let service: ImagedataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagedataService],
    }).compile();

    service = module.get<ImagedataService>(ImagedataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
