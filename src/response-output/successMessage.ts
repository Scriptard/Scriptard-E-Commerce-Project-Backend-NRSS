import { ApiResponseProperty } from "@nestjs/swagger";

export class successMessage {
  @ApiResponseProperty()
  message: string;
}
