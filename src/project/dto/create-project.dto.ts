import {
  ProjectType,
  ProjectLabelType,
  ProjectImageType,
  ProjectProcess,
} from '../interface/project.enum';
import {
  ICustomAttribute,
  IProjectConfigInput,
} from '../interface/project.interface';

export class CreateProjectDto {
  project_name: string;
  project_desc: string;
  project_type: ProjectType;
  label_type: ProjectLabelType;
  image_type: ProjectImageType;
  base_image_url: string;
  label_count: number;
  price_image: number;
  require_custom: boolean;
  custom_attrbute: ICustomAttribute[];
  config_input: IProjectConfigInput;
  process: ProjectProcess;
  project_owner: string;

  constructor(payload: CreateProjectDto) {
    Object.assign(this, payload);
  }
}
