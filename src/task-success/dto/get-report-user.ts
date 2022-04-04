export class GetReportUser {
  project_id: string;
  limit: number;
  skip: number;

  constructor(payload: GetReportUser) {
    Object.assign(this, payload);
  }
}
