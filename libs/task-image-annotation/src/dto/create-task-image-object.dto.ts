export class CreateTaskImageAnnotation {
    shortcode: string;
    time_start: string;
    status: boolean;
    process: boolean;
    project_id: string;

    constructor(payload: CreateTaskImageAnnotation) {
        Object.assign(this, payload);
    }
}