export class FindCountSuccessByShortcode {
    shortcode: string
    project_id: string

    constructor(payload: FindCountSuccessByShortcode) {
        Object.assign(this, payload)
    }
}