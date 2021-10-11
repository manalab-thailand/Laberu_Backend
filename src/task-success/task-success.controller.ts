import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskSuccessService } from './task-success.service';

@Controller('task-success')
export class TaskSuccessController {
  constructor(private readonly taskSuccessService: TaskSuccessService) {}
}
