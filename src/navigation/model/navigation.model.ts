import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserNavigation } from '../../user-navigation/model/userNavigation.model';
import { User } from '../../user/model/user.model';

@Table
export class Navigation extends Model<Navigation> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  icon: string;

  @BelongsToMany(
    () => User,
    () => UserNavigation,
  )
  users: User[];
}
