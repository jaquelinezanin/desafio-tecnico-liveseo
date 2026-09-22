import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const result = await this.databaseService.query(
      `
        SELECT id, title, completed, created_at
        FROM tasks
        ORDER BY created_at DESC
      `,
    );

    return result.rows;
  }

  async create(createTaskDto: CreateTaskDto) {
    const result = await this.databaseService.query(
      `
        INSERT INTO tasks (title)
        VALUES ($1)
        RETURNING id, title, completed, created_at
      `,
      [createTaskDto.title],
    );

    return result.rows[0];
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const result = await this.databaseService.query(
      `
        UPDATE tasks
        SET completed = $1
        WHERE id = $2
        RETURNING id, title, completed, created_at
      `,
      [updateTaskDto.completed, id],
    );

    return result.rows[0];
  }

  async remove(id: number) {
    const result = await this.databaseService.query(
      `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING id, title, completed, created_at
      `,
      [id],
    );

    return result.rows[0];
  }
}
