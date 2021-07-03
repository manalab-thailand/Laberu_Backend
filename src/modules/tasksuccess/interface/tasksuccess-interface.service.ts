import { CreateTaskSuccess } from "../dto/create-task-success.dto";
import { FindCountTaskSuccessByUser, FindCountTaskSuccessByUserResponse } from "../dto/find-count-by-user.dto";
import { FindCountSuccessByProjectId } from "../dto/find-count-success-by-project.dto";
import { FindCountTaskSuccessByShortcode } from "../dto/find-count-success-by-shortcode.dto";

export interface ITasksuccessService {
    createTaskSuccessHandler(payload: CreateTaskSuccess): Promise<any>
    findCountTaskSuccessByProjectHandler(payload: FindCountSuccessByProjectId): Promise<any>
    findCountTaskSuccessByShortcodeHandler(payload: FindCountTaskSuccessByShortcode): Promise<any>
    findCountTaskSuccessHandler(payload: FindCountTaskSuccessByUser): Promise<FindCountTaskSuccessByUserResponse>
}