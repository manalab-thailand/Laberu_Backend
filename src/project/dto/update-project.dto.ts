import { ProjectImageType } from '../interface/project.enum';
import { IProjectConfigInput } from '../interface/project.interface';

export class UpdateProjectDto {
  project_id: string;
  project_name: string;
  project_desc: string;
  image_type: ProjectImageType;
  base_image_url: string;
  label_count: number;
  price_image: number;
  require_custom: boolean;
  config_input: IProjectConfigInput;
}
