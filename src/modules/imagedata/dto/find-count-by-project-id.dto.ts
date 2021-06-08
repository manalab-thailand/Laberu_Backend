export class FindCountByProjectId {
    project_id: string;

    constructor(payload: FindCountByProjectId) {
        Object.assign(this, payload);
    }
}