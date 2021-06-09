import { createImageData } from "../dto/create.dto";
import { FindCountByProjectId } from "../dto/find-count-by-project-id.dto";
import { FindOneByShortcode } from "../dto/find-one-by-shortcode.dto";
import { ImageData } from "../entity/image-datum.entity";


export interface IImagedataService {
    createImageData(payload: createImageData): Promise<any>
    findOneByShortcode(payload: FindOneByShortcode): Promise<ImageData>
    findCountByProjectId(payload: FindCountByProjectId): Promise<any>
}