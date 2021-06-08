import { FindCountTaskImage } from "./dto/find-count.dto";
import { QueryImage } from "./dto/query-image.dto";
import { ResetTaskImage } from "./dto/reset-task-image.dto";
import { TaskImageResponse } from "./dto/task-image-response.dto";
import { UpdateStatusTaskImage, UpdateProcessTaskImage } from "./dto/update-task-image.dto";

export interface ITaskimageController {
    findCountImage(payload: FindCountTaskImage): Promise<any>
    queryImage(payload: QueryImage): Promise<TaskImageResponse>
    updateStatusImage(payload: UpdateStatusTaskImage): Promise<any>
    updateProcessImage(payload: UpdateProcessTaskImage): Promise<any>
    resetTaskImage(payload: ResetTaskImage): Promise<any>
}