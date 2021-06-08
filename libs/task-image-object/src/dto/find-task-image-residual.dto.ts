export class FindTaskImageObjectResidualWork {
    status: boolean
    process: boolean
    time_start: string

    constructor(payload: FindTaskImageObjectResidualWork) {
        Object.assign(this, payload);
    }
}