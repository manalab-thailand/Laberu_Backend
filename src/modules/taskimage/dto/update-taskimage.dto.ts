import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskimageDto } from './create-taskimage.dto';

export class UpdateTaskimageDto extends PartialType(CreateTaskimageDto) {}
