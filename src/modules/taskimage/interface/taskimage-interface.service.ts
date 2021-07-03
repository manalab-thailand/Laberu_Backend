import { CreateTaskImageManyHandler } from "../dto/create-many.dto";
import { CreateTaskImageHandler } from "../dto/create-task-image.dto";
import { FindCountTaskImage } from "../dto/find-count.dto";
import { QueryImage } from "../dto/query-image.dto";
import { ResetTaskImage } from "../dto/reset-task-image.dto";
import { UpdateStatusTaskImage, UpdateProcessTaskImage } from "../dto/update-task-image.dto";

export interface ITaskimageService {
    createTaskImageHandler(payload: CreateTaskImageHandler): Promise<any>
    createTaskImageManyHandler(payload: CreateTaskImageManyHandler): Promise<any>
    findCountImageHandler(payload: FindCountTaskImage): Promise<any>
    QueryTaskImageHandler(payload: QueryImage): Promise<any>
    UpdateStatusHandler(payload: UpdateStatusTaskImage): Promise<any>
    UpdateProcessHandler(payload: UpdateProcessTaskImage): Promise<any>
    ResetTaskImageHandler(payload: ResetTaskImage): Promise<any>
}