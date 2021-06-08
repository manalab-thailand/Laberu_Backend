export class FindCountSuccessByProjectId {
    type: string;
    project_id: string;

    constructor(payload: FindCountSuccessByProjectId) {
        Object.assign(this, payload);
    }
}