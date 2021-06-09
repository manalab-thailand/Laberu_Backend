export class QueryImageAnnotation {
    user_id: string
    project_id: string;

    constructor(payload: QueryImageAnnotation) {
        Object.assign(this, payload);
    }
}