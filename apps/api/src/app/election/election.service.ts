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
    private candidateModel: Model<CandidateDocument>,
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

      const savedElection = await election.save();

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

      return await this.electionModel.findByIdAndUpdate(
        savedElection._id,
        {
          $addToSet: {
            positions: { $each: savedPositionsArray },
          },
        },
        {
          new: true,
          populate: 'positions candidates',
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  async update(
    electionDto: CreateElectionDto,
    id: string,
  ): Promise<ElectionDocument> {
    const { title, academicYear, positions } = electionDto;

    try {
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
      const positionsWithNoIds = positions.filter(pos => !pos._id);

      // Get all positions with ids
      const positionsWithIds = positions.filter(pos => pos._id);

      // Loop through the saved positions and update their documents
      for (let i = 0; i < positionsWithIds.length; i++) {
        await this.positionModel.findByIdAndUpdate(positionsWithIds[i]._id, {
          pos_name: positionsWithIds[i].pos_name,
        });
      }

      const newPostions: string[] = [];

      // loop through the others not saved, save them and

      for (let i = 0; i < positionsWithNoIds.length; i++) {
        const newPost = new this.positionModel();
        newPost.pos_name = positionsWithNoIds[i].pos_name;
        newPost.election = id;

        // push their ids to the foundElection.positions array
        newPostions.push(newPost._id);

        await newPost.save();
      }

      // finally update the election with the new positions just added
      return this.electionModel
        .findByIdAndUpdate(
          id,
          {
            $addToSet: {
              positions: { $each: newPostions },
            },
          },
          {
            new: true,
          },
        )
        .populate({
          path: 'positions candidates',
          populate: 'candidates',
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getElections(): Promise<ElectionDocument[]> {
    return this.electionModel.find().populate({
      path: 'positions candidates',
      populate: {
        path: 'candidates',
      },
    });
  }

  async getElection(electionId: string) {
    return this.electionModel.findById(electionId).populate({
      path: 'positions candidates',
      populate: {
        path: 'candidates',
      },
    });
  }

  async removePosition(electionID: string, positions: string[]) {
    try {
      const removedPositions: string[] = [];
      for (let i = 0; i < positions.length; i++) {
        // check each positions exists
        const foundPosition = await this.positionModel.findOne({
          _id: positions[i],
          election: electionID,
        });

        if (foundPosition) {
          // check if positions has candidates assigned
          if (foundPosition.candidates.length >= 1) {
            // update the candidate's document and set position = ''
            for (let i = 0; i < foundPosition.candidates.length; i++) {
              const canId = foundPosition.candidates[i];
              await this.candidateModel.findByIdAndUpdate(canId, {
                $unset: {
                  position: true,
                },
              });
            }
          }

          // remove this position
          await foundPosition.remove();
          // update foundElection

          removedPositions.push(foundPosition._id);
        }
      }

      return await this.electionModel
        .findByIdAndUpdate(electionID, {
          $pullAll: {
            positions: removedPositions,
          },
        })
        .populate({
          path: 'positions candidates',
          populate: {
            path: 'candidates',
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  async addCandidates(
    electionID: string,
    createCandidatesDto: CreateCandidateDto,
  ) {
    const { candidates } = createCandidatesDto;
    const candidateIDsArray: string[] = [];

    try {
      for (let i = 0; i < candidates.length; i++) {
        const candidateData = candidates[i];

        const foundCandidate = await this.candidateModel.findOne({
          firstName: candidateData.firstName,
          lastName: candidateData.lastName,
          election: electionID,
        });

        if (foundCandidate) {
          throw new BadRequestException(
            'This person is already a candidate in this election.',
          );
        }

        const newCandidate = new this.candidateModel();
        newCandidate.firstName = candidateData.firstName;
        newCandidate.lastName = candidateData.lastName;
        newCandidate.dob = candidateData.dob;
        newCandidate.gender = candidateData.gender;
        newCandidate.position = candidateData.position;
        newCandidate.election = electionID;
        newCandidate.room = candidateData.room;
        newCandidate.nickname = candidateData.nickname;
        newCandidate.displayMessage = candidateData.displayMessage;

        // update the candidates array of the position model
        await this.positionModel.findByIdAndUpdate(candidateData.position, {
          $addToSet: {
            candidates: newCandidate._id,
          },
        });

        // attach new candidate to the elections.candidates array
        candidateIDsArray.push(newCandidate._id);

        await newCandidate.save();
      }

      return await this.electionModel
        .findByIdAndUpdate(
          electionID,
          {
            $addToSet: {
              candidates: { $each: candidateIDsArray },
            },
          },
          {
            new: true,
          },
        )
        .populate({
          path: 'positions candidates',
          populate: {
            path: 'candidates',
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getPosition(positionId: string): Promise<PositionDocument> {
    return this.positionModel.findById(positionId).populate({
      path: 'candidates',
    });
  }
}
