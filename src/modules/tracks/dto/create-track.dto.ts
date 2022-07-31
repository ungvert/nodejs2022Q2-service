import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ValidateIf((_, value) => value != null)
  artistId: string | null = null;

  @ValidateIf((_, value) => value != null)
  albumId: string | null = null;
}
