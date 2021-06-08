export class CreateTaskImageHandler {
    type: string
    shortcode: string;
    time_start: string;
    status: boolean;
    process: boolean;
    project_id: string;

    constructor(payload: CreateTaskImageHandler) {
        Object.assign(this, payload);
    }
}