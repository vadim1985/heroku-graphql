import { Resolver, Query, Args, ResolveField, Parent, Mutation, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { IUser } from './interface';
import { UserNavigationService } from 'src/user-navigation/user-navigation.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { User } from './model/user.model';
import { Navigation } from 'src/navigation/model/navigation.model';
import { AuthGuard } from './guard/auth.guard';

@UseGuards(AuthGuard)
@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userNavigationService: UserNavigationService
  ) { }

  @Query('users')
  public async users(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Query('user')
  public user(@Args('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id)
  }

  @Query('me')
  public async me(@Context('user') user: {id: number, name: string}): Promise<User> {
    return await this.userService.findById(user.id)
  }

  @Mutation('login')
  public async login(@Args('username') username: string): Promise<string> {
    const user = await this.userService.findByName(username)
    if (!user) throw new Error('User not found')
    return this.userService.createToken(user)
  }

  @Mutation('createUser')
  public async createUser(@Args() user: User): Promise<User> {
    return await this.userService.createUser(user)
  }

  @Mutation('updateUser')
  public async updateUser(@Args() user: User): Promise<User> {
    return await this.userService.updateUser(user)
  }

  @Mutation('removeUser')
  public async removeUser(@Args('id', ParseIntPipe) id: number): Promise<{id: number}> {
    return await this.userService.removeUser(id)
  }

  @ResolveField()
  public async navigations(@Parent() user: IUser): Promise<Navigation[]> {
    const { id } = user
    return await this.userNavigationService.getNavigationByUserId(id)
  }
}
