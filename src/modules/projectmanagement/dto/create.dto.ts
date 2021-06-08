export class CreateProjectManagement {
    project_name: string;
    labelType: string;
    labelingCount: string;
    baseImageUrl: string;
    customerID: string;


    constructor(payload: CreateProjectManagement) {
        Object.assign(this, payload);
    }

}