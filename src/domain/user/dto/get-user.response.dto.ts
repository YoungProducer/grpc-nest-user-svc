import { Exclude, Expose } from 'class-transformer';
import { GetUserResponse } from 'src/proto/user.pb';
import { BaseResponseDto } from 'grpc-nest-common';

@Exclude()
export class GetUserResponseDto
  extends BaseResponseDto
  implements GetUserResponse
{
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;
}
