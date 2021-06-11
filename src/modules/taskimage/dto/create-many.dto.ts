export class CreateTaskImageManyHandler {
    type: string
    mapdata: [];

    constructor(payload: CreateTaskImageManyHandler) {
        Object.assign(this, payload);
    }
}