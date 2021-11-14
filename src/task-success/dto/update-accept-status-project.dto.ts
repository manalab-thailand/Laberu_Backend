export class UpdateAcceptStatusProject {
  project_id: string;
  accept: boolean;
  update_by: string;

  constructor(payload: UpdateAcceptStatusProject) {
    Object.assign(this, payload);
  }
}
