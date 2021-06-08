import { CreateTaskImageAnnotation } from "./dto/create-task-image-object.dto";
import { QueryImageAnnotation } from "./dto/query-image.dto";
import { UpdateProcessImageAnnotation } from "./dto/update-process.dto";
import { UpdateStatusImageAnnotation } from "./dto/update-status.dto";
import { TaskImageAnnotation } from "./entity/task-image.entity";

export interface ITaskImageAnnotationService {
    createTaskImageAnnotation(payload: CreateTaskImageAnnotation): Promise<any>
    findCountTaskImageAnnotation(): Promise<any>
    queryImageAnnotation(payload: QueryImageAnnotation): Promise<TaskImageAnnotation>
    updateStatusAnnotation(payload: UpdateStatusImageAnnotation): Promise<any>
    updateProcessAnnotation(payload: UpdateProcessImageAnnotation): Promise<any>
    findTaskImageAnnotationResidualWork(): Promise<any>
}