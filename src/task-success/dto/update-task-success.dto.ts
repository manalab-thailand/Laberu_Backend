import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskSuccessDto } from './create-task-success.dto';

export class UpdateTaskSuccessDto extends PartialType(CreateTaskSuccessDto) {}
