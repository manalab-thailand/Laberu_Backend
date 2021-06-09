export class CreateProjectManagement {
    project_name: string;
    labelType: string;
    labelingCount: string;
    baseImageUrl: string;
    priceEach: number;
    config: []
    process: boolean;


    constructor(payload: CreateProjectManagement) {
        Object.assign(this, payload);
    }

}