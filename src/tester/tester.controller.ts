import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TesterService } from './tester.service';
import { CreateTesterDto } from './dto/create-tester.dto';
import { UpdateTesterDto } from './dto/update-tester.dto';

@Controller('tester')
export class TesterController {
  constructor(private readonly testerService: TesterService) { }

  @Post()
  create(@Body() createTesterDto: CreateTesterDto) {
    return this.testerService.create(createTesterDto);
  }

  @Get()
  async findAll() {
    return await this.testerService.findAll();
  }
}
