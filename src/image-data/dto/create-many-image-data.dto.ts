import { ImageData } from '../entities/image-data.schema';
import { CreateImageDataDto } from './create-image-data.dto';

export class CreateManyImageDataDto {
  mapImageData: ImageData[];

  constructor(payload: CreateManyImageDataDto) {
    Object.assign(this, payload);
  }
}
