export class GetTaskImageByShortcode {
  project_id: string;
  shortcode: string;

  constructor(payload: GetTaskImageByShortcode) {
    Object.assign(this, payload);
  }
}
