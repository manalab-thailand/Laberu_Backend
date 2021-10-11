import { ProjectProcess } from '../interface/project.enum';

export class UpdateProjectProcessDto {
  project_id: string;
  process: ProjectProcess;
}
