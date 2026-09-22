import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  DatabaseModule,
  UsersModule,
  TasksModule,
],
})
export class AppModule {}
