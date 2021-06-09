export class FindCountTaskSuccessByShortcode {
    type: string;
    shortcode: string;
    project_id: string;

    constructor(payload: FindCountTaskSuccessByShortcode) {
        Object.assign(this, payload)
    }
}