import { Test, TestingModule } from '@nestjs/testing';
import { EdificioController } from './edificio.controller';

describe('EdificioController', () => {
  let controller: EdificioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdificioController],
    }).compile();

    controller = module.get<EdificioController>(EdificioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
