export class FindByProjectId {
  project_id: string;

  constructor(payload: FindByProjectId) {
    Object.assign(this, payload);
  }
}
