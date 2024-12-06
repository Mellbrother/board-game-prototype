import { Model, DataTypes } from 'sequelize';
import sequelize from './index';
import PrototypeModel from './Prototype';
import UserModel from './User';

class PlayerModel extends Model {
  public id!: number;
  public name!: string;
  public prototypeId!: number;
  public userId!: number | null;
  public order!: number;
  public originalPlayerId: number | undefined;

  async clone({
    newPrototypeId,
    originalPlayerId,
  }: {
    newPrototypeId: number;
    originalPlayerId: number;
  }) {
    return PlayerModel.create({
      name: this.name,
      prototypeId: newPrototypeId,
      userId: this.userId,
      order: this.order,
      originalPlayerId,
    });
  }
}

PlayerModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prototypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originalPlayerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Player',
  }
);

PlayerModel.belongsTo(UserModel, { foreignKey: 'userId' });
PlayerModel.belongsTo(PrototypeModel, {
  foreignKey: 'prototypeId',
  onDelete: 'CASCADE',
});
PrototypeModel.hasMany(PlayerModel, {
  foreignKey: 'prototypeId',
  as: 'players',
});

export default PlayerModel;
