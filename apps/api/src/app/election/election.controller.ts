import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateElectionDto, CreateCandidateDto } from './election.dto';
import { ElectionService } from './election.service';

@Controller('elections')
export class ElectionController {
  constructor(private electionService: ElectionService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getElections() {
    // console.log(email);
    return this.electionService.getElections();
  }

  @Post()
  @UseGuards(JwtGuard)
  async createElection(
    @Body(ValidationPipe) createElectionDto: CreateElectionDto,
  ) {
    return this.electionService.create(createElectionDto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateElection(
    @Param('id') id: string,
    @Body(ValidationPipe) createElectionDto: CreateElectionDto,
  ) {
    return this.electionService.update(createElectionDto, id);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getElection(@Param('id') id: string) {
    return this.electionService.getElection(id);
  }

  @Get(':electionID/positions/:positionId')
  @UseGuards(JwtGuard)
  async getPost(@Param('positionId') positionId: string) {
    return this.electionService.getPosition(positionId);
  }
  @Patch(':electionID/positions')
  @UseGuards(JwtGuard)
  async removePosition(
    @Param('electionID') electionID: string,
    @Body(ValidationPipe) positions: string[],
  ) {
    return this.electionService.removePosition(electionID, positions);
  }

  @Post(':electionID/candidates')
  @UseGuards(JwtGuard)
  async addCandidates(
    @Param('electionID') electionID: string,
    @Body(ValidationPipe) createCandidatesDto: CreateCandidateDto,
  ) {
    return this.electionService.addCandidates(electionID, createCandidatesDto);
  }
}
