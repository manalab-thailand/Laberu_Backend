export class CreateUser {
    firstname: string;
    lastname: string;
    birth: string;
    email: string;
    phonenumber: string;
    career: string;
    location: string;
    province: string;
    status: string;
    uid: string;

    constructor(payload: CreateUser) {
        Object.assign(this, payload)
    }

}