import bcrypt from 'bcryptjs';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { Email } from '../../domain/value-objects/Email';
import { User } from '../../domain/entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { ValidationError } from '../../../../shared/domain/errors/ValidationError';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const email = Email.create(dto.email).value;
    const existing = await this.userRepository.findByEmail(email);

    if (existing) {
      throw new ValidationError('Usuário já existe');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = User.create({
      email,
      name: dto.name,
      passwordHash,
      roles: ['viewer'],
      preferences: {},
      history: [],
    });

    return this.userRepository.create(user);
  }
}

