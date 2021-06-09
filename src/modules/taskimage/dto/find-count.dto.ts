export class FindCountTaskImage {
    type: string;
    project_id: string;

    constructor(payload: FindCountTaskImage) {
        Object.assign(this, payload);
    }
}