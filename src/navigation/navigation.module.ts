import { Module, forwardRef } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Navigation } from './model/navigation.model';
import { UserNavigationModule } from 'src/user-navigation/user-navigation.module';
import { NavigationResolver } from './navigation.resolver';

@Module({
  imports:[SequelizeModule.forFeature([Navigation]), forwardRef(() => UserNavigationModule)],
  providers: [NavigationService, NavigationResolver],
  exports: [NavigationService]
})
export class NavigationModule {}
