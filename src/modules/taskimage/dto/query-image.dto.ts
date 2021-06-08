export class QueryImage {
    type: string; // annotation / labelling / classification
    user_id: string;

    constructor(payload: QueryImage) {
        Object.assign(this, payload)
    }
}