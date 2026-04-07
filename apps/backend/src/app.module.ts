import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from '@/database/database.module'
import { HealthModule } from '@/health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV ?? 'local'}`,
      isGlobal: true,
    }),
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}
