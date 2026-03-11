import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAdminGuard } from 'src/auth/guard';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';
import { ApplyApiQueryFromDto } from '../common/utils/helper';
import { SearchContactDto } from './dto/search.dto';

@Controller('')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('/contacts')
  async create(@Body() dto: CreateContactDto) {
    return await this.contactService.create(dto);
  }

  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @ApplyApiQueryFromDto(SearchContactDto)
  @Get('/admin/contacts')
  async findAll(@Query() query: SearchContactDto) {
    return await this.contactService.findAll(query);
  }

  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @Get('/admin/contacts/:id')
  async findOne(@Param('id') id: string) {
    return await this.contactService.findOne(id);
  }

  @UseGuards(JwtAdminGuard)
  @ApiBearerAuth()
  @Delete('/admin/contacts/:id')
  async remove(@Param('id') id: string) {
    return await this.contactService.remove(id);
  }
}
