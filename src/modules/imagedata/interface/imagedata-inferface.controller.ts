import { createImageData } from "../dto/create.dto";
import { FindCountByProjectId } from "../dto/find-count-by-project-id.dto";
import { FindOneByShortcode } from "../dto/find-one-by-shortcode.dto";

export interface IImagedataController {
    create(payload: createImageData): Promise<any>
    findOneByShortcode(payload: FindOneByShortcode): Promise<any>
    findCountByProjectId(payload: FindCountByProjectId): Promise<any>
}