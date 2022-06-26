import { IProjectPermission } from '../interface/project.interface';
import { Types } from 'mongoose';

export class AddPermissionRequest {
  project_id: string;
  user: IProjectPermission;

  constructor(payload: AddPermissionRequest) {
    Object.assign(this, payload);
  }
}

export class RemovePermissionRequest {
  project_id: string;
  user_id: Types.ObjectId;

  constructor(payload: RemovePermissionRequest) {
    Object.assign(this, payload);
  }
}
