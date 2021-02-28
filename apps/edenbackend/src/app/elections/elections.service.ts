import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateEntity, ElectionEntity, PositionEntity } from '../entities';
import { Repository } from 'typeorm';
import { CandidateDto, CandidateUpdateDto, ElectionDto, PositionDto, PositionUpdateDto } from '../dtos';

@Injectable()
export class ElectionsService {
  constructor(
    @InjectRepository(ElectionEntity) private electionRepo: Repository<ElectionEntity>,
    @InjectRepository(PositionEntity) private positionRepo: Repository<PositionEntity>,
    @InjectRepository(CandidateEntity) private candidateRepo: Repository<CandidateEntity>,
  ) {
  }

  async getElections() {
    return await this.electionRepo.find({ relations: ['positions'] });
  }

  async getElection(electionId: string) {
    return await this.electionRepo.findOne({ where: { id: electionId }, relations: ['positions'] });
  }

  async createElection(data: ElectionDto) {
    let election = await this.electionRepo.findOne({ where: { title: data.title } });

    if (election) {
      throw new BadRequestException('Election exists.');
    }

    election = this.electionRepo.create(data);
    await this.electionRepo.save(election);

    return election;
  }

  async createPosition(data: PositionDto) {
    const election = await this.getElection(data.election);
    if (!election) {
      throw new NotFoundException('Election does not exist.');
    }
    let position = await this.positionRepo.findOne({ where: { title: data.title, election } });

    if (position) {
      throw new BadRequestException('Position exists.');
    }

    position = new PositionEntity();
    position.title = data.title;
    position.election = election;
    await this.positionRepo.save(position);
    return position;
  }

  async getPost(positionId: string) {
    return await this.positionRepo.findOne({ where: { id: positionId } });
  }

  async removePost(positionId: string) {
    return await this.positionRepo.delete({ id: positionId });
  }

  async updatePost(positionId: string, data: PositionUpdateDto) {
    const position = await this.positionRepo.findOne({ where: { id: positionId } });

    if (!position) {
      throw new NotFoundException('Position does not exist.');
    }

    position.title = data.title;
    await this.positionRepo.save(position);

    return position;
  }


  async createCandidate(data: CandidateDto) {
    const election = await this.electionRepo.findOne({ where: { id: data.election } });

    if (!election) {
      throw new NotFoundException('Election does not exist.');
    }

    const position = await this.positionRepo.findOne({ where: { id: data.position } });

    if (!position) {
      throw new NotFoundException('Position does not exist.');
    }

    let candidate = await this.candidateRepo.findOne({
      where: {
        first_name: data.first_name,
        last_name: data.last_name,
        position,
      },
    });


    if (candidate) {
      throw new BadRequestException('Candidate already exists.');
    }

    candidate = new CandidateEntity();
    candidate.first_name = data.first_name;
    candidate.last_name = data.last_name;
    candidate.gender = data.gender;
    candidate.date_of_birth = data.date_of_birth;
    candidate.class = data.class;
    candidate.position = position;
    candidate.election = election;


    await this.candidateRepo.save(candidate);

    return candidate;
  }

  async removeCandidate(candidateId: string) {
    return await this.candidateRepo.delete({ id: candidateId });
  }


  async getAllCandidates(filter: any) {
    return await this.candidateRepo.find({ where: filter });
  }

  async updateCandidate(candidateId: string, data: CandidateUpdateDto) {
    return await this.candidateRepo.update({ id: candidateId }, data);
  }
}
