export class FindByProjectId {
  project_id: string;
  shortcode: string;
  start_at: string;
  end_at: string;
  limit: number;
  skip: number;
  sort: string;

  constructor(payload: FindByProjectId) {
    Object.assign(this, payload);
  }
}
