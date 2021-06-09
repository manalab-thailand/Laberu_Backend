export class FindOneByShortcode {
    shortcode: string;
    project_id: string;

    constructor(payload: FindOneByShortcode) {
        Object.assign(this, payload);
    }
}