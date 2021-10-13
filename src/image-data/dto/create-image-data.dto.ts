import {
  IAnnotation,
  IClassification,
  ILabelling,
} from '../interface/image-data.interface';

export class CreateImageDataDto {
  shortcode: string;
  annotation?: IAnnotation;
  labelling?: ILabelling;
  classification?: IClassification;
  project_id: string;
  createAt: Date;

  constructor(payload: CreateImageDataDto) {
    Object.assign(this, payload);
  }
}
