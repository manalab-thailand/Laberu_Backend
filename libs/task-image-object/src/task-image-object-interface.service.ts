import { CreateTaskImageObject } from "./dto/create-task-image-object.dto";
import { FindTaskImageObjectResidualWork } from "./dto/find-task-image-residual.dto";
import { QueryImageObject } from "./dto/query-image.dto";
import { UpdateProcessImageOjbect } from "./dto/update-process.dto";
import { UpdateStatusImageOjbect } from "./dto/update-status.dto";
import { TaskImageObject } from "./entity/task-iamge-object-entity";

export interface ITaskImageObjectService {
    createTaskImageObject(payload: CreateTaskImageObject): Promise<any>
    findCountTaskImageObject(): Promise<any>
    queryImageObject(payload: QueryImageObject): Promise<TaskImageObject>
    updateStatus(payload: UpdateStatusImageOjbect): Promise<any>
    updateProcess(payload: UpdateProcessImageOjbect): Promise<any>
    findTaskImageObjectResidualWork(payload: FindTaskImageObjectResidualWork): Promise<TaskImageObject>
}