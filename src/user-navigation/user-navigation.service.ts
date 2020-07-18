import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModuleRef } from '@nestjs/core';
import { UserNavigation } from './model/userNavigation.model';
import { NavigationService } from '../navigation/navigation.service';
import { UserService } from '../user/user.service';

interface IUserNavigation {
  userId: number;
  navigationId: number;
}

@Injectable()
export class UserNavigationService implements OnModuleInit {
  private navigationService: NavigationService
  private userService: UserService
  constructor(
    @InjectModel(UserNavigation)
    private navigationModel: typeof UserNavigation,
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit() {
    this.navigationService = this.moduleRef.get(NavigationService, { strict: false })
    this.userService = this.moduleRef.get(UserService, { strict: false })
  }

  async getNavigationByUserId(userId: number) {
    const navigationIds = await this.navigationModel.findAll({
      where: { userId }
    })
    return await this.navigationService.findByIds(navigationIds.map(item => item.get('navigationId')))
  }

  async getUserByNavigationId(navigationId: number) {
    const userIds = await this.navigationModel.findAll({
      where: { navigationId }
    })
    return await this.userService.findByIds(userIds.map(item => item.get('userId')))
  }

  async bulkCreate(userNavigation: IUserNavigation[]): Promise<void> {
    await this.navigationModel.bulkCreate(userNavigation);
  }

  async removeNavigationServiceByNavigation(
    navigationId: number,
  ): Promise<void> {
    await this.navigationModel.destroy({ where: { navigationId } });
  }

  async removeNavigationServiceByUser(userId: number): Promise<void> {
    await this.navigationModel.destroy({ where: { userId } });
  }
}
