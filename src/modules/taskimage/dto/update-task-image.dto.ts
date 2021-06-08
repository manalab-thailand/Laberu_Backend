export class UpdateStatusTaskImage {
    type: string; // annotation / labelling / classification
    id: string
    time_start: string
    status: boolean

    constructor(payload: UpdateStatusTaskImage) {
        Object.assign(this, payload);
    }
}

export class UpdateProcessTaskImage {
    type: string; // annotation / labelling / classification
    id: string
    time_start: string
    status: boolean
    process: boolean

    constructor(payload: UpdateProcessTaskImage) {
        Object.assign(this, payload);
    }
}