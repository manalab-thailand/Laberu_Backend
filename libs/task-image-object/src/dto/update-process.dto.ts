export class UpdateProcessImageOjbect {
    id: string
    time_start: string
    status: boolean
    process: boolean

    constructor(payload: UpdateProcessImageOjbect) {
        Object.assign(this, payload);
    }
}