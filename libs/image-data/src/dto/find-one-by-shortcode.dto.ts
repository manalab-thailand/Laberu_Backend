export class FindOneByShortcode {
    shortcode: string;

    constructor(payload: FindOneByShortcode) {
        Object.assign(this, payload);
    }
}