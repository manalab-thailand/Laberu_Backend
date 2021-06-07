import { CreateProjectManagement } from "./dto/create.dto";
import { FindProjectById } from "./dto/find-project-by-id.dto";
import { ProjectManagement } from "./entity/project-management-entity";

export interface IProjectManagementService {
    createProjectManagement(payload: CreateProjectManagement): Promise<any>
    findProjectById(payload: FindProjectById): Promise<ProjectManagement>
}