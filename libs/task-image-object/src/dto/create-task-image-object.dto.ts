export class CreateTaskImageObject {
    shortcode: string;
    time_start: string;
    status: boolean;
    process: boolean;
    project_id: string;

    constructor(payload: CreateTaskImageObject) {
        Object.assign(this, payload);
    }
}