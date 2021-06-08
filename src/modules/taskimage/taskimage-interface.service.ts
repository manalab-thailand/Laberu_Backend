import { QueryImageObject } from "@laberu/task-image-object/dto/query-image.dto";
import { UpdateProcessImageOjbect } from "@laberu/task-image-object/dto/update-process.dto";
import { UpdateStatusImageOjbect } from "@laberu/task-image-object/dto/update-status.dto";
import { QueryImageAnnotation } from "libs/task-image-annotation/src/dto/query-image.dto";
import { UpdateProcessImageAnnotation } from "libs/task-image-annotation/src/dto/update-process.dto";
import { UpdateStatusImageAnnotation } from "libs/task-image-annotation/src/dto/update-status.dto";
import { FindCountTaskImage } from "./dto/find-count.dto";
import { QueryImage } from "./dto/query-image.dto";
import { ResetTaskImage } from "./dto/reset-task-image.dto";
import { TaskImageResponse } from "./dto/task-image-response.dto";
import { UpdateStatusTaskImage, UpdateProcessTaskImage } from "./dto/update-task-image.dto";

export interface ITaskimageService {
    //Handler
    findCountImageHandler(payload: FindCountTaskImage): Promise<any>
    QueryTaskImageHandler(payload: QueryImage): Promise<any>
    UpdateStatusHandler(payload: UpdateStatusTaskImage): Promise<any>
    UpdateProcessHandler(payload: UpdateProcessTaskImage): Promise<any>
    ResetTaskImageHandler(payload: ResetTaskImage): Promise<any>

    //Object
    queryImageObject(payload: QueryImageObject): Promise<TaskImageResponse>
    updateStatusTaskObject(payload: UpdateStatusImageOjbect): Promise<any>
    updateProcessTaskObject(payload: UpdateProcessImageOjbect): Promise<any>
    resetTaskImageObject(): Promise<any>
    findCountTaskImageObject(): Promise<any>

    //Annotation
    queryImageAnnotation(payload: QueryImageAnnotation): Promise<TaskImageResponse>
    updateStatusTaskAnnotation(payload: UpdateStatusImageAnnotation): Promise<any>
    updateProcessTaskAnnotation(payload: UpdateProcessImageAnnotation): Promise<any>
    resetTaskImageAnnotation(): Promise<any>
    findCountTaskImageAnnotation(): Promise<any>
}