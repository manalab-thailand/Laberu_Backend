export class CreateTaskSuccessObject {
    shortcode: string;
    filename: string;
    object: [];
    time_start: string;
    time_stop: string;
    accept: boolean;
    user_id: string;
    task_id: string;

    constructor(payload: CreateTaskSuccessObject) {
        Object.assign(this, payload)
    }
}