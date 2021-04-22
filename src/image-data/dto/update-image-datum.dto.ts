import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDatumDto } from './create-image-datum.dto';

export class UpdateImageDatumDto extends PartialType(CreateImageDatumDto) {}
