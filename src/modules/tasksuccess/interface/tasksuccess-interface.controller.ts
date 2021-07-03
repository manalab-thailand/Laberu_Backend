import { CreateTaskSuccess } from "../dto/create-task-success.dto";
import { FindCountTaskSuccessByUser } from "../dto/find-count-by-user.dto";
import { FindCountSuccessByProjectId } from "../dto/find-count-success-by-project.dto";
import { FindCountTaskSuccessByShortcode } from "../dto/find-count-success-by-shortcode.dto";

export interface ITasksuccessController {
    create(payload: CreateTaskSuccess): Promise<any>
    findCountTaskSuccessByShortcode(payload: FindCountTaskSuccessByShortcode): Promise<any>
    findCountTaskSuccessByUser(payload: FindCountTaskSuccessByUser): Promise<any>
    findCountTaskSuccessByProject(payload: FindCountSuccessByProjectId): Promise<any>
}