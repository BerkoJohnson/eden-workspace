import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate, CandidateDocument } from './candidate.schemat';
import { CreateCandidateDto, CreateElectionDto } from './election.dto';
import { Election, ElectionDocument } from './election.schema';
import { Position, PositionDocument } from './position.schema';

@Injectable()
export class ElectionService {
  constructor(
    @InjectModel(Election.name)
    private electionModel: Model<ElectionDocument>,
    @InjectModel(Position.name)
    private positionModel: Model<PositionDocument>,
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>
  ) {}

  async create(electionDto: CreateElectionDto): Promise<ElectionDocument> {
    const { title, academicYear, positions } = electionDto;

    try {
      const found = await this.electionModel.findOne({ title, academicYear });

      if (found) {
        throw new BadRequestException('Election exists');
      }

      const election = new this.electionModel();

      election.title = title;
      election.academicYear = academicYear;

      const savedPositionsArray: string[] = [];

      if (positions.length) {
        for (let i = 0; i < positions.length; i++) {
          const pos_to_save = new this.positionModel();
          pos_to_save.pos_name = positions[i].pos_name;
          pos_to_save.election = election._id;

          await pos_to_save.save();

          savedPositionsArray.push(pos_to_save._id);
        }
      }

      election.positions = savedPositionsArray;

      await election.save();
      return await this.getElection(election._id);
    } catch (error) {
      console.error(error);
    }
  }

  async update(
    electionDto: CreateElectionDto,
    id: string
  ): Promise<ElectionDocument> {
    const { title, academicYear, positions } = electionDto;

    // find election with stated id
    const foundElection = await this.electionModel.findById(id);

    // if electionID not found
    if (!foundElection) {
      throw new NotFoundException('Election not found');
    }

    // if found but title is changed, update title
    if (foundElection.title !== title) {
      foundElection.title = title;
    }

    // if found but academicYear is changed, update academicYear
    if (foundElection.academicYear !== academicYear) {
      foundElection.academicYear = academicYear;
    }

    // Get all positions with no ids, meaning not saved ones.
    const positionsWithNoIds = positions.filter((pos) => !pos._id);

    // Get all positions with ids
    const positionsWithIds = positions.filter((pos) => pos._id);

    // Loop through the saved positions and update their documents
    for (let i = 0; i < positionsWithIds.length; i++) {
      await this.positionModel.findByIdAndUpdate(positionsWithIds[i]._id, {
        pos_name: positionsWithIds[i].pos_name,
      });
    }

    // loop through the others not saved, save them and

    for (let i = 0; i < positionsWithNoIds.length; i++) {
      const newPost = new this.positionModel();
      newPost.pos_name = positionsWithNoIds[i].pos_name;
      newPost.election = foundElection._id;

      // push their ids to the foundElection.positions array
      foundElection.positions.push(newPost._id);

      await newPost.save();
    }

    // finally save the foundElection or update it.
    return await foundElection.save();
  }

  async getElections(): Promise<ElectionDocument[]> {
    return this.electionModel.find().populate({
      path: 'positions',
      populate: {
        path: 'candidates',
      },
    });
  }

  async getElection(electionId: string) {
    return this.electionModel.findById(electionId).populate({
      path: 'positions',
      populate: {
        path: 'candidates',
      },
    });
  }

  async removePosition(electionID: string, positions: string[]) {
    try {
      const foundElection = await this.electionModel.findById(electionID);

      for (let i = 0; i < positions.length; i++) {
        const currentPostIndex = foundElection.positions.indexOf(positions[i]);

        // check each positions exists
        const foundPosition = await this.positionModel.findOne({
          _id: positions[i],
          election: electionID,
        });

        if (foundPosition && currentPostIndex > -1) {
          // check if positions has candidates assigned
          if (foundPosition.candidates.length >= 1) {
            // remove candidates
          }
          // remove this position
          await foundPosition.remove();
          // update foundElection

          foundElection.positions.splice(currentPostIndex, 1);
        }
        await foundElection.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addCandidates(
    positionID: string,
    createCandidatesDto: CreateCandidateDto
  ) {
    const { candidates } = createCandidatesDto;

    try {
      // check if position exists
      const position = await this.positionModel.findById(positionID);

      if (!position) {
        throw new BadRequestException('Position does not exist');
      }

      // create candidates

      candidates.forEach(async (candidate) => {
        const candToSave = new this.candidateModel();
        candToSave.firstName = candidate.firstName;
        candToSave.lastName = candidate.lastName;
        candToSave.dob = candidate.dob;
        candToSave.gender = candidate.gender;
        candToSave.position = position._id;
        candToSave.nickname = candidate.nickname;
        candToSave.room = candidate.room;
        candToSave.displayMessage = candidate.displayMessage;

        position.candidates.push(candToSave._id);

        await candToSave.save();
      });

      await position.save();

      return await this.getElection(position.election);
    } catch (error) {
      console.log(error);
    }
  }
}
