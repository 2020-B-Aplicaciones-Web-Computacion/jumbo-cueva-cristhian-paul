import { Test, TestingModule } from '@nestjs/testing';
import { PisoService } from './piso.service';

describe('PisoService', () => {
  let service: PisoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PisoService],
    }).compile();

    service = module.get<PisoService>(PisoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
