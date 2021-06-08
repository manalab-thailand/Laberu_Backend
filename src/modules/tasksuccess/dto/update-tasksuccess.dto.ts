import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksuccessDto } from './create-tasksuccess.dto';

export class UpdateTasksuccessDto extends PartialType(CreateTasksuccessDto) {}
