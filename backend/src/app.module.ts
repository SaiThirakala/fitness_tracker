import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsModule } from './workouts/workouts.module';
import { EntriesModule } from './entries/entries.module';
import { RequireJsonGuard } from './common/guards/require-json.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    WorkoutsModule,
    EntriesModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: RequireJsonGuard }],
})
export class AppModule {}
