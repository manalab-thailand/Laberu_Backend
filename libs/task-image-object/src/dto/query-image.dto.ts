export class QueryImageObject {
    user_id: string
    project_id: string

    constructor(payload: QueryImageObject) {
        Object.assign(this, payload);
    }
}