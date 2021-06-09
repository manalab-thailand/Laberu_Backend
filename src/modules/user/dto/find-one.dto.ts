export class FindOneUserByUID {
    uid: string;

    constructor(payload: FindOneUserByUID) {
        Object.assign(this, payload);
    }
}