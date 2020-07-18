import {
  Column,
  Model,
  Table,
  BeforeCreate,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { UserNavigation } from '../../user-navigation/model/userNavigation.model';
import { Navigation } from '../../navigation/model/navigation.model';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(
    () => Navigation,
    () => UserNavigation,
  )
  navigations: Navigation[];

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
  }
}
