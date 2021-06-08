export class FindProjectById {
    id: string;

    constructor(payload: FindProjectById) {
        Object.assign(this, payload);
    }
}