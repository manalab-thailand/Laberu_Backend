export class CreateTaskSuccessAnnotation {
    shortcode: string;
    filename: string;
    object?: [];
    time_start: string;
    time_stop: string;
    accept: boolean;
    user_id: string;
    task_id: string;

    constructor(payload: CreateTaskSuccessAnnotation) {
        Object.assign(this, payload)
    }
}