import { Injectable, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Navigation } from './model/navigation.model';
import { UserNavigationService } from '../user-navigation/user-navigation.service';
import { User } from '../user/model/user.model';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class NavigationService implements OnModuleInit {
  private userNavigationService: UserNavigationService
  constructor(
    @InjectModel(Navigation)
    private navigationModel: typeof Navigation,
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit() {
    this.userNavigationService = this.moduleRef.get(UserNavigationService, { strict: false });
  }

  async findAll(): Promise<Navigation[]> {
    return await this.navigationModel.findAll();
  }

  async findByIds(id: number[]) {
    return this.navigationModel.findAll({ where: { id } })
  }

  async findById(id: number): Promise<Navigation> {
    return await this.navigationModel.findOne({
      where: {
        id
      }
    });
  }

  async createNavigation(navigation: Navigation): Promise<Navigation> {
    const navigationObject = new Navigation({
      name: navigation.name,
      url: navigation.url,
      icon: navigation.icon,
      users: navigation.users,
    });
    const saveNavigation = await navigationObject.save();
    await this.createUserNavigation(navigation.users, saveNavigation.id);
    return saveNavigation;
  }

  async removeNavigation(id: number): Promise<{ id: number }> {
    const navigation = await this.navigationModel.findOne({ where: { id } });
    const message = { id: navigation.id };
    await this.userNavigationService.removeNavigationServiceByNavigation(
      navigation.id,
    );
    navigation.destroy();
    return message;
  }

  async updateNavigation(navigation: Navigation): Promise<Navigation> {
    const navigationObject = await this.navigationModel.findOne({
      where: { id: navigation.id },
    });
    navigation.name && (navigationObject.name = navigation.name);
    navigation.url && (navigationObject.url = navigation.url);
    navigation.icon && (navigationObject.icon = navigation.icon);
    navigationObject.save();
    if (navigation?.users?.length) {
      await this.userNavigationService.removeNavigationServiceByNavigation(
        navigation.id,
      );
      await this.createUserNavigation(navigation.users, navigation.id);
    }
    return navigationObject;
  }

  private async createUserNavigation(
    userArray: User[],
    navigationId: number,
  ): Promise<void> {
    userArray?.length && await this.userNavigationService.bulkCreate(
      userArray.map(({ id }) => ({
        userId: id,
        navigationId,
      })),
    );
  }
}
