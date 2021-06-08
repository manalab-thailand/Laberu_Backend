export class CheckUserActive {
    uid: string;

    constructor(payload: CheckUserActive) {
        Object.assign(this, payload);
    }
}
