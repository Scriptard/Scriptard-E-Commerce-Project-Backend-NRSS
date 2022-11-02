import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

async function getJwtSecret() {
  await ConfigModule.envVariablesLoaded;
  return 'my-jwt-secret';
}

// class jwtSecretExtract {
//   constructor(private configService: ConfigService) {}

//   extractJwtCode() {
//     return this.configService.get('jwtSecret');
//   }
// }

export const jwtConstants = {
  secret: getJwtSecret(),
};

export const secret = process.env.JWT_SECRET;
