export class FindByProjectId {
  project_id: string;
  limit: number;
  skip: number;

  constructor(payload: FindByProjectId) {
    Object.assign(this, payload);
  }
}
