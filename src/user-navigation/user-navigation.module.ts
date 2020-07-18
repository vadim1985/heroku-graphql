import { Module, forwardRef } from '@nestjs/common';
import { UserNavigationService } from './user-navigation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserNavigation } from './model/userNavigation.model';
import { NavigationModule } from 'src/navigation/navigation.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserNavigation]),
    forwardRef(() => NavigationModule),
    forwardRef(() => UserModule)
  ],
  providers: [UserNavigationService],
  exports: [UserNavigationService]
})
export class UserNavigationModule { }
