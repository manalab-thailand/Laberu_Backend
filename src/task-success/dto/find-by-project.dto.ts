export class FindByProjectId {
  project_id: string;
  shortcode: string;
  user_id: string;
  start_at: string;
  end_at: string;
  limit: number;
  page: number;
  sort: string;

  constructor(payload: FindByProjectId) {
    Object.assign(this, payload);
  }
}
