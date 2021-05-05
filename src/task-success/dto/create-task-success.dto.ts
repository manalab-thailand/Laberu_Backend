export class CreateTaskSuccessDto {
  readonly shortcode: String;
  readonly description: String;
  readonly time_start: String;
  readonly time_stop: String;
  readonly accept: Boolean;
  readonly user_id: String;
  readonly task_id: String;
}
