export class CreateTaskSuccessAnnotation {
    shortcode: string;
    description?: string;
    time_start: string;
    time_stop: string;
    accept: boolean;
    user_id: string;
    task_id: string;
    payment: string;
    paymentAt: Date;

    constructor(payload: CreateTaskSuccessAnnotation) {
        Object.assign(this, payload)
    }
}