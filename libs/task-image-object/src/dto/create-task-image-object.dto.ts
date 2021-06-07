export class CreateTaskImageObject {
    shortcode: string;
    time_start: string;
    status: boolean;
    process: boolean;

    constructor(payload: CreateTaskImageObject) {
        Object.assign(this, payload);
    }
}