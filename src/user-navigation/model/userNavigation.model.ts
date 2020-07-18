import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { Navigation } from '../../navigation/model/navigation.model';

@Table({ timestamps: false })
export class UserNavigation extends Model<UserNavigation> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Navigation)
  @Column
  navigationId: number;
}
