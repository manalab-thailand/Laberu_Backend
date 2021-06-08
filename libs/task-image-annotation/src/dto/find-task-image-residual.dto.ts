export class FindTaskImageAnnotationResidualWork {
    status: boolean
    process: boolean
    time_start: string

    constructor(payload: FindTaskImageAnnotationResidualWork) {
        Object.assign(this, payload);
    }
}