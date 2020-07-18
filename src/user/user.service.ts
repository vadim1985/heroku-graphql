import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UserNavigationService } from '../user-navigation/user-navigation.service';
import { ModuleRef } from '@nestjs/core';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UserService implements OnModuleInit {
  private userNavigationService: UserNavigationService
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit() {
    this.userNavigationService = this.moduleRef.get(UserNavigationService, { strict: false })
  }

  createToken(user: User): string{
    return jwt.sign({id: user.get('id'), name: user.get('name')}, process.env.SECRET_KEY)
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findById(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: { id }
    })
  }

  async findByIds(id: number[]): Promise<User[]> {
    return await this.userModel.findAll({ where: { id } })
  }

  async findByName(name: string): Promise<User> {
    return await this.userModel.findOne({
      where: { name }
    });
  }

  async createUser(user: User): Promise<User> {
    const userObject = new User({
      name: user.name,
      age: user.age,
      password: user.password,
    });
    return await userObject.save();
  }

  async removeUser(id: number): Promise<{ id: number }> {
    const user = await this.userModel.findOne({ where: { id } });
    const message = { id: user.id };
    await this.userNavigationService.removeNavigationServiceByUser(user.id);
    await user.destroy();
    return message;
  }

  async updateUser(user: User): Promise<User> {
    const userObject = await this.userModel.findOne({ where: { id: user.id } });
    user.name && (userObject.name = user.name);
    user.age && (userObject.age = user.age);
    user.password &&
      (userObject.password = await bcrypt.hash(user.password, 10));
    return await userObject.save();
  }
}
