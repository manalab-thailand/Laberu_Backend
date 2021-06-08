export class FindTaskSuccessByUserId {
    user_id: string;

    constructor(payload: FindTaskSuccessByUserId) {
        Object.assign(this, payload)
    }
}