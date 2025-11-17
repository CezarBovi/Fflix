import { InMemoryUserRepository } from '../modules/auth/infrastructure/repositories/InMemoryUserRepository';
import { JWTService } from '../modules/auth/infrastructure/services/JWTService';

const userRepository = new InMemoryUserRepository();
const tokenService = new JWTService();

export const container = {
  userRepository,
  tokenService,
};

