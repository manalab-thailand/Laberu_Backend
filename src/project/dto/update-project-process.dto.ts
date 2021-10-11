import { ProjectProcess } from '../interface/project.enum';

export class UpdateProjectProcessDto {
  project_id: string;
  process: ProjectProcess;
  update_by: string;

  constructor(payload: UpdateProjectProcessDto) {
    Object.assign(this, payload);
  }
}
