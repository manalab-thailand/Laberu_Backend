export class ResetStatusTaskImageObject {
    id: string
    time_start: string
    status: boolean
    process: boolean

    constructor(payload: ResetStatusTaskImageObject) {
        Object.assign(this, payload);
    }
}