export class FindCountTaskSuccessByUser {
    user_id: string;

    constructor(payload: FindCountTaskSuccessByUser) {
        Object.assign(this, payload)
    }
}

export class FindCountTaskSuccessByUserResponse {
    countAnnotation: number;
    countObject: number;
    countClassification: number;

    constructor(payload: FindCountTaskSuccessByUserResponse) {
        Object.assign(this, payload)
    }
}