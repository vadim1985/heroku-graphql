import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { NavigationModule } from './navigation/navigation.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserNavigationModule } from './user-navigation/user-navigation.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    UserModule,
    NavigationModule,
    UserNavigationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
