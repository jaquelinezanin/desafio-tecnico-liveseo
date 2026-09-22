import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async findAll() {
    const result = await this.databaseService.query(
      `
        SELECT id, name, email, created_at
        FROM users
        ORDER BY created_at DESC
      `,
    );

    return result.rows;
  }
  async create(createUserDto: CreateUserDto) {
    const result = await this.databaseService.query(
      `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING id, name, email, created_at
    `,
      [createUserDto.name, createUserDto.email],
    );

    return result.rows[0];
  }
}
