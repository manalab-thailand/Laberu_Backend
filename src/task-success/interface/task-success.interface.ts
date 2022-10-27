import { ILabelling } from 'src/image-data/interface/image-data.interface';

export interface ICustom {
  user_id: string;
  group_id: string;
}

export interface IResult {
  annotation?: IResultAnnotation;
  labelling?: IResultLabelling[];
  classification?: IResultClassification[];
}

export interface IResultAnnotation {
  description: string;
}

export interface IResultLabelling {
  size: ILabelling;
  detection: IDetection;
}

export interface IDetection {
  name: string;
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface IResultClassification {
  class: Object;
}

export interface IUpdateResult {
  id: number;
  result: IResult;
}
