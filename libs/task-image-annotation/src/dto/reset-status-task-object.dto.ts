export class ResetStatusTaskImageAnnotation {
    id: string
    time_start: string
    status: boolean
    process: boolean

    constructor(payload: ResetStatusTaskImageAnnotation) {
        Object.assign(this, payload);
    }
}