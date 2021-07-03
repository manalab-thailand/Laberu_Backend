import { CheckUserActive } from "../dto/check-user.dto";
import { CreateUser } from "../dto/create.dto";
import { User } from "../entity/user-entity";

export interface IUserService {
    createUser(payload: CreateUser): Promise<any>
    checkUserActive(payload: CheckUserActive): Promise<User>
}