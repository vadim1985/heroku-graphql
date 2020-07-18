import { Resolver, ResolveField, Parent, Query, Args, Mutation } from '@nestjs/graphql';
import { NavigationService } from './navigation.service';
import { INavigation } from './interface';
import { UserNavigationService } from '../user-navigation/user-navigation.service';
import { User } from '../user/model/user.model';
import { Navigation } from './model/navigation.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guard/auth.guard';

@UseGuards(AuthGuard)
@Resolver('Navigation')
export class NavigationResolver {
  constructor(
    private readonly navigationService: NavigationService,
    private readonly userNavigationService: UserNavigationService
  ) { }

  @Query('navigations')
  public async navigations(): Promise<Navigation[]> {
    return await this.navigationService.findAll()
  }

  @Query('navigation')
  public async navigation(@Args('id', ParseIntPipe) id: number): Promise<Navigation> {
    return await this.navigationService.findById(id)
  }

  @Mutation('createNavigation')
  public async createNavigation(@Args() navigation: Navigation): Promise<Navigation> {
    return this.navigationService.createNavigation(navigation)
  }

  @Mutation('updateNavigation')
  public async updateNavigation(@Args() navigation: Navigation): Promise<Navigation> {
    return this.navigationService.updateNavigation(navigation)
  }

  @Mutation('removeNavigation')
  public async removeNavigation(@Args('id', ParseIntPipe) id: number): Promise<{id: number}> {
    return this.navigationService.removeNavigation(id)
  }

  @ResolveField()
  public async users(@Parent() navigation: INavigation): Promise<User[]> {
    const { id } = navigation
    return await this.userNavigationService.getUserByNavigationId(id)
  }
}
