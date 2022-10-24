export interface IGetAllRequest {
  shortcode: string;
  status: string;
  user_id: string;
  project_id: string;
  approve_by: string;
  limit: number;
  page: number;
  sort: string;
}

export interface ICreateRequest {
  task_success_id: string;
  user_id: string;
}

export interface IUpdateRequest {
  id: string;
  new_result: string;
}

export interface IApproveRequest {
  id: string;
  user_id: string;
}

export interface IRejectRequest {
  id: string;
  user_id: string;
}
