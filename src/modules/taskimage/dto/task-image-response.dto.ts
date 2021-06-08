export class TaskImageResponse {
    shortcode: string;
    time_start: string;
    status: boolean;
    process: boolean;

    constructor(payload: TaskImageResponse) {
        Object.assign(this, payload)
    }

}