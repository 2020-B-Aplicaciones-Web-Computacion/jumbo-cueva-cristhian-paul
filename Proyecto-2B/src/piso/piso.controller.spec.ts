import { Test, TestingModule } from '@nestjs/testing';
import { PisoController } from './piso.controller';

describe('PisoController', () => {
  let controller: PisoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PisoController],
    }).compile();

    controller = module.get<PisoController>(PisoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
