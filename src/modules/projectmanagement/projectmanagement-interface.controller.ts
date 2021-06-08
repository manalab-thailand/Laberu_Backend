import { CreateProjectManagement } from "./dto/create.dto";
import { FindProjectById } from "./dto/find-project-by-id.dto";

export interface IProjectmanagementController {
    create(payload: CreateProjectManagement): Promise<any>
    findOneProject(payload: FindProjectById): Promise<any>
}