import { CreateTaskSuccessObject } from "./dto/create.dto";
import { FindCountSuccessByShortcode } from "./dto/find-count-by-shortcode.dto";
import { FindTaskSuccessByUserId } from "./dto/find-task-success-by-userid.dto";

export interface ITaskSuccessObjectService {
    createTaskSuccessObject(payload: CreateTaskSuccessObject): Promise<any>
    findCountSuccessByShortcode(payload: FindCountSuccessByShortcode): Promise<any>
    findTaskSuccessByUserId(payload: FindTaskSuccessByUserId): Promise<any>
}