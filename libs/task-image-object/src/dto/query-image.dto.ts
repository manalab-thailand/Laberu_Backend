export class QueryImageObject {
    user_id: string

    constructor(payload: QueryImageObject) {
        Object.assign(this, payload);
    }
}