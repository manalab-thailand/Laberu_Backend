export class UpdateProcessImageAnnotation {
    id: string
    time_start: string
    status: boolean
    process: boolean

    constructor(payload: UpdateProcessImageAnnotation) {
        Object.assign(this, payload);
    }
}