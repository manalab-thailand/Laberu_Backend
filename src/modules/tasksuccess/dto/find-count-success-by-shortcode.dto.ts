export class FindCountTaskSuccessByShortcode {
    type: string;
    shortcode: string;

    constructor(payload: FindCountTaskSuccessByShortcode) {
        Object.assign(this, payload)
    }
}