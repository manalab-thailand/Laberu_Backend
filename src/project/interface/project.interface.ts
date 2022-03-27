export interface IProjectConfigInput {
  annotation?: IAnnotationConfigInput[];
  labelling?: ILabellingConfigInput[];
  classification?: IClassificationConfigInput[];
}

export interface IAnnotationConfigInput {}

export interface ILabellingConfigInput {
  display_name: string;
  value: string;
}

export interface IClassificationConfigInput {
  display_name: string;
  value: string;
}

export interface ICustomAttribute {
  display_name: string;
  value: string;
}
