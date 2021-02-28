import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ElectionsService } from './elections.service';
import { JwtGuard } from '../shared/jwt.guard';
import { CandidateDto, CandidateUpdateDto, ElectionDto, PositionDto, PositionUpdateDto } from '../dtos';
import { Roles } from '../shared/roles.decorator';
import { ROLES } from '../shared/roles.enum';

@UseGuards(JwtGuard)
@Roles(ROLES.ADMIN, ROLES.SUPERADMIN)
@Controller('api')
export class ElectionsController {

  @Get('elections')
  getElections() {
    return this.electionService.getElections();
  }

  @Get('elections/:electionId')
  getElection(@Param('electionId') id: string) {
    return this.electionService.getElection(id);
  }

  @Post('elections')
  createElection(@Body(ValidationPipe) data: ElectionDto) {
    return this.electionService.createElection(data)
  }

  @Post('positions')
  createPosition(@Body(ValidationPipe) data: PositionDto) {
    return this.electionService.createPosition(data);
  }


  @Patch('positions/:positionId')
  updatePosition(@Param('positionId') positionId: string, @Body(ValidationPipe) data: PositionUpdateDto) {
    return this.electionService.updatePost(positionId, data);
  }

  @Delete('positions/:positionId')
  removePosition(@Param('positionId') positionId: string) {
    return this.electionService.removePost(positionId);
  }

  @Post('candidates')
  @UseGuards(JwtGuard)
  createCandidate(@Body(ValidationPipe) data: CandidateDto) {
    return this.electionService.createCandidate(data);
  }


  @Patch('candidates/:candidateId')
  updateCandidate(@Param('candidateId') candidateId: string, @Body(ValidationPipe) data: CandidateUpdateDto) {
    return this.electionService.updateCandidate(candidateId, data);
  }

  @Delete('candidates/:candidateId')
  removeCandidate(@Param('candidateId') candidateId: string) {
    return this.electionService.removeCandidate(candidateId);
  }


  @Get('candidates')
  getAllCandidates(
    @Query('id') id: string,
    @Query('type') type: 'position' | 'election',
    ) {
    return this.electionService.getAllCandidates({
      [type]: id
    });
  }

  constructor(private electionService: ElectionsService) {
  }
}
