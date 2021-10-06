import { Test, TestingModule } from '@nestjs/testing';
import { ImageDataController } from './image-data.controller';
import { ImageDataService } from './image-data.service';

describe('ImageDataController', () => {
  let controller: ImageDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageDataController],
      providers: [ImageDataService],
    }).compile();

    controller = module.get<ImageDataController>(ImageDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
