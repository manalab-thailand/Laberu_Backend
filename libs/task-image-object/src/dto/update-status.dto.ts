export class UpdateStatusImageOjbect {
    id: string
    time_start: string
    status: boolean

    constructor(payload: UpdateStatusImageOjbect) {
        Object.assign(this, payload);
    }
}
