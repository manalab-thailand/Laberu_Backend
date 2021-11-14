import { ProjectImageType, ProjectProcess } from '../interface/project.enum';
import { IProjectConfigInput } from '../interface/project.interface';

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
  config_input: IProjectConfigInput;
  update_by: string;

  constructor(payload: UpdateProjectDto) {
    Object.assign(this, payload);
  }
}
