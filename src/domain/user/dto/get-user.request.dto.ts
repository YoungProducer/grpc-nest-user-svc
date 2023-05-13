import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsEmail,
  ValidateIf,
} from 'class-validator';
import { GetUserRequest } from 'src/proto/user.pb';

const allEmptyError =
  'At least one of following properties should be passed: "id", "username", "email"';

export class GetUserRequestDto implements GetUserRequest {
  @ValidateIf(
    (dto: GetUserRequestDto) => !dto.email && !dto.username && !!dto.id,
    {
      message: allEmptyError,
    },
  )
  @IsPositive()
  @IsNotEmpty()
  readonly id?: number;

  @ValidateIf(
    (dto: GetUserRequestDto) => !dto.email && !dto.id && !!dto.username,
    {
      message: allEmptyError,
    },
  )
  @IsString()
  @IsNotEmpty()
  readonly username?: string;

  @ValidateIf(
    (dto: GetUserRequestDto) => !dto.id && !dto.username && !!dto.email,
    {
      message: allEmptyError,
    },
  )
  @IsEmail()
  readonly email?: string;
}
