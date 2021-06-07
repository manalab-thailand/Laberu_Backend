import { createImageData } from "./dto/create.dto";
import { FindOneByShortcode } from "./dto/find-one-by-shortcode.dto";
import { ImageData } from "./entity/image-datum.entity";

export interface IImageDataService {
    createImageData(payload: createImageData): Promise<any>
    findOneByShortcode(payload: FindOneByShortcode): Promise<ImageData>
}