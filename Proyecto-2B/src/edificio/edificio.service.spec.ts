import { Test, TestingModule } from '@nestjs/testing';
import { EdificioService } from './edificio.service';

describe('EdificioService', () => {
  let service: EdificioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdificioService],
    }).compile();

    service = module.get<EdificioService>(EdificioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
