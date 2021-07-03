export class CreateTaskSuccess {
    type: string;
    shortcode: string;
    filename: string;
    description?: string;
    object?: [];
    time_start: string;
    time_stop: string;
    accept: boolean;
    user_id: string;
    task_id: string;
    payment: string;
    paymentAt: Date;

    constructor(payload: CreateTaskSuccess) {
        Object.assign(this, payload);
    }
}