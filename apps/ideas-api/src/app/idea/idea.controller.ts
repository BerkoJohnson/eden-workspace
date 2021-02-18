import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import { IdeaDTO } from './idea.dto';
import { IdeaService } from './idea.service';

@Controller('api/ideas')
export class IdeaController {
  logger = new Logger('IdeaController');
  constructor(private ideaService: IdeaService) {}

  @Get()
  showAll() {
    return this.ideaService.showAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  createIdea(@User('id') user: string, @Body(ValidationPipe) data: IdeaDTO) {
    this.logData({user, body: data});
    return this.ideaService.create(data, user);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateIdea(
    @User('id') user: string,
    @Param('id') id: string,
    @Body(ValidationPipe) data: Partial<IdeaDTO>,
  ) {
    this.logData({id, user, body: data});
    return this.ideaService.update(id, data, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  destroyIdea(@User('id') user: string, @Param('id') id: string) {
    this.logData({id, user});
    return this.ideaService.destroy(id, user);
  }

  private logData(options: any) {
    options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
    options.body && this.logger.log('BODY ' + JSON.stringify(options.body));
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
  }
}
