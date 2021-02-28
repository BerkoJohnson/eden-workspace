import { IsNotEmpty } from 'class-validator';

export class PositionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  election: string;
}


export class PositionUpdateDto {
  @IsNotEmpty()
  title: string;
}

