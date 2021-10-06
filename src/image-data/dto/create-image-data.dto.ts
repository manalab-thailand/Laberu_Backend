import {
  IAnnotation,
  IClassification,
  IObject,
} from '../interface/image-data.interface';

export class CreateImageDataDto {
  shortcode: string;
  annotation?: IAnnotation;
  object?: IObject;
  classification?: IClassification;
  project_id: string;

  constructor(payload: CreateImageDataDto) {
    Object.assign(this, payload);
  }
}
