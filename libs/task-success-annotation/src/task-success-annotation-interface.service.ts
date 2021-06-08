import { CreateTaskSuccessAnnotation } from "./dto/create.dto";
import { FindCountTaskSuccessAnnotationByProject } from "./dto/find-count-by-project.dto";
import { FindCountSuccessByShortcode } from "./dto/find-count-by-shortcode.dto";
import { FindTaskSuccessByUserId } from "./dto/find-task-success-by-userid.dto";

export interface ITaskSuccessAnnotationService {
    createTaskSuccessAnnotation(payload: CreateTaskSuccessAnnotation): Promise<any>
    findCountSuccessByShortcode(payload: FindCountSuccessByShortcode): Promise<any>
    findTaskSuccessByUserId(payload: FindTaskSuccessByUserId): Promise<any>
    findCountTaskSuccessByUserId(payload: FindTaskSuccessByUserId): Promise<any>
    findTaskSuccessAnnotationByProjectId(payload: FindCountTaskSuccessAnnotationByProject): Promise<any>
    findCountTaskSuccessAnnotationByProjectId(payload: FindCountTaskSuccessAnnotationByProject): Promise<any>
}