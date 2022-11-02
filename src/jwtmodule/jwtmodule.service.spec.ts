import { Test, TestingModule } from '@nestjs/testing';
import { JwtmoduleService } from './jwtmodule.service';

describe('JwtmoduleService', () => {
  let service: JwtmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtmoduleService],
    }).compile();

    service = module.get<JwtmoduleService>(JwtmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
