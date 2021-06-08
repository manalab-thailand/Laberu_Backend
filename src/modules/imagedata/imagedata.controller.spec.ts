import { Test, TestingModule } from '@nestjs/testing';
import { ImagedataController } from './imagedata.controller';
import { ImagedataService } from './imagedata.service';

describe('ImagedataController', () => {
  let controller: ImagedataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagedataController],
      providers: [ImagedataService],
    }).compile();

    controller = module.get<ImagedataController>(ImagedataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
