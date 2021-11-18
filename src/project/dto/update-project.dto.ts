import { ProjectImageType, ProjectProcess } from '../interface/project.enum';
import {
  ICustomAttribute,
  IProjectConfigInput,
} from '../interface/project.interface';

export class UpdateProjectDto {
  _id: string;
  project_name: string;
  project_desc: string;
  image_type: ProjectImageType;
  base_image_url: string;
  project_owner: string;
  process: ProjectProcess;
  label_count: number;
  price_image: number;
  require_custom: boolean;
  custom_attrbute: ICustomAttribute[];
  config_input: IProjectConfigInput;
  access_password: string | null;
  export_password: string | null;
  update_by: string;

  constructor(payload: UpdateProjectDto) {
    Object.assign(this, payload);
  }
}
