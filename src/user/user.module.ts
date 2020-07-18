import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserNavigationModule } from '../user-navigation/user-navigation.module';

@Module({
  imports:[SequelizeModule.forFeature([User]), forwardRef(() => UserNavigationModule)],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
