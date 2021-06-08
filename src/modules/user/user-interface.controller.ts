import { CheckUserActive } from "./dto/check-user.dto";
import { CreateUser } from "./dto/create.dto";
import { User } from "./entity/user-entity";

export interface IUserController {
    createUser(payload: CreateUser): Promise<any>
    checkUser(payload: CheckUserActive): Promise<User>
}