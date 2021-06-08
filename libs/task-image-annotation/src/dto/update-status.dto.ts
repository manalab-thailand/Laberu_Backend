export class UpdateStatusImageAnnotation {
    id: string
    time_start: string
    status: boolean

    constructor(payload: UpdateStatusImageAnnotation) {
        Object.assign(this, payload);
    }
}
